import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';


const routes: Routes = [
  { path: '**', component: WelcomeScreenComponent },
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
