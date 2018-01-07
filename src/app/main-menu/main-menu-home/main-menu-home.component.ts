import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../project.service';
import {Project} from '../../model/Project';
import {routeAnimation} from '../../animations';

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
  addApprenticeSheet(): void {
    this.projectService.addApprenticeSheet(this.project.id).subscribe(data => console.log(data));
  }
}
