import { callRemoteInit, loadRemoteModule } from '@proof/load-remote-module';
import React, { useEffect } from 'react';

const PluginComponent = React.lazy(() =>
  loadRemoteModule('my-plugin', './Tool')
);

const ExternalPlugin = () => {
  //   const [startPlugin, setStartPlugin] = useState();
  //   useEffect(() => {
  //     let isMounted = true;
  //     loadFunction('my-plugin', './startPlugin')().then((func) => {
  //       if (isMounted) setStartPlugin(func);
  //     });
  //     return () => {
  //       isMounted = false;
  //     };
  //   });

  //   if (!startPlugin) return null;

  useEffect(() => {
    (async() => await callRemoteInit('my-plugin', './init'))()
    }, []
  )

  return (
    <div>
      <PluginComponent />
    </div>
  );
};

export default ExternalPlugin;
