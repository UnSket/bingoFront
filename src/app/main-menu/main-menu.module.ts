import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit/edit.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {ApprenticeSheetComponent} from './apprentice-sheet/apprentice-sheet.component';
import {ProjectRoutingModule} from './project-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../services/project.service';
import {MainMenuComponent} from './main-menu.component';
import {MainMenuHomeComponent} from './main-menu-home/main-menu-home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectsComponent} from '../shared-components/projects/projects.component';
import {AppModule} from '../app.module';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import { PersonalAreaComponent } from './personal-area/personal-area.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedComponentsModule
  ],
  declarations: [
    MainMenuComponent,
    MainMenuHomeComponent,
    EditComponent,
    AddGroupComponent,
    ApprenticeSheetComponent,
    PersonalAreaComponent
  ]
})
export class MainMenuModule { }
