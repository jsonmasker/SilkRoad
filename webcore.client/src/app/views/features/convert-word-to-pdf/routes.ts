import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./convert-word-to-pdf.component').then(m => m.ConvertWordToPdfComponent),
    data: {
      title: $localize`Convert Word to PDF`
    }
  }
];

