import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../model/Project';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  newProject: string;
  copyName: string;
  @Input() project: Project;
  projects: Array<Project>;
  choosedProject: Project = {name: 'Choose', id: -2};
  alerts: Array<string> = [];
  copyAlerts: Array<string> = [];
  isDisabled = true;
  isCopyDisabled = true;
  modal: NgbModalRef;
  @Output() redirect = new EventEmitter<string[]>();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal
  ) { }
  ngOnInit() {
    this.getProjects();
  }

  validate(block: string, projectName: string): void {
    let isDisabled = false;
    const alerts: Array<string> = [];
    if (projectName) {
      this.projects.forEach(function(current) {
        if (current.name.localeCompare(projectName.trim()) === 0) {
          isDisabled = true;
          alerts.push('Project with same name already exist');
        }
      });
    } else {
      alerts.push('Field shouldn\'t be empty');
      isDisabled = true;
    }
    switch (block) {
      case 'new': this.isDisabled = isDisabled;
        this.alerts = alerts;
        break;
      case 'copy': this.isCopyDisabled = isDisabled;
        this.copyAlerts = alerts;
        break;
    }
  }
  save(): void {
    if (this.choosedProject.id === 0) {
      this.projectService.addProject(this.newProject).subscribe(data => {
        localStorage.setItem('currentProject', data);
        this.router.navigate([`/project/`, data]).then(() => {
          this.router.navigate([`/`]);
        });
      });
    } else {
      console.log('choosed - ' + this.choosedProject.name);
      localStorage.setItem('currentProject', this.choosedProject.id.toString());
      this.router.navigate([`/project/`, this.choosedProject.id.toString()]).then(() => {
        this.router.navigate([`/`]);
      });
      // this.redirect.emit([`/project/`, this.choosedProject.id.toString()]);
    }
  }
  copy(): void {
    this.projectService.copyProject(this.project.id, this.copyName).subscribe(project => {
      // TODO: fix navigate links;
      localStorage.setItem('currentProject', project.id + '');
      this.router.navigate([`/`]);
    });
  }
  getProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(projects => this.projects = projects);
    // this.projects = [ {name: 'first project', id: 3}, {name: 'second project', id: 2}, {name: 'third project', id: 1}];
  }
  choose( project ): void {
    this.choosedProject = project;
    if (this.choosedProject.id === -1) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
  deleteProject(): void {
    this.projectService.deleteProject(this.project.id).subscribe( _ => {
      localStorage.removeItem('currentProject');
      this.modal.close();
      this.router.navigate(['/']);
    });
  }
  open(content) {
    this.modal = this.modalService.open(content);
  }
}
