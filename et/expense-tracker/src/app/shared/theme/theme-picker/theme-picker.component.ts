import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeModel } from '../../../shared/theme/theme-model';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent implements OnInit, AfterViewInit {
  primaryColor = '#7d7ace';
  accentColor = 'rgba(5, 5, 5, 0.466)';
  displayedColumns: string[] = ['themeName', 'primaryColor', 'accentColor', 'appliedStatus', 'actions'];
  dataSource = new MatTableDataSource<ThemeModel>();
  selectedTheme: ThemeModel | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe((themes: ThemeModel[]) => {
      const processed = themes.map(t => ({
        ...t,
        applied: t.applied ?? 'false'
      }));
      this.dataSource.data = processed;
    });
  }

  applyPredefinedTheme(theme: ThemeModel): void {
    this.primaryColor = theme['primary-color'];
    this.accentColor = theme['secondary-color'];
    this.themeService.updateTheme(this.primaryColor, this.accentColor);

    const updateObservables = this.dataSource.data
      .filter(t => t.id !== theme.id && t.applied === 'true')
      .map(t => {
        const updatedTheme = { ...t, applied: 'false' };
        return this.themeService.saveTheme(updatedTheme);
      });

    theme.applied = 'true';
    const applyTheme$ = this.themeService.saveTheme(theme);

    Promise.all([
      ...updateObservables.map(obs => obs.toPromise()),
      applyTheme$.toPromise()
    ]).then(() => {
      this.snackBar.open(`Theme "${theme['theme-name']}" applied successfully!`, 'Close', { duration: 3000 });
      this.loadThemes();
    });
  }

  deleteTheme(id?: number): void {
    const themeToDelete = this.dataSource.data.find(t => t.id === id);
    if (!themeToDelete) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message: `Are you sure you want to delete the theme "${themeToDelete['theme-name']}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && id !== undefined) {
        this.themeService.deleteTheme(id).subscribe(() => {
          this.loadThemes();
          this.snackBar.open('Theme deleted!', 'Close', { duration: 2000 });
        });
      }
    });
  }

  openThemeDialog(theme?: ThemeModel): void {
    this.selectedTheme = theme
      ? { ...theme }
      : {
          id: undefined,
          'theme-name': '',
          'primary-color': this.primaryColor,
          'secondary-color': this.accentColor,
          applied: 'false'
        };
  }

  saveTheme(): void {
    if (!this.selectedTheme) return;
    const isNew = !this.selectedTheme.id;
    this.selectedTheme.applied = 'false';

    const operation$ = isNew
      ? this.themeService.createTheme(this.selectedTheme)
      : this.themeService.saveTheme(this.selectedTheme);

    operation$.subscribe(() => {
      this.snackBar.open(`Theme ${isNew ? 'created' : 'updated'}!`, 'Close', { duration: 2000 });
      this.loadThemes();
      this.selectedTheme = null;
    });
  }
}
