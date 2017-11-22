import {Component, Input, OnInit} from '@angular/core';
import {WordGroup} from '../model/Group';
import {ProjectService} from '../project.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() id: number;
  groups: WordGroup[];
  currentGroup: WordGroup;

  edit(modal, id: number): void {
    this.currentGroup = this.groups[id];
    this.modalService.open(modal, { windowClass: 'my-modal'});
  }

  constructor( private projectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getGroups();
  }
  getGroups() {
    // this.projectService.getGroups(this.id);
    this.groups = [{ name: 'good', others: ['nice', 'light', 'kind'] }, { name: 'bad', others: ['evil', 'dirty', 'another'] }];
  }
}
