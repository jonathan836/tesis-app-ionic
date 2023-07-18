import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './guards/ingresado.guard';
import { NoIngresadoGuard } from './guards/no-ingresado.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./components/registro/registro.module').then(m => m.RegistroPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./components/logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./components/statistics/statistics.module').then(m => m.StatisticsPageModule)
  },
  {
    path: 'add-team',
    loadChildren: () => import('./components/add-team/add-team.module').then(m => m.AddTeamPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./components/users/users.module').then(m => m.UsersPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
