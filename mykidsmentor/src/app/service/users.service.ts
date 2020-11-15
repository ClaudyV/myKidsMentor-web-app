import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) { }

  saveUser(user: firebase.User){
    if(user){
      this.db.object('/users/' + user.uid).update({
        name: user.displayName,
        email: user.email
      });
    }
  }

  getUserById(uid: string): Observable<any>{
   return this.db.object('/users/' + uid)
                  .snapshotChanges()
                  .pipe(
                    map(user => {
                      const objectUser: any = user.payload.val();
                      objectUser.id = user.payload.key;
                      return objectUser;
                    })
                  );
  }
}
