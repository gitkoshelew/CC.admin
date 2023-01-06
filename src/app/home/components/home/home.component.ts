import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = ['JavaScript', 'Node.js', 'React'];
  tests = [
    {
      id: Math.random() * 10,
      name: 'Test 1',
      questions: ['Question 1', 'Question 2', 'Question 3'],
    },
    {
      id: Math.random() * 10,
      name: 'Test 2',
      questions: ['Question 1', 'Question 2', 'Question 3'],
    },
  ];
  activeTitle = '';
  autoUnsub: Subject<boolean> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.setActiveRoute()
    this.router.events.pipe(
      takeUntil(this.autoUnsub),
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.setActiveRoute()
    })
  }
  private setActiveRoute() {
    this.activeTitle = this.activatedRoute.snapshot.firstChild?.firstChild?.params['title'] || ''
    console.log(this.activeTitle)
  }
  public getActiveTitle(text: string) {
    return text == ':title' ? this.activeTitle : text;
  }

  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
