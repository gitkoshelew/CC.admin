import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';
import {CategoryInterface} from "../../types/category.interface";
import {Observable} from "rxjs";
import {TestsService} from "../../services/tests.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit{
  categories: Observable<CategoryInterface[]> | null = null;

  constructor(
    private readonly router: Router,
    private readonly testsService: TestsService,
    public modalService: ModalService,
  ) {}

  navigateToCategories(event: MouseEvent, title: string, topicId: number) {
    event.stopPropagation();
    this.router.navigate([`categories/${title}/${topicId}`]);
  }
  getCategories() {
    this.categories = this.testsService.getCategories();
  }

  ngOnInit(): void {
    this.getCategories()
  }
}
