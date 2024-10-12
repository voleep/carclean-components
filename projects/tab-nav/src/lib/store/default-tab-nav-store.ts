import { computed, effect, Injectable, signal } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { TabNav } from './tab-nav';
import { TabNavStore } from './tab-nav-store';

interface TabModel {
  title: string;
  path: string;
}

interface TabMap {
  tab: TabNav;
  handle: DetachedRouteHandle | null;
}

@Injectable()
export class DefaultTabNavStore extends TabNavStore {
  private readonly storeKey = 'carclean-tabs';

  private tabsMap = signal<Map<string, TabMap>>(new Map());

  override tabs = computed<TabNav[]>(() =>
    Array.from(this.tabsMap().values()).map((tab) => tab.tab)
  );

  constructor() {
    super();
    this.load();

    effect(() => {
      const models = this.tabs().map(
        (tab): TabModel => ({
          title: tab.title(),
          path: tab.path,
        })
      );

      localStorage.setItem(this.storeKey, JSON.stringify(models));
    });
  }

  override exists(path: string): boolean {
    return this.tabsMap().has(path);
  }

  override create(path: string, title: string): void {
    if (this.exists(path)) {
      return;
    }

    this.updateTabs((tabs) =>
      tabs.set(path, { tab: new TabNav(title, path, this), handle: null })
    );
  }

  override store(path: string, handle: DetachedRouteHandle | null): void {
    if (!this.tabsMap().has(path)) {
      return;
    }

    const { tab } = this.tabsMap().get(path)!;
    this.updateTabs((tabs) => tabs.set(path, { tab, handle }));
  }

  override retrieve(path: string): DetachedRouteHandle | null {
    return this.tabsMap().get(path)?.handle ?? null;
  }

  override async remove(path: string): Promise<boolean> {
    return this.updateTabs((tabs) => tabs.delete(path));
  }

  private load(): void {
    const storedValue = localStorage.getItem(this.storeKey);

    if (!storedValue) {
      return;
    }

    const storedTabs = JSON.parse(storedValue);

    if (!Array.isArray(storedTabs)) {
      return;
    }

    this.updateTabs((tabs) => {
      storedTabs
        .filter((tab) => this.isTabModel(tab))
        .forEach((tab) =>
          tabs.set(tab.path, {
            tab: new TabNav(tab.title, tab.path, this),
            handle: null,
          })
        );
    });
  }

  private isTabModel(tab: unknown): tab is TabModel {
    const isObject = typeof tab === 'object';
    const isNotNull = tab !== null;
    return isObject && isNotNull && 'title' in tab && 'path' in tab;
  }

  private updateTabs<T>(fn: (tabs: Map<string, TabMap>) => T): T {
    const shallowCopyTabs = new Map(this.tabsMap());
    const result = fn(shallowCopyTabs);
    this.tabsMap.set(shallowCopyTabs);
    return result;
  }
}
