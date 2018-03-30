import { NgModule } from '@angular/core';
import {ProjectsComponent} from './projects/projects.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ProjectsComponent
  ],
  exports: [ ProjectsComponent ]
})
export class SharedComponentsModule { }
