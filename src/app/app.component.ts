import { Component } from '@angular/core';
import {ApprenticeSheetService} from './services/apprentice-sheet.service';
import {GroupService} from './services/group.service';
import {ProjectService} from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  spinner: boolean;
  constructor(
    private apprentice: ApprenticeSheetService,
    private group: GroupService,
    private project: ProjectService,
  ) { }
}
