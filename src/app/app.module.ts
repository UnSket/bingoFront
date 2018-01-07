import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import {ProjectService} from './project.service';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TeacherSheetComponent } from './main-menu/teacher-sheet/teacher-sheet.component';
import {MainMenuModule} from './main-menu/main-menu.module';


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
    AppRoutingModule
  ],
  providers: [ ProjectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
