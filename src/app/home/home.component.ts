import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { TrainingProgramsComponent } from '../training-programs/training-programs.component';
import { SpecialWorkshopsComponent } from '../special-workshops/special-workshops.component';
import { AboutSectionComponent } from '../about-section/about-section.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { CallToActionComponent } from '../call-to-action/call-to-action.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HeroSectionComponent,
    TrainingProgramsComponent,
    SpecialWorkshopsComponent,
    AboutSectionComponent,
    TestimonialsComponent,
    CallToActionComponent,
    ContactSectionComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
