import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeModel } from '../../../shared/theme/theme-model';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent implements OnInit {
  primaryColor = '#7d7ace';
  accentColor = 'rgba(5, 5, 5, 0.466)';
  themes: ThemeModel[] = [];
  selectedTheme: ThemeModel | null = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((themes: ThemeModel[]) => {
      this.themes = themes.map(t => ({
        ...t,
        applied: t.applied ?? 'false'
      }));
    });
  }


  applyPredefinedTheme(theme: ThemeModel) {
    console.log('Apply called for:', theme);
    this.primaryColor = theme['primary-color'];
    this.accentColor = theme['secondary-color'];

    this.themeService.updateTheme(theme['primary-color'], theme['secondary-color']);

    this.themes.forEach(t => {
      t.applied = 'false';
    });

    theme.applied = 'true';

    this.themeService.saveTheme(theme).subscribe(() => {
      this.themes = [...this.themes];
    });
  }

  deleteTheme(id?: number) {
    if (id === undefined) return;
    this.themeService.deleteTheme(id).subscribe(() => {
      this.themes = this.themes.filter(theme => theme.id !== id);
    });
  }

  openThemeDialog(theme?: ThemeModel) {
    this.selectedTheme = theme
      ? { ...theme }
      : {
          id: undefined,
          'theme-name': '',
          'primary-color': '',
          'secondary-color': '',
          applied: 'false'
        };
  }

  saveTheme() {
    if (this.selectedTheme) {
      const isNew = !this.selectedTheme.id;

      this.selectedTheme['primary-color'] = this.selectedTheme['primary-color'] || this.primaryColor;
      this.selectedTheme['secondary-color'] = this.selectedTheme['secondary-color'] || this.accentColor;
      this.selectedTheme.applied = 'false';

      if (isNew) {
        this.themeService.createTheme(this.selectedTheme).subscribe((createdTheme: ThemeModel) => {
          this.themes.push(createdTheme);
          this.selectedTheme = null;
        });
      } else {
        this.themeService.saveTheme(this.selectedTheme).subscribe((updatedTheme: ThemeModel) => {
          const index = this.themes.findIndex(t => t.id === updatedTheme.id);
          if (index !== -1) {
            this.themes[index] = updatedTheme;
          }
          this.selectedTheme = null;
        });
      }
    }
  }
}
