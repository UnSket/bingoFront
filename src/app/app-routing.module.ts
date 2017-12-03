import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {MainMenuComponent} from './main-menu/main-menu.component';


const routes: Routes = [
  { path: `project/:id`, component: MainMenuComponent},
  { path: '**', component: WelcomeScreenComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
}
