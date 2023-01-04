import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = ['JavaScript', 'Node.js', 'React'];
  tests = [
    {
      id: Math.random()*10,
      name: 'Test 1',
      questions: ['Question 1', 'Question 2', 'Question 3'],
    },
    {
      id: Math.random()*10,
      name: 'Test 2',
      questions: ['Question 1', 'Question 2', 'Question 3'],
    },
  ];
  activeTitle = '';
  autoUnsub: Subject<boolean> = new Subject()

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // жуткий костыль, но пока не знаю как сделать по другому
    this.activatedRoute.children.forEach((childRoute) => {
      childRoute.children.forEach(subChild => {
        subChild.paramMap.pipe(takeUntil(this.autoUnsub)).subscribe(params => {
          const title = params.get('title')
          if(title) this.activeTitle = title
        });
      })
    })
  }

  public getActiveTitle(text: string) {
    return text == ':title' ? this.activeTitle : text
  }

  ngOnDestroy(): void {
    this.autoUnsub.next(false)
    this.autoUnsub.complete()
  }
}
