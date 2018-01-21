import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ProjectService} from './services/project.service';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TeacherSheetComponent } from './main-menu/teacher-sheet/teacher-sheet.component';
import {MainMenuModule} from './main-menu/main-menu.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ApprenticeSheetService} from './services/apprentice-sheet.service';
import {GroupService} from './services/group.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    TeacherSheetComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainMenuModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [ ProjectService, ApprenticeSheetService, GroupService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
