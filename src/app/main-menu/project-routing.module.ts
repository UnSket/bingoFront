import {RouterModule, Routes} from '@angular/router';
import {ApprenticeSheetComponent} from './apprentice-sheet/apprentice-sheet.component';
import {NgModule} from '@angular/core';
import {MainMenuHomeComponent} from './main-menu-home/main-menu-home.component';
import {MainMenuComponent} from './main-menu.component';
import {TeacherSheetComponent} from "./teacher-sheet/teacher-sheet.component";

const mainMenuRoutes: Routes = [
  { path: `project`, component: MainMenuComponent, children: [
      {
          path: `:id`, component: MainMenuHomeComponent
      },
      {
        path: ``, redirectTo: '/welcome/project', pathMatch: 'full'
      },
      {
        path: `:id/apprentice-sheet/:sheetId`, component: ApprenticeSheetComponent
      },
      {
        path: `:id/teacher-sheet`, component: TeacherSheetComponent
      }]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(mainMenuRoutes)
  ],
  exports: [ RouterModule ]
})
export class ProjectRoutingModule {
}
