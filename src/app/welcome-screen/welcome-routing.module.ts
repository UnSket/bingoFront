import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from '../shared-components/projects/projects.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { WelcomeScreenComponent } from './welcome-screen.component';

const welcomeRoutes: Routes = [
  { path: `welcome`, component: WelcomeScreenComponent, children: [
      {
          path: `login`, component: LoginComponent
      },
      {
        path: `project`, component: ProjectsComponent
      },
      {
        path: `**`, redirectTo: `project`, pathMatch: `full`
      }]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(welcomeRoutes)
  ],
  exports: [ RouterModule ]
})
export class WelcomeRoutingModel {
}
