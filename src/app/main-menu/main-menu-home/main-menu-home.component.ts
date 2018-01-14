import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../project.service';
import {Project} from '../../model/Project';
import {routeAnimation} from '../../animations';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

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
    private projectService: ProjectService
  ) { }
  getProject( id: number ): void {
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }
  getApprenticeSheetLook( id: number ): void {
    this.projectService.getApprenticeSheetCount(id).subscribe( ids => {
      this.apprenticeSheetLook = ids;
    });
  }
  checkLocalStorage(): void {
    if (localStorage.getItem('currentProject')) {
      this.router.navigate(['project/', localStorage.getItem('currentProject')]);
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.checkLocalStorage();
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProject(id);
    this.getApprenticeSheetLook(id);
    // this.project = {name: 'Project name', id: id};
    // this.id = this.route.data
  }
  validate(): void {
    this.apprenticeSheetAddCount = this.apprenticeSheetAddCount > 50 - this.apprenticeSheetLook.length ?
      50 - this.apprenticeSheetLook.length : this.apprenticeSheetAddCount;
  }
  addApprenticeSheet(): void {
    this.validate();
    this.projectService.addApprenticeSheet(this.project.id, this.apprenticeSheetAddCount).subscribe(data => {
      for (const id of data) {
        this.apprenticeSheetLook.push(id);
      }
    });
  }
  changeCurrent(newString: string, newValue: number): void {
    this.apprenticeSheetLookCurrent.value = newValue;
    this.apprenticeSheetLookCurrent.name = newString;
  }
  lookApprenticeSheen(): void {
    this.router.navigate(['/project/' + this.project.id + '/apprentice-sheet/' + this.apprenticeSheetLookCurrent.value]);
  }
}
