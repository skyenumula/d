import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  ngAfterViewInit(): void {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs and content
        tabs.forEach((t) => t.classList.remove('active'));
        contents.forEach((content) => content.classList.remove('active'));

        // Get the target tab ID
        const target = tab.getAttribute('data-tab');

        // Ensure the target exists and add the 'active' class to the matching content
        if (target) {
          const targetElement = document.getElementById(target);
          if (targetElement) {
            targetElement.classList.add('active');
          }
        }

        // Add 'active' class to the clicked tab
        tab.classList.add('active');
      });
    });
  }
}
