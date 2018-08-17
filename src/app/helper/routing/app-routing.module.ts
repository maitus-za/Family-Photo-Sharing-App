import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

import { HomeComponent } from '../../template/pages/home/home.component';
import { SignupComponent } from '../../template/pages/signup/signup.component';
import { SigninComponent } from '../../template/pages/signin/signin.component';
import { NotFoundComponent } from '../../template/pages/error/notfound';

const routes: Routes = [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: '**', component: NotFoundComponent }, 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: false, preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }