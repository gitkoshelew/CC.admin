import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = ['JavaScript', 'Node.js', 'React'];

  activeTitle = '';
  autoUnsub: Subject<boolean> = new Subject();

  navigateToCategories(event: MouseEvent, path: string) {
    event.stopPropagation();
    this.router.navigate([`categories/${path}`]);
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public modalService: ModalService,
  ) {}

  ngOnInit() {
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

  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
