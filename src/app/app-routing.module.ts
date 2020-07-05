import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
