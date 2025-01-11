import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const projectsSection = document.querySelector('.projects-container');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, index * 100); // Delay each card
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (projectsSection) observer.observe(projectsSection);
  }
}
