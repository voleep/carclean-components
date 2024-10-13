import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { CarCleanRouteReuseStrategy } from './route-reuse/route-reuse-strategy';
import { DefaultTabLinkStore } from './store/default-tab-link-store';
import { TabLinkStore } from './store/tab-link-store';

export function provideTabNavigation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: TabLinkStore,
      useClass: DefaultTabLinkStore,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CarCleanRouteReuseStrategy,
    },
  ]);
}
