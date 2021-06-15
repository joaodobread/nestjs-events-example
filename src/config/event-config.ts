import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';

export default () =>
  <EventEmitterModuleOptions>{
    wildcard: true,
    delimiter: '.',
    newListener: false,
    removeListener: false,
    maxListeners: 10,
    verboseMemoryLeak: true,
    ignoreErrors: false,
  };
