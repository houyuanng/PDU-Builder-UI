import { GrpcClientSettings } from '@ngx-grpc/common';
import { Configuration } from './configuration.provider';

export const grpcGreeterSettingsFactory = (config: Configuration) => {
  return {
    host: config.pduBuilderUrl,
  } as GrpcClientSettings;
};
