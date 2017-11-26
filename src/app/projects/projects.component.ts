import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../project.service';
import {Project} from '../model/Project';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  newProject: string;
  projects: Array<Project>;
  choosedProject: Project = {name: 'Choose', id: -1};
  alerts: Array<string> = [];
  isDisabled = true;
  @Output() redirect = new EventEmitter<string[]>();

  validate(): void {
    this.isDisabled = false;
    this.removeAlert('Project with same name already exist');
    this.removeAlert('Field shouldn\'t be empty');
    switch (this.choosedProject.id) {
      case -1: this.isDisabled = true; break;
      case 0: if (this.newProject) {
        const self = this;
        this.projects.forEach(function(current) {
          if (current.name.localeCompare(self.newProject.trim()) === 0) {
            self.isDisabled = true;
            self.addAlert('Project with same name already exist');
          }
        });
      } else {
        this.addAlert('Field shouldn\'t be empty');
        this.isDisabled = true;
      }
      break;
      default: this.isDisabled = false;
    }
  }
  addAlert(message: string): void {
    if (this.alerts.indexOf(message) === -1) {
      this.alerts.push(message);
    }
  }
  removeAlert(message: string): void {
    const index: number = this.alerts.indexOf(message);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }
  save(): void {
    if (this.choosedProject.id === 0) {
      this.projectService.addProject(this.newProject).subscribe(data => {
        localStorage.setItem('currentProject', data);
        this.router.navigate([`/project/`, data]);
      });
    } else {
      console.log('choosed - ' + this.choosedProject.name);
      localStorage.setItem('currentProject', this.choosedProject.id.toString());
      this.router.navigate([`/project/`, this.choosedProject.id.toString()]);
      // this.redirect.emit([`/project/`, this.choosedProject.id.toString()]);
    }
  }
  getProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(projects => this.projects = projects);
    // this.projects = [ {name: 'first project', id: 3}, {name: 'second project', id: 2}, {name: 'third project', id: 1}];
  }
  choose( project ): void {
    this.choosedProject = project;
    if (project.id !== 0) {
      this.validate();
    }
  }
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getProjects();
  }
}
