import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {routeAnimation} from '../../animations';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Project} from '../../model/Project';
import {ApprenticeSheetService} from '../../services/apprentice-sheet.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { merge } from 'rxjs/observable/merge';
import {map} from 'rxjs/operators';

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
  apprenticeSheetsIds: number[];
  words = [];
  page: {id: number, num: number};

  constructor(
    private projectService: ProjectService,
    private apprenticeSheetService: ApprenticeSheetService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    merge(
      this.apprenticeSheetService.getApprenticeSheetCount(+this.route.snapshot.paramMap.get('id'))
        .pipe(map(ids => this.apprenticeSheetsIds = ids) ),
      this.projectService.getProject(+this.route.snapshot.paramMap.get('id')).pipe(map(project => this.project = project) )
    ).subscribe( data => {
      if (this.project && this.apprenticeSheetsIds) {
        this.route.paramMap.map((params: ParamMap) => {
          this.page = {id: +params.get('sheetId'), num: this.apprenticeSheetsIds.indexOf(+params.get('sheetId')) + 1};
          this.createSheet();
          return null;
        }).subscribe();
      }
    });
  }

  createSheet(): void {
    this.apprenticeSheetService.getApprenticeSheet(this.project.id, this.page.id).subscribe( sheets => {
      this.words = [];
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
          this.words.push(newWords);
        }
      }
    });
  }

  pageChange(): void {
    this.page.id = this.apprenticeSheetsIds[this.page.num - 1];
    this.router.navigate([`/project/${this.project.id}/apprentice-sheet/${this.page.id}`]);
  }

  changeWord(id: number, page) {
    this.apprenticeSheetService.changeWord(this.apprenticeSheetsIds[page], id).subscribe(name => {
      this.words = this.words.map(el => el.map( deeperEl => deeperEl.map( deepEl => {
        if (deepEl.key === id) {
          deepEl.value = name;
        }
        return deepEl;
      })));
    });
  }

  delete(): void {
    this.apprenticeSheetService.deleteSheet(this.page.id).subscribe(_ => this.router.navigate([`/project/${this.project.id}`]));
  }

}
