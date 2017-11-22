import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../model/Project';
import {WordGroup} from '../model/Group';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  @Input() project: Project;
  @Input() title: string;
  currentInput: string;
  editId = -1;

  @Input() group: WordGroup;
  constructor() { }
  ngOnInit() {
    if (!this.group) {
      this.group = {name: '', others: []};
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
    this.editId = -1;
    this.currentInput = '';
    this.group = {name: '', others: []};
  }
}
