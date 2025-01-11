import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ExpComponent } from './exp/exp.component';

@Component({
  selector: 'app-root',
  imports: [AboutComponent,SkillsComponent,ProjectsComponent,ContactComponent,ExpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resweb';
}
