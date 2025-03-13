import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scrolltop',
  standalone: true,
  imports: [CommonModule, RouterModule
  ],
  templateUrl: './scrolltop.component.html',
  styleUrl: './scrolltop.component.scss'
})
export class ScrolltopComponent {
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 300; 
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
