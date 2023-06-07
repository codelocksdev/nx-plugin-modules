import React, { lazy, Suspense } from 'react';
import useDynamicScript from '../hooks/useDynamicScript';
import { loadComponent } from './loadComponent';

function ModuleLoader(props: any) {
  const { ready, failed } = useDynamicScript({
    url: props.module && props.url,
  });

  if (!props.module) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = lazy(() => loadComponent(props.scope, props.module));

  return (
    <Suspense fallback="Loading Module">
      <Component />
    </Suspense>
  );
}

export default ModuleLoader;
