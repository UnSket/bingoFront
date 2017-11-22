import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('inactive', style({
        transform: 'scale(10)',
        opacity: 0,
      })),
      state('active',   style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-in'))
    ])
  ]
})
export class WelcomeScreenComponent implements OnInit, AfterViewInit {
  state = 'inactive';
  path: string[];

  constructor( private route: ActivatedRoute, private router: Router ) { }
  checkLocalStorage(): void {
    if (localStorage.getItem('currentProject')) {
      this.router.navigate(['project/', localStorage.getItem('currentProject')]);
    } else {
      this.router.navigate(['/']);
    }
  }
  ngAfterViewInit() {
    this.state = 'active';
  }
  ngOnInit() {
    this.checkLocalStorage();
  }
  // Запускает анимацию перед редиректом
  startAnimation(path: string[]): void {
    console.log('connect' + path);
    this.path = path;
    this.state = 'inactive';
  }
  redirect(): void {
    if (this.state === 'inactive') {
      this.router.navigate(this.path);
    }
  }
}
