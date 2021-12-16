export class Configuration {
    pduBuilderUrl!: string;
  }
  
  export declare var config: Configuration;
  
  export const configurationProvider = {
    provide: Configuration,
    useValue: config,
  };
  