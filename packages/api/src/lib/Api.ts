import { IPluginManager } from '@nx-plugin-modules/api/plugin-api';
import getContainer from './container';

export const { registerPlugin } = getContainer().get<IPluginManager>('');
