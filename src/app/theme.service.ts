import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark$ = new BehaviorSubject<boolean>(false);
  private observer?: MutationObserver;

  constructor() {
    // Observe DOM changes and re-sync for dynamically created shadow roots
    this.observer = new MutationObserver(() => this.syncShadowRoots());
    if (typeof document !== 'undefined') {
      this.observer.observe(document.documentElement, { subtree: true, childList: true });
    }
  }

  loadInitial() {
    const stored = localStorage.getItem('theme');
    const initial = stored ? (stored === 'dark')
      : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
    this.setDark(initial, false);
  }

  setDark(isDark: boolean, persist: boolean = true) {
    this.isDark$.next(isDark);
    if (persist) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    // Update global
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    // Update shadow roots
    this.syncShadowRoots();
  }

  private syncShadowRoots() {
    try {
      const wantDark = this.isDark$.value;
      // Iterate all elements; if element has a shadowRoot, add/remove 'dark' on its top-level children
      const all = document.querySelectorAll('*');
      all.forEach((el: any) => {
        const sr: ShadowRoot | undefined = (el as any).shadowRoot;
        if (sr) {
          // Some components have multiple top-level nodes; add to each element child
          sr.childNodes.forEach((node: any) => {
            if (node && node.nodeType === Node.ELEMENT_NODE) {
              (node as HTMLElement).classList.toggle('dark', wantDark);
            }
          });
        }
      });
    } catch {}
  }
}
