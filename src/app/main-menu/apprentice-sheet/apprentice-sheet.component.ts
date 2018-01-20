import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {routeAnimation} from '../../animations';
import {ProjectService} from '../../project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../model/Project';
import {ApprenticeSheetService} from "../../apprentice-sheet.service";

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
  @Input() project: Project;
  rows: number;
  sheets = [];

  constructor(
    private projectService: ProjectService,
    private appreticeSheetService: ApprenticeSheetService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    const projectId = +this.route.snapshot.paramMap.get('id');
    const sheetId = +this.route.snapshot.paramMap.get('sheetId');
    console.log(sheetId);
    this.appreticeSheetService.getApprenticeSheet(projectId, sheetId).subscribe( sheets => {
      for (const words of sheets) {
        if (words.length > 0) {
          const newWords = [];
          const letWords = words;
          const length = letWords.length;
          this.rows = 1;
          let h, w;
          while (true) {
            h = (744 / this.rows);
            w = 1122 / (length / this.rows);
            if (w >= h) {
              break;
            }
            this.rows++;
          }
          for (let i = 0; i < this.rows; i++) {
            newWords[i] = [];
            const wordsCountInRow = i >= this.rows - length % this.rows ?
              Math.floor(length / this.rows) + 1 :
              Math.floor(length / this.rows);
            for (let t = 0; t < wordsCountInRow; t++) {
              newWords[i][t] = letWords.shift();
            }
          }
          this.sheets.push(newWords);
        }
      }
    });
    this.projectService.getProject(projectId).subscribe(project => this.project = project);
  }

}
