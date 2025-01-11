import { Component, AfterViewInit , HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit, OnInit {
  currentIndex = 0; // Track the current card index
  cardWidth = 0; // Width of a single card (includes gap)
  totalCards = 0; // Total number of original cards
  scrollInterval: any;


  isNavbarVisible = true; // Navbar visibility
  isSmallScreen = false; // Tracks if the screen is small
  isScrolled = false; // Tracks if the user has scrolled down

  ngOnInit(): void {
    this.checkScreenSize(); // Check the initial screen size
  }



  @HostListener('window:resize', []) // Detect screen resizing
  onResize(): void {
    this.checkScreenSize();
  }

  @HostListener('window:scroll', []) // Detect scroll events
  onScroll(): void {
    this.isScrolled = window.scrollY > 50; // Consider scrolled if over 50px
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768; // Small screen condition
    this.isNavbarVisible = !this.isSmallScreen; // Hide navbar by default on small screens
  }

  toggleNavbar(): void {
    this.isNavbarVisible = !this.isNavbarVisible; // Toggle navbar visibility
  }

  minimizeNavbar(): void {
    if (this.isSmallScreen) {
      this.isNavbarVisible = false; // Hide navbar on small screens
    }
  }


  ngAfterViewInit(): void {
    const container = document.querySelector('.flash-card-container') as HTMLElement;
    const cards = Array.from(document.querySelectorAll('.flash-card')) as HTMLElement[];

    if (!cards.length || !container) {
      console.error('Cards or container not found.');
      return;
    }

    this.cardWidth = cards[0].offsetWidth + 20; // Card width + gap
    this.totalCards = cards.length;

    // Clone first and last cards for seamless circular scrolling
    this.cloneMultipleCards(container, cards);

    // Set the initial position to the first actual card
    container.style.transform = `translateX(-${300}px)`;

    this.startScrolling(container);

    // Add hover event listeners to cards
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => this.stopScrolling());
      card.addEventListener('mouseleave', () => this.startScrolling(container));




      
    });

  
  }



  cloneMultipleCards(container: HTMLElement, cards: HTMLElement[]) {
    const numClones = 5; // Number of cards to clone

    // Clone the first few cards and append them to the end
    for (let i = 0; i < numClones; i++) {
      const clone = cards[i].cloneNode(true) as HTMLElement;
      container.appendChild(clone);
    }

    // Clone the last few cards and prepend them to the start
    for (let i = cards.length - numClones; i < cards.length; i++) {
      const clone = cards[i].cloneNode(true) as HTMLElement;
      container.insertBefore(clone, cards[0]);
    }
  }

  startScrolling(container: HTMLElement) {
    // Clear any existing interval to prevent duplicates
    this.stopScrolling();

    // Start a new scrolling interval
    this.scrollInterval = setInterval(() => this.scrollToNextCard(container), 1000);
  }

  stopScrolling() {
    clearInterval(this.scrollInterval);
  }

  scrollToNextCard(container: HTMLElement) {
    this.currentIndex++;

    // Move the container to the next card
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = `translateX(-${(this.currentIndex + 1) * 300}px)`;

    // Reset to the first card after reaching the cloned first card
    if (this.currentIndex === this.totalCards) {
      setTimeout(() => {
        container.style.transition = 'none'; // Temporarily disable transition
        container.style.transform = `translateX(-${300}px)`; // Reset to the first actual card
        // Force reflow to apply reset immediately
        container.offsetHeight;
        container.style.transition = 'transform 0.100s ease-in-out'; // Re-enable animation
        this.currentIndex = 0; // Reset the index
      }, 500); // Wait for the animation to complete
    }
  }
  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    this.stopScrolling();
  }

  
}

