import {Component, HostBinding, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {WordGroup} from "../model/Group";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../model/Project";
import {routeAnimation} from "../animations";

@Component({
  selector: 'app-teacher-sheet',
  templateUrl: './teacher-sheet.component.html',
  styleUrls: ['./teacher-sheet.component.css'],
  animations: [
    routeAnimation
  ]
})
export class TeacherSheetComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return '';
  }
  groups: WordGroup[];
  groups2: WordGroup[];
  project: Project;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getGroups(id);
  }

  getGroups(id: number): void{
    this.projectService.getGroups(id).subscribe(groups => {
      if(groups.length > 20) {
        this.groups = groups.slice(0, 20);
        this.groups2 = groups.slice(20);
      } else {
        this.groups = groups;
      }
    });
    this.projectService.getProject(id).subscribe(project => this.project = project)
  }

}
