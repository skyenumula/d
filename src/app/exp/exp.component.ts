import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exp',
  standalone: true,
  imports: [CommonModule], // Import CommonModule to use *ngIf and other Angular directives
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css'],
})
export class ExpComponent {
  activeRoadmap: string = ''; // No roadmap active by default

  // Method to change the active roadmap
  showRoadmap(type: string): void {
    this.activeRoadmap = type; // Set the active roadmap
  }
}
