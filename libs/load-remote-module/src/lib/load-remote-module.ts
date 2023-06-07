/**
 * https://github.com/wangel13/dynamic-micro-frontends-with-Nx-and-react/blob/main/libs/load-remote-module/src/lib/load-remote-module.ts
 */
export type ResolveRemoteUrlFunction = (
  remoteName: string
) => string | Promise<string>;

declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

let resolveRemoteUrl: ResolveRemoteUrlFunction;

export function setRemoteUrlResolver(
  _resolveRemoteUrl: ResolveRemoteUrlFunction
) {
  resolveRemoteUrl = _resolveRemoteUrl;
}

let remoteUrlDefinitions: Record<string, string>;

export function setRemoteDefinitions(definitions: Record<string, string>) {
  remoteUrlDefinitions = definitions;
}

const remoteModuleMap = new Map<string, unknown>();
const remoteContainerMap = new Map<string, unknown>();

export async function loadRemoteModule(remoteName: string, moduleName: string) {
  const remoteModuleKey = `${remoteName}:${moduleName}`;
  if (remoteModuleMap.has(remoteModuleKey)) {
    return remoteModuleMap.get(remoteModuleKey);
  }

  const container = remoteContainerMap.has(remoteName)
    ? remoteContainerMap.get(remoteName)
    : await loadRemoteContainer(remoteName);

  const factory = await container.get(moduleName);
  const Module = factory();

  remoteModuleMap.set(remoteModuleKey, Module);

  return Module;
}

export async function callRemoteInit(remoteName: string, moduleName: string) {
  const remoteModuleKey = `${remoteName}:${moduleName}`;
  if (remoteModuleMap.has(remoteModuleKey)) {
    return remoteModuleMap.get(remoteModuleKey);
  }

  const container = remoteContainerMap.has(remoteName)
    ? remoteContainerMap.get(remoteName)
    : await loadRemoteContainer(remoteName);

  const factory = await container.get(moduleName);
  const module = factory();

  // Check if the module has an `init` function
  if (typeof module.init === 'function') {
    // Invoke the `init` function and store the result
    const initializedModule = await module.init();
    remoteModuleMap.set(remoteModuleKey, initializedModule);
    return initializedModule;
  } else {
    throw new Error(`The remote module '${remoteName}:${moduleName}' does not export an 'init' function.`);
  }
}

function loadModule(url: string) {
  return import(/* webpackIgnore:true */ url);
}

let initialSharingScopeCreated = false;

// async function loadRemoteContainer(remoteName: string) {
//   if (!resolveRemoteUrl && !remoteUrlDefinitions) {
//     throw new Error(
//       'Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation to find the remote apps correctly.'
//     );
//   }
//
//   if (!initialSharingScopeCreated) {
//     initialSharingScopeCreated = true;
//     await __webpack_init_sharing__('default');
//   }
//
//   const remoteUrl = remoteUrlDefinitions
//     ? remoteUrlDefinitions[remoteName]
//     : await resolveRemoteUrl(remoteName);
//
//   const containerUrl = `${remoteUrl}${
//     remoteUrl.endsWith('/') ? '' : '/'
//   }remoteEntry.js`;
//
//   const container = await loadModule(containerUrl);
//   await container.init(__webpack_share_scopes__.default);
//
//   remoteContainerMap.set(remoteName, container);
//   return container;
// }

async function loadRemoteContainer(remoteName: string) {
  if (!resolveRemoteUrl && !remoteUrlDefinitions) {
    throw new Error(
      'Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation to find the remote apps correctly.'
    );
  }

  if (!initialSharingScopeCreated) {
    initialSharingScopeCreated = true;
    await __webpack_init_sharing__('default');
  }

  const remoteUrl = remoteUrlDefinitions
    ? remoteUrlDefinitions[remoteName]
    : await resolveRemoteUrl(remoteName);

  const containerUrl = `${remoteUrl}${remoteUrl.endsWith('/') ? '' : '/'}remoteEntry.js`;
  const container = await loadModule(containerUrl);

  // Check if the container has an `init` function
  if (typeof container.init === 'function') {
    await container.init(__webpack_share_scopes__.default);
  } else {
    throw new Error(`The remote container '${remoteName}' does not export an 'init' function.`);
  }

  remoteContainerMap.set(remoteName, container);
  return container;
}

