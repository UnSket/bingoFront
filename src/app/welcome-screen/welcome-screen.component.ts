import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {routeAnimation} from "../animations";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  animations: [
    routeAnimation
  ]
})
export class WelcomeScreenComponent implements OnInit, AfterViewInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return '';
  }
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

  startAnimation(path: string[]): void {
    console.log('connect' + path);
    this.path = path;
    this.redirect();
  }
  redirect(): void {
    this.router.navigate(this.path);
  }
}
