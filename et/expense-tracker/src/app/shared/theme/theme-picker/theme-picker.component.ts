import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.css'
})
export class ThemePickerComponent {
  primaryColor = '#7d7ace';
  accentColor = 'rgba(5, 5, 5, 0.466)';
  constructor(private themeService: ThemeService) {}

  applyTheme() {
    this.themeService.updateTheme(this.primaryColor, this.accentColor);
  }
}
