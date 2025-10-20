import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'windframe-ng-app';
  isDark = false;

  constructor(@Inject(DOCUMENT) private doc: Document, private theme: ThemeService) {}

  ngOnInit() {
    this.theme.loadInitial();
    this.isDark = this.theme.isDark$.value;
    this.theme.isDark$.subscribe(v => this.isDark = v);

    const stored = localStorage.getItem('theme');
    if (stored) {
      this.isDark = stored === 'dark';
    } else {
      this.isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.theme.setDark(!this.isDark);
    return;
  }

  // legacy toggle kept for safety
  oldToggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    const html = this.doc.documentElement;
    const body = this.doc.body;
    if (this.isDark) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
  }
}
