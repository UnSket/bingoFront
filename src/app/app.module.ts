import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import {ProjectService} from './project.service';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddGroupComponent } from './add-group/add-group.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HeaderComponent,
    WelcomeScreenComponent,
    MainMenuComponent,
    AddGroupComponent,
    EditComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ ProjectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
