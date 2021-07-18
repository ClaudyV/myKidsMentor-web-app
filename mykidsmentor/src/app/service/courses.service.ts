import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
export interface Course {
  id: string,
  authorImage:string,
  title:string,
  desc:string,
  category:string,
  url:string
  time:string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }
  getAllCourses() {
   return this.db.list('/newcourses')
                 .snapshotChanges()
                 .pipe(
                  map(changes =>
                    changes.map(c => (
                      { 
                        key: c.payload.key, ...c.payload.val() as {}
                      }
                      ))
                 )
                 )
  }

  addCourse(course:Course)
   {
     return this.db.list('/newcourses/').push({
      authorImage: course.authorImage,
      title: course.title,
      desc: course.desc,
      category: course.category,
      url: course.url,
      time: course.time,
      type: "newcourses"
     });
   }

   getCoursebyId(uid:string) {
    return this.db.object('/newcourses/'+uid)
            .snapshotChanges()
            .pipe(
              map(course=>{
                let obj:any=course.payload.val();
                console.log(obj.desc);
                let courseTemp:Course={
                  id:course.key,
                  authorImage: obj.authorImage,
                  title: obj.title,
                  desc: obj.desc,
                  category: obj.category,
                  url: obj.url,
                  time: obj.time,
                  type: "newcourses"
                };
                return courseTemp;
              })
            )
   }

   updateCourse(course:Course) {
    return this.db.object('/newcourses/'+course.id).update({
      authorImage: course.authorImage,
      title: course.title,
      desc: course.desc,
      category: course.category,
      url: course.url,
      time: course.time,
      type: "newcourses"
     });
   }

   deleteCourse(id:string) {
     return this.db.object('/newcourses/'+id).remove();
   }
}
