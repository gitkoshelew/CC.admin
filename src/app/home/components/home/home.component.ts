import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';
import { CategoryInterface } from '../../types/category.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: Observable<CategoryInterface[]> | null = null;
  activeTitle = '';
  autoUnsub: Subject<boolean> = new Subject();

  navigateToCategories(event: MouseEvent, title: string, topicId: number) {
    event.stopPropagation();
    this.router.navigate([`categories/${title}/${topicId}`]);
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly testsService: TestsService,
    public modalService: ModalService,
  ) {}

  ngOnInit() {
    this.getCategories();
    this.setActiveRoute();
    this.router.events
      .pipe(
        takeUntil(this.autoUnsub),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.setActiveRoute();
      });
  }
  private setActiveRoute() {
    this.activeTitle =
      this.activatedRoute.snapshot.firstChild?.params['title'] || '';
  }
  public getActiveTitle(text: string) {
    return text == ':title' ? this.activeTitle : text;
  }
  getCategories() {
    this.categories = this.testsService.getCategories();
  }

  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
