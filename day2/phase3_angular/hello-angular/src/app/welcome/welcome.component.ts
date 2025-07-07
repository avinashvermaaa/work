import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {
  title: string = 'Welcome to Angular';
  name : string = `User`;
  isActive: boolean = true;

  greet(){
    alert('Hello, welcome to Angular!');
    this.isActive = !this.isActive; // Toggle the active state
  }

  imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.png';

}
