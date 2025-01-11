import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  handleFormSubmit(event: Event): void {
    event.preventDefault();
    console.log('The form has been submitted.');
    alert('Thank you for your message!');
  }

  
  
}