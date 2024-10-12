import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { CarCleanRouteReuseStrategy } from './route-reuse/route-reuse-strategy';
import { DefaultTabNavStore } from './store/default-tab-nav-store';
import { TabNavStore } from './store/tab-nav-store';

export function provideTabNav(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: TabNavStore,
      useClass: DefaultTabNavStore,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CarCleanRouteReuseStrategy,
    },
  ]);
}
