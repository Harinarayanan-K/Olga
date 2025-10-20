import { NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl:'./testimonials.style.scss',
  imports:[NgFor],
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  // theme from your earlier header code
  isDark = false;

  // --- TESTIMONIAL DATA (6 items) ---
  testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Intermediate Program Graduate',
      quote: 'I went from complete beginner to performing on stage in just 6 months!',
      avatar: 'https://i.pravatar.cc/100?img=12',
    },
    {
      name: 'Lisa Thompson',
      role: 'Workshop Participant',
      quote: 'The veil technique workshop was amazing—complex moves became easy.',
      avatar: 'https://i.pravatar.cc/100?img=32',
    },
    {
      name: 'Maria Cruz',
      role: 'Advanced Program Graduate',
      quote: 'The performance program pushed me artistically—unforgettable!',
      avatar: 'https://i.pravatar.cc/100?img=47',
    },
    {
      name: 'Aisha Rahman',
      role: 'Beginner Program Graduate',
      quote: 'Clear structure and encouragement. I finally feel confident dancing.',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
      name: 'Nora Petrescu',
      role: 'Choreography Workshop',
      quote: 'Loved the musicality drills. My transitions are so much smoother now.',
      avatar: 'https://i.pravatar.cc/100?img=41',
    },
    {
      name: 'Elena Popova',
      role: 'Intermediate Program',
      quote: 'Great community and feedback. Every week I see progress.',
      avatar: 'https://i.pravatar.cc/100?img=24',
    },
  ];

  // view / autoplay
  @ViewChild('track', { static: false }) trackEl?: ElementRef<HTMLDivElement>;
  autoplayMs = 4000;      // time between scrolls
  timer: any = null;
  currentDot = 0;
  dotArray: number[] = []; // will be computed based on viewport size
  paused = false;

  ngAfterViewInit() {
    // compute dots based on how many items fit per view
    this.computeDots();
    // start autoplay
    this.startAuto();
  }

  ngOnDestroy() {
    this.stopAuto();
  }

  // --- Autoplay controls ---
  startAuto() {
    this.stopAuto();
    this.timer = setInterval(() => this.next(), this.autoplayMs);
  }
  stopAuto() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
  pauseAuto() {
    this.paused = true;
    this.stopAuto();
  }
  resumeAuto() {
    if (!this.paused) return;
    this.paused = false;
    this.startAuto();
  }

  // --- Navigation ---
  next() {
    const el = this.trackEl?.nativeElement;
    if (!el) return;

    const viewport = el.clientWidth;
    const maxScroll = el.scrollWidth - viewport;

    // advance by one "page"
    const target = Math.min(this.roundToPage(el.scrollLeft + viewport, viewport), maxScroll);
    el.scrollTo({ left: target, behavior: 'smooth' });

    // update dots
    const pages = this.dotArray.length;
    this.currentDot = (this.currentDot + 1) % pages;

    // loop if at end (snap back cleanly after smooth scroll)
    if (target >= maxScroll - 2) {
      setTimeout(() => {
        el.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
        this.currentDot = 0;
      }, 450); // slightly > scroll-smooth duration
    }
  }

  prev() {
    const el = this.trackEl?.nativeElement;
    if (!el) return;

    const viewport = el.clientWidth;
    const target = Math.max(this.roundToPage(el.scrollLeft - viewport, viewport), 0);
    el.scrollTo({ left: target, behavior: 'smooth' });

    const pages = this.dotArray.length;
    this.currentDot = (this.currentDot - 1 + pages) % pages;
  }

  goToDot(dot: number) {
    const el = this.trackEl?.nativeElement;
    if (!el) return;
    const viewport = el.clientWidth;
    el.scrollTo({ left: viewport * dot, behavior: 'smooth' });
    this.currentDot = dot;
    this.pauseAuto();
    // resume after a short delay
    setTimeout(() => this.resumeAuto(), 2500);
  }

  // --- Helpers ---
  private roundToPage(value: number, page: number) {
    return Math.round(value / page) * page;
  }

  @HostListener('window:resize')
  onResize() {
    this.computeDots();
  }

  private computeDots() {
    const el = this.trackEl?.nativeElement;
    if (!el) { this.dotArray = [0,1,2]; return; }
    const viewport = el.clientWidth;
    const pages = Math.max(1, Math.round(el.scrollWidth / viewport));
    this.dotArray = Array.from({ length: pages }, (_, i) => i);
    // snap current dot to range
    this.currentDot = Math.min(this.currentDot, pages - 1);
  }
}
