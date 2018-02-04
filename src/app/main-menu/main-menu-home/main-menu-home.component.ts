import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../model/Project';
import {routeAnimation} from '../../animations';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {ApprenticeSheetService} from "../../services/apprentice-sheet.service";

@Component({
  selector: 'app-main-menu-home',
  templateUrl: './main-menu-home.component.html',
  styleUrls: ['./main-menu-home.component.css'],
  animations: [
    routeAnimation
  ]
})
export class MainMenuHomeComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return '';
  }
  project: Project = {name: '', id: 0};
  apprenticeSheetAddCount: number;
  apprenticeSheetLook: number[];
  apprenticeSheetLookCurrent = {name : 'All', value: -1};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private apprenticeSheetService: ApprenticeSheetService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(next => {
      const id = +next.get('id');
      this.getProject(id);
      this.getApprenticeSheetLook(id);
    });
    // this.project = {name: 'Project name', id: id};
    // this.id = this.route.data
  }

  getProject( id: number ): void {
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }
  getApprenticeSheetLook( id: number ): void {
    this.apprenticeSheetService.getApprenticeSheetCount(id).subscribe( ids => {
      this.apprenticeSheetLook = ids;
    });
  }
  validate(): void {
    this.apprenticeSheetAddCount = this.apprenticeSheetAddCount > 50 - this.apprenticeSheetLook.length ?
      50 - this.apprenticeSheetLook.length : this.apprenticeSheetAddCount;
  }
  addApprenticeSheet(): void {
    this.validate();
    this.apprenticeSheetService.addApprenticeSheet(this.project.id, this.apprenticeSheetAddCount).subscribe(data => {
      for (const id of data) {
        this.apprenticeSheetLook.push(id);
      }
    });
  }
  changeCurrent(newString: string, newValue: number): void {
    this.apprenticeSheetLookCurrent.value = newValue;
    this.apprenticeSheetLookCurrent.name = newString;
  }
  lookApprenticeSheet(): void {
    this.router.navigate(['/project/' + this.project.id + '/apprentice-sheet/' + this.apprenticeSheetLookCurrent.value]);
  }
}
