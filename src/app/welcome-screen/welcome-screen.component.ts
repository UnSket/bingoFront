import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {
  constructor( private route: ActivatedRoute, private router: Router ) { }
  checkLocalStorage(): void {
    if (localStorage.getItem('currentProject')) {
      this.router.navigate(['project/', localStorage.getItem('currentProject')]);
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.checkLocalStorage();
  }

}
