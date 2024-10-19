import { computed, signal } from '@angular/core';
import { TabLinkStore } from './tab-link-store';

export class TabLink {
  readonly path!: string;

  readonly title = signal<string>(null!);

  private _pinned = signal(false);

  readonly pinned = computed(() => this._pinned());

  constructor(
    title: string,
    path: string,
    pinned: boolean,
    private store: TabLinkStore,
  ) {
    this.path = path;
    this.title.set(title);
    this._pinned.set(pinned);
  }

  pin(): void {
    const tabs = this.store.tabs();
    const reverse = [...tabs].reverse();
    const lastFixed = reverse.find((tab) => tab.pinned());
    const index = tabs.indexOf(this);
    const toIndex = lastFixed ? tabs.indexOf(lastFixed) + 1 : 0;
    this.store.move(index, toIndex);
    this._pinned.set(true);
  }

  unpin(): void {
    const tabs = this.store.tabs();
    const reverse = [...tabs].reverse();
    const lastFixed = reverse.find((tab) => tab.pinned());
    const index = tabs.indexOf(this);
    const toIndex = lastFixed ? tabs.indexOf(lastFixed) : 0;
    this.store.move(index, toIndex);
    this._pinned.set(false);
  }

  close(): Promise<boolean> {
    const result = this.store.remove(this.path);
    this.store.onClose.next(this);
    return result;
  }
}
