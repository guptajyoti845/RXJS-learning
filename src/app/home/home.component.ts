import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourse$: Observable<Course[]>;
  advancedCourse$: Observable<Course[]>;

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$: Observable<Course[]> = http$.pipe(
      tap(() => {console.log("HTTP executed")}),
      map(res => Object.values(res['payload'])),
      shareReplay()
    );

    this.beginnerCourse$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    )
    this.advancedCourse$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED'))
    )
  }

}
