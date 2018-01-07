import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit/edit.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {ApprenticeSheetComponent} from './apprentice-sheet/apprentice-sheet.component';
import {ProjectRoutingModule} from './project-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../project.service';
import {MainMenuComponent} from './main-menu.component';
import {MainMenuHomeComponent} from './main-menu-home/main-menu-home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectsComponent} from '../projects/projects.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    MainMenuComponent,
    MainMenuHomeComponent,
    EditComponent,
    AddGroupComponent,
    ApprenticeSheetComponent,
    ProjectsComponent
  ],
  exports: [ProjectsComponent],
  providers: [ ProjectService ]
})
export class MainMenuModule { }
