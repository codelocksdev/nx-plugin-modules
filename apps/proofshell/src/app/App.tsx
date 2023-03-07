import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const InternalPlugin = React.lazy(() => import('internal-plugin/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/internal-plugin">InternalPlugin</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="proofshell" />} />
        <Route path="/internal-plugin" element={<InternalPlugin />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
