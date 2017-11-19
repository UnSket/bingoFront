import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  newProject: string;
  projects: string[];
  save(): void {
    this.projectService.addProject(this.newProject).subscribe(data => {
      console.log(data);
      this.getProjects();
    });
  }
  constructor( private projectService: ProjectService) { }
  getProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(projects => this.projects = projects);
  }
  ngOnInit() {
    this.getProjects();
  }

}
