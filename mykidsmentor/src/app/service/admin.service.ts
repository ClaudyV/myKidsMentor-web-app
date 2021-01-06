import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private db: AngularFireDatabase, private login: AuthenticationService, private route: Router) { }

  canActivate(): Observable<boolean>{
   return this.login.getCurrentUserDb()
                .pipe(
                  map(user => {
                    if (!user) { return false; }
                    if (user.isAdmin) { return true; }
                    this.route.navigate(['']);
                    return false;
                  })
                );
  }
}
