import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase, private userAuth: AngularFireAuth) { }

  saveUser(user: firebase.User){
    if(user){
      this.db.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      });
    }
  }

  getUserById(uid: string): Observable<any>{
   return this.db.object('/users/' + uid)
                  .snapshotChanges()
                  .pipe(
                    map(user => {
                      const objectUser: any = user.payload.val();
                      if(objectUser) {
                        objectUser.id = user.payload.key;
                      }
                      return objectUser;
                    })
                  );
  }

  getAllUsers():Observable<any> {
    return this.db.list('/users')
    .snapshotChanges()
    .pipe(
      map(
        (users: any[]) => users.map(
          user => (
            { id: user.key, ...user.payload.val() }
            )
        )
      )
    ); 
  }

  resetPassword(code, newPassword) {
    return this.userAuth.confirmPasswordReset(code, newPassword);
  }
}
