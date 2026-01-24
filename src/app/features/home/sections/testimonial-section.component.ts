import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../../core/models/entities';

@Component({
  selector: 'app-home-testimonial-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-section.component.html',
  styleUrl: './testimonial-section.component.css'
})
export class TestimonialSectionComponent implements OnChanges, OnDestroy {
  @Input() testimonials: Testimonial[] = [];

  featuredTestimonial: Testimonial | null = null;
  testimonialIndex = 0;
  private testimonialRotationId: ReturnType<typeof setInterval> | null = null;
  private testimonialAnimationStartId: ReturnType<typeof setTimeout> | null = null;
  private testimonialAnimationEndId: ReturnType<typeof setTimeout> | null = null;
  isTestimonialAnimating = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['testimonials']) {
      this.setFeaturedTestimonial(0, false);
      this.startTestimonialRotation();
    }
  }

  ngOnDestroy() {
    this.stopTestimonialRotation();
    this.stopTestimonialAnimation();
  }

  private startTestimonialRotation() {
    this.stopTestimonialRotation();

    if (this.testimonials.length <= 1) {
      return;
    }

    this.testimonialRotationId = window.setInterval(() => {
      if (!this.testimonials.length) {
        return;
      }

      this.setFeaturedTestimonial((this.testimonialIndex + 1) % this.testimonials.length);
    }, 6000);
  }

  private stopTestimonialRotation() {
    if (this.testimonialRotationId !== null) {
      clearInterval(this.testimonialRotationId);
      this.testimonialRotationId = null;
    }
  }

  setFeaturedTestimonial(index: number, animate = true) {
    if (!this.testimonials.length) {
      this.testimonialIndex = 0;
      this.featuredTestimonial = null;
      return;
    }

    this.testimonialIndex = index % this.testimonials.length;
    this.featuredTestimonial = this.testimonials[this.testimonialIndex];

    if (animate) {
      this.triggerTestimonialAnimation();
    }
  }

  private triggerTestimonialAnimation() {
    this.stopTestimonialAnimation();
    this.isTestimonialAnimating = false;
    this.testimonialAnimationStartId = window.setTimeout(() => {
      this.isTestimonialAnimating = true;
    }, 0);
    this.testimonialAnimationEndId = window.setTimeout(() => {
      this.isTestimonialAnimating = false;
    }, 600);
  }

  private stopTestimonialAnimation() {
    if (this.testimonialAnimationStartId !== null) {
      clearTimeout(this.testimonialAnimationStartId);
      this.testimonialAnimationStartId = null;
    }
    if (this.testimonialAnimationEndId !== null) {
      clearTimeout(this.testimonialAnimationEndId);
      this.testimonialAnimationEndId = null;
    }
  }
}
