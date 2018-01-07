import {Component, HostBinding, OnInit} from '@angular/core';
import {routeAnimation} from "../../animations";
import {ProjectService} from "../../project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../model/Project";

@Component({
  selector: 'app-apprentice-sheet',
  templateUrl: './apprentice-sheet.component.html',
  styleUrls: ['./apprentice-sheet.component.css'],
  animations: [
    routeAnimation
  ]
})
export class ApprenticeSheetComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return '';
  }
  project: Project;
  words: string[];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const projectId = +this.route.snapshot.paramMap.get('id');
    const sheetId = +this.route.snapshot.paramMap.get('sheetId');
    this.projectService.getApprenticeSheet(projectId, sheetId).subscribe( words => this.words = words);
    this.projectService.getProject(projectId).subscribe(project => this.project = project);

  }

}
