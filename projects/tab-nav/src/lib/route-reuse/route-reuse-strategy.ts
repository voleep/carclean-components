import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
import { TabNavStore } from '../store/tab-nav-store';

@Injectable()
export class CarCleanRouteReuseStrategy extends RouteReuseStrategy {
  private readonly tabNavStore = inject(TabNavStore);

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.useTabNavLink(route);
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (!handle) return;
    this.tabNavStore.store(this.getRoutePath(route), handle);
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (!this.useTabNavLink(route)) {
      return false;
    }

    const path = this.getRoutePath(route);

    if (!this.tabNavStore.exists(path)) {
      this.tabNavStore.create(path, route.title ?? 'Sem título');
    }

    return Boolean(this.tabNavStore.retrieve(path));
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.tabNavStore.retrieve(this.getRoutePath(route));
  }

  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    const futureParams = JSON.stringify(future.params);
    const currParams = JSON.stringify(curr.params);
    const sameConfig = future.routeConfig === curr.routeConfig;
    const sameParams = futureParams === currParams;

    return sameConfig && sameParams;
  }

  private getRoutePath(route: ActivatedRouteSnapshot): string {
    const pathFromRoot = route.pathFromRoot.filter((r) => r.url.length > 0);
    const url = pathFromRoot.map((r) => r.url.map((s) => s.path).join('/'));
    return '/'.concat(url.join('/'));
  }

  private useTabNavLink(route: ActivatedRouteSnapshot): boolean {
    const isLazyLoaded = Boolean(route.routeConfig?.loadChildren);
    return route.data?.['tabNavLink'] === true && !isLazyLoaded;
  }
}
