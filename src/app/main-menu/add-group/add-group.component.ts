import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../model/Project';
import {WordGroup} from '../../model/Group';
import {ProjectService} from '../../services/project.service';
import {GroupService} from '../../services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  @Input() project: Project;
  @Input() title: string;
  @Output() end = new EventEmitter<WordGroup>();
  @Input() group: WordGroup;
  currentInput: string;
  editId = -1;
  currentCount: number;


  constructor( private projectService: ProjectService,
               private groupService: GroupService) { }

  ngOnInit() {
    if (!this.group) {
      this.group = {name: '', others: [], id: -1};
      this.groupService.getGroups(this.project.id).subscribe(groups => this.currentCount = groups.length + 1);
    }
  }

  add(): void {
    if (this.editId !== -1) {
      if (this.editId === -2) {
        this.group.name = this.currentInput;
      } else {
        this.group.others[this.editId] = this.currentInput;
      }
      this.editId = -1;
    } else if (this.currentInput) {
      if (this.group.name) {
        this.group.others.push(this.currentInput);
      } else {
        this.group.name = this.currentInput;
      }
    }
    this.currentInput = '';
  }
  edit(id: number, word: string): void {
    this.editId = id;
    this.currentInput = word;
  }
  clear(): void {
    if (this.group.id === -1) {
      this.editId = -1;
      this.currentInput = '';
      this.group = {name: '', others: [], id: -1};
    } else {
      this.groupService.removeGroup(this.group.id).subscribe( data => {
        this.end.emit(null);
        this.currentCount --;
      } );
    }
  }
  save(): void {
    if (this.group.id === -1) {
      this.groupService.addGroup(this.project.id, this.group).subscribe(data => {
        console.log(data);
        this.currentCount ++;
        this.clear();
      });
    } else {
      this.groupService.updateGroup(this.group).subscribe(data => {
        console.log(data);
        this.end.emit(this.group);
      });
    }
  }
}
