import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getContainer } from '@proof/api';

import App from './app/App';
import { SampleAPI, Sample } from '@proof/plugin-api';
import ExternalPlugin from "./app/ExternalPlugin";
// import { API_TYPES } from '@nx-plugin-modules/types';

// getContainer()
//   .bind<SampleAPI>(API_TYPES.SampleAPI)
//   .to(Sample)
//   .inSingletonScope();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ExternalPlugin />
    </BrowserRouter>
  </StrictMode>
);
