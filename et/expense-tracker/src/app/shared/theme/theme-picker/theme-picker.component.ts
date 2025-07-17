import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent {
  primaryColor = '#7d7ace';
  accentColor = 'rgba(5, 5, 5, 0.466)';

  themes = [
    { primaryColor: '#7d7ace', accentColor: 'rgba(5, 5, 5, 0.466)', isApplied: false },
    { primaryColor: '#ff6347', accentColor: 'rgba(255, 99, 71, 0.5)', isApplied: false },
    { primaryColor: '#32cd32', accentColor: 'rgba(50, 205, 50, 0.5)', isApplied: false },
    { primaryColor: '#ff1493', accentColor: 'rgba(255, 20, 147, 0.5)', isApplied: false }
  ];

  constructor(private themeService: ThemeService) {}

  applyTheme() {
    this.themeService.updateTheme(this.primaryColor, this.accentColor);

    this.themes.forEach(t => t.isApplied = false); 
    const selectedTheme = this.themes.find(t => t.primaryColor === this.primaryColor && t.accentColor === this.accentColor);
    if (selectedTheme) {
      selectedTheme.isApplied = true;
    }
  }

  applyPredefinedTheme(theme: any) {
    this.primaryColor = theme.primaryColor;
    this.accentColor = theme.accentColor;

    this.themeService.updateTheme(theme.primaryColor, theme.accentColor);

    this.themes.forEach(t => t.isApplied = false);
    theme.isApplied = true;
  }
}
