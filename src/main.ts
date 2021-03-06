import 'core-js/stable';
import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-dragula'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))// <--- wrapping in PLATFORM.moduleName()
    .developmentLogging();
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
