import { PluginMetadata } from '@proof/types';
import { injectable } from 'inversify';
import { Component } from 'react';
import IPluginManager from './IPluginManager';

@injectable()
class PluginManager implements IPluginManager {
  public plugins: PluginMetadata[] = [];

  registerPlugin(
    metadata: PluginMetadata<Component<object, object, any>>
  ): void {
    this.plugins.push(metadata);
  }
}

export default PluginManager;
