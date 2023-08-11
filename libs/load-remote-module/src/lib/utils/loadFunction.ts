/* eslint-disable */
// @ts-nocheck

// code source: https://webpack.js.org/concepts/module-federation/
export function loadFunction(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    return window[scope].get(module);
  };
}
