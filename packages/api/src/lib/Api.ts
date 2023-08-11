import { SampleAPI } from '@proof/plugin-api';
// import { API_TYPES } from '@nx-plugin-modules/types';
import getContainer from './container';

export const { incrementCount, getCount } = getContainer().get<SampleAPI>('');
