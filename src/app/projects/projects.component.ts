import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  newProject: string;
  projects: string[];
  @Input() isHeader: boolean;
  save(): void {
    this.projectService.addProject(this.newProject).subscribe(data => {
      console.log(data);
      this.getProjects();
    });
  }
  getProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(projects => this.projects = projects);
  }
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
    ) { }
  ngOnInit() {
    this.route.data.subscribe(data => this.isHeader = data.isHeader);
    this.getProjects();
  }

}
