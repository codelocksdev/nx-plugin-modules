import { Component } from 'react';

export interface PluginMetadata<T extends Component = Component> {
  name: string;
  tools: T[];
}
