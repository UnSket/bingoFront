import {Component, Input, OnInit} from '@angular/core';
import {WordGroup} from '../../model/Group';
import {ProjectService} from '../../services/project.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../model/Project';
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() project: Project;
  groups: WordGroup[];
  currentGroup: WordGroup;
  modal: NgbModalRef;

  constructor( private projectService: ProjectService,
               private groupService: GroupService,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.getGroups();
  }

  edit(modal, id: number): void {
    this.currentGroup = this.groups[id];
    this.modal = this.modalService.open(modal, { windowClass: 'my-modal'});
  }

  getGroups() {
    this.groupService.getGroups(this.project.id).subscribe( next => {
      this.groups = next;
    });
    // this.groups = [{ name: 'good', others: ['nice', 'light', 'kind'] }, { name: 'bad', others: ['evil', 'dirty', 'another'] }];
  }
  update(group: WordGroup) {
    if (!group) {
      this.groups.splice(this.groups.indexOf(this.currentGroup), 1);
    } else {
      this.groups[this.groups.indexOf(this.currentGroup)] = group;
    }
    this.currentGroup = group;
    this.modal.close('close');
  }
}
