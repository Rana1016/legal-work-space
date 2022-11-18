import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ClientAuthGuard } from './shared/guards/client-auth.guard';
import { NonAuthGuard } from './shared/guards/non-auth.guard';
import { NonClientAuthGuard } from './shared/guards/non-client-auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: 'client',
    redirectTo: 'client/my-cases',
    pathMatch: 'full',
  },
  {
    path: 'client',
    canActivate: [NonClientAuthGuard],
    loadChildren: () => import('src/app/shared/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('src/app/shared/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: '',
    redirectTo: 'layout/dashboard',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   // canActivate: [NonAuthGuard],
  //   loadChildren: () => import('src/app/shared/auth/auth.module').then(m => m.AuthModule)
  // },
  
  {
    path: "**",
    redirectTo: '/dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
