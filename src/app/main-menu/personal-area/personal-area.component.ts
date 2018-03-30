import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  user: User;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  logout (): void {
    this.loginService.logout().subscribe( null, error => {
      this.router.navigate(['welcome/login']);
      this.loginService.removeSpinner();
    });
  }

}
