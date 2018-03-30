import {Component, OnInit, HostBinding} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { slideSideAnimation} from '../../animations/slideSide';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    slideSideAnimation,
    trigger('slideDown', [
      state('in', style({height: 'unset'})),
      transition(':enter', [
        style({height: '0'}),
        animate('.5s ease-out')
      ]),
      transition(':leave', [
        animate('.5s ease-out', style({height: '0'}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  @HostBinding('@slideSideAnimation') get slideSideAnimation() {
    return '';
  }
  username: string;
  password: string;
  error: string;
  login (): void {
    if (this.username && this.password) {
      this.loginService.login(this.username, this.password).subscribe(null,
          e => {
                this.loginService.removeSpinner();
                if (e.status === 200) {
                  this.router.navigate(['/welcome/projects']);
                } else if (e.status === 401) {
                  this.error = 'Wrong username or password';
                } else {
                  this.error = 'Error on server side';
                }
          });
    } else if (!this.username && !this.password) {
      this.error = 'Input username and password!';
    } else if (!this.username) {
      this.error = 'Inout username!';
    } else {
      this.error = 'Input password!';
    }
  }
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {

  }

}
