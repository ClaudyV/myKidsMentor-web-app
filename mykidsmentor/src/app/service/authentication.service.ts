import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  authState: any = null;
  authStateName;

  constructor(public authLogin: AngularFireAuth, private dialog: MatDialog, private router: Router) {
                this.authLogin.authState.subscribe(
                  user => {
                    console.log(user);
                    this.authState = user;
                    this.authStateName = user.displayName;
                  }
                  );
               }

  onLogin(formData?) {

      if (formData) {
          return this.authLogin.signInWithEmailAndPassword(formData.email, formData.password);
      }
  }

  onLoginWithGoogle() {
    return this.authLogin.signInWithPopup(new auth.GoogleAuthProvider());
  }

  onLoginWithFb() {
    return this.authLogin.signInWithPopup(new auth.FacebookAuthProvider());
  }

  getCurrentUser() {
    return this.authLogin.authState;
  }

  resetPassword(email, actionCodeSettings) {
    return this.authLogin.sendPasswordResetEmail(email, actionCodeSettings);
  }

  logout() {
    return this.authLogin.signOut().then(success => {
      setTimeout(() => window.location.reload(), 2000);
    });
  }

  createUser(formData) {
    return this.authLogin.createUserWithEmailAndPassword(formData.value.email, formData.value.password);
  }

  canActivate(): Observable<boolean> {
    return this.authLogin.authState
                    .pipe(
                      map(user => {
                          if(user) {
                            return true;
                          } else {
                            this.router.navigate(['']);
                            return false;
                          }
                      })
                    );
  }

}
