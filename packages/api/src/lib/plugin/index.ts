import { IPluginManager } from '@nx-plugin-modules/api/plugin-api';
import getContainer from '../container';
import { TYPES } from '../types';

export const { registerPlugin } = getContainer().get<IPluginManager>(
  TYPES.pluginAPI
);
