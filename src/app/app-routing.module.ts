import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {TeacherSheetComponent} from "./teacher-sheet/teacher-sheet.component";


const routes: Routes = [
  { path: `project/:id`, component: MainMenuComponent},
  { path: `teacherSheet/:id`, component: TeacherSheetComponent},
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
