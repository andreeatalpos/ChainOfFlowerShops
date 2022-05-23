import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user = new User();
  errorMessage="Invalid credentials!";
  invalidLogin = false;
  roles: string[] = ['admin', 'employee'];
  bk:string ="assets/images/loginbk.jpg"
  

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private _snackBar: MatSnackBar) { }

ngOnInit(): void {
}

loginUser(){
    console.log(this.user.role);
    this.authenticationService.loginUser(this.user).subscribe(
    data => this.router.navigate([this.user.role]),
    error => this.openSnackBar()
  )
  console.log(this.invalidLogin);

}

openSnackBar() {
  this._snackBar.openFromComponent(PizzaPartyComponent, {
    duration: 4 * 1000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    
  });
}
}
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: red;
      font-size: 20px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class PizzaPartyComponent {}


