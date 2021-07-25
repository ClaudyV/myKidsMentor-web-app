import { Component, OnInit, Inject } from '@angular/core';
import { CoursesService } from 'src/app/service/courses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, mergeMap, map } from 'rxjs/operators';
import { UsersService } from 'src/app/service/users.service';

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

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  regiForm:FormGroup;
  categories:any[];
  course:Course;
  uploadPercentCourse: Observable<number>;
  uploadPercentAuthor: Observable<number>;
  imageCourse: string = '';
  adminUsers: any;
  
  constructor(private courseService: CoursesService,
              private categoryService: CategoriesService,
              private userService: UsersService,
              private fb:FormBuilder,
              public dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public idCourse,
              private storage: AngularFireStorage) { 
    this.regiForm =  this.fb.group({  
        'Title' : [ null,Validators.required],  
        'Description' : [null, Validators.required],
        'Duration':[null,Validators.required], 
        'Category' : [null,Validators.required],
        'Author' : [null,Validators.required], 
      });
              }

  ngOnInit(): void {
    if (!this.idCourse) {
      this.getAllusers();
      this.categoryService.getAllCategories()
      .subscribe (
        categories => {
        this.categories=categories;
        this.initalizeCourse(null);
      });
      
    } else {
      this.getAllusers();
      this.categoryService.getAllCategories()
                           .pipe(
                             mergeMap(categories=>this.courseService.getCoursebyId(this.idCourse.id).pipe(
                              map(course=>{
                                return ([categories,course])
                              })
                             ))).subscribe(([categories,course])=>{
                                this.categories=categories as any[];
                                this.course=course as Course;
                                this.imageCourse = this.course.url;
                                this.initalizeCourse(course);
                             });
        
    }
  }

  getAllusers() {
    this.userService.getAllUsers()
    .subscribe(users => {
      this.adminUsers = users.filter( user => user.isAdmin === true);
    });
  }

  initalizeCourse(course) {
    this.regiForm =  this.fb.group({  
      'Title' : [ course?course.title:null,Validators.required],
      'Description' : [course?course.desc:null, Validators.required],
      'Duration':[course?course.time:null, Validators.required], 
      'Category' : [ course?course.category:null,Validators.required],
      'Author' : [ course?course.authorImage:null,Validators.required],
    });

  }

  onSubmit(form) {
    console.log(form);
    if (this.regiForm.valid) {
      let course:Course = {
        id:this.idCourse?this.idCourse.id:'',
        authorImage: form.Author,
        title: form.Title,
        desc:form.Description,
        category:form.Category,
        url: this.imageCourse,
        time:form.Duration,
        type: "newcourses"
      }
      if (!this.idCourse) {
        this.courseService.addCourse(course).then(()=>{
          this.dialogRef.close();
        });
      } else {
        this.courseService.updateCourse(course).then(()=>{
          this.dialogRef.close();
        });
      }
      this.imageCourse = '';
    }
  }

  async uploadCourseImage(event, image) {
    const file = event.target.files[0];
    const path = `${image}/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercentCourse = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURLCourse = ref.getDownloadURL()
          downloadURLCourse.subscribe(url => (this.imageCourse = url));
        })
      )
      .subscribe();}
  }

}
