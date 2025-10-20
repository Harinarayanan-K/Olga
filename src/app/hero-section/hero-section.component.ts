import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl:'./hero-section.style.scss',
  imports: [ RouterLink],
})
export class HeroSectionComponent implements AfterViewInit {
  constructor(private r: Renderer2, private el: ElementRef) {}
  ngAfterViewInit() {
    // add a class to start animations after first paint
    this.r.addClass(this.el.nativeElement, 'animate-stagger');
  }
  
}