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
export class WelcomeScreenComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return '';
  }
  path: string[];

  constructor( private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
  }

}
