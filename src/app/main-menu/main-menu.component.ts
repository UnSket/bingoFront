import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../project.service';
import {Project} from '../model/Project';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  project: Project;

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
    // getProject(id);
    // this.id = this.route.data
  }

}
