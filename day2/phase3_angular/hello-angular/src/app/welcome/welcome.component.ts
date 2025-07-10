import { Component,ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {
  title: string = 'Welcome to Angular';
  name : string = `Guest`;
  imageUrl1: string = 'https://angular.io/assets/images/logos/angular/angular.png';
  imageUrl2: string = 'https://picsum.photos/200';
  
  @ViewChild('myInput') inputRef!: ElementRef;

  greet(){
    const inputValue = this.inputRef.nativeElement.value;

    alert(`hello ${inputValue}`);
  }

}
