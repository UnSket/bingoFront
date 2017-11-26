import {AfterViewChecked, AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../project.service';
import {Project} from '../model/Project';
import {animate, style, transition, trigger, state } from '@angular/animations';
import {routeAnimation} from '../animations';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [
    routeAnimation
  ]
})
export class MainMenuComponent implements OnInit, AfterViewChecked {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return '';
  }
  project: Project = {name: '', id: 0};
  state = 'inactive';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }
  getProject( id: number ): void {
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
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
    // this.project = {name: 'Project name', id: id};
    // this.id = this.route.data
  }
  ngAfterViewChecked() {
    this.state = 'active';
  }
}
