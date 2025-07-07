import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  home : string = 'Home';
  content : string = 'Content';
  about : string = 'About';
  contact : string = 'Contact';
}
