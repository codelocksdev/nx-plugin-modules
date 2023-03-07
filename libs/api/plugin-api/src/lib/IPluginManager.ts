import { PluginMetadata } from '@proof/types';

interface IPluginManager {
  plugins: PluginMetadata[];
  registerPlugin(metadata: PluginMetadata): void;
}

export default IPluginManager;
