import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';
import { TopicInterface } from '../../types/topic.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  topics: Observable<TopicInterface[]> | null = null;
  activeTitle = '';
  autoUnsub: Subject<boolean> = new Subject();

  navigateToCategories(event: MouseEvent, title: string, topicId: number) {
    event.stopPropagation();
    this.router.navigate([`topics/${title}/${topicId}`]);
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly testsService: TestsService,
    public modalService: ModalService,
  ) {}

  ngOnInit() {
    this.getTopics();
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
  getTopics() {
    this.topics = this.testsService.getTopics();
  }

  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
