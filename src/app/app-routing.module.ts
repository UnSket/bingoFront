import { LoginComponent } from './welcome-screen/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {MainMenuComponent} from './main-menu/main-menu.component';


const routes: Routes = [
  { path: 'project', component: MainMenuComponent},
  { path: 'welcome', component: WelcomeScreenComponent },
  { path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true})
  ],
  declarations: []
})
export class AppRoutingModule {
}
