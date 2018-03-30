import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../services/project.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectsComponent} from '../shared-components/projects/projects.component';
import { WelcomeRoutingModel } from './welcome-routing.module';
import { WelcomeScreenComponent } from './welcome-screen.component';
import {AppModule} from '../app.module';
import {SharedComponentsModule} from '../shared-components/shared-components.module';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    WelcomeRoutingModel,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedComponentsModule
  ],
  declarations: [
    LoginComponent,
    WelcomeScreenComponent,
  ]
})
export class WelcomeModule { }
