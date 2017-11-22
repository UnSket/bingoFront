import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(100)'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out'))
    ])
  ]
})
export class WelcomeScreenComponent implements OnInit {
  state = 'inactive';
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
    this.state = 'active';
  }
  redirect(path: string[]): void {
    console.log('connect' + path);
  }
}
