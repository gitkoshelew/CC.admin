import {Component, OnInit} from '@angular/core';
import {TestsService} from "../../../services/tests.service";
import {Observable} from "rxjs";
import {CategoryInterface} from "../../../types/category.interface";

type ComplexityType = 'light' | 'medium' | 'hard';
type QuestionsNumberType = '10' | '15' | '20' | '25' | '30';

@Component({
  selector: 'app-setting-test',
  templateUrl: './setting-test.component.html',
  styleUrls: ['./setting-test.component.scss']
})
export class SettingTestComponent implements OnInit {
  selectedCategory = null;
  categories: Observable<CategoryInterface[]> | null = null;
  complexity: ComplexityType = 'medium';
  questionsNumber: QuestionsNumberType = '10';

  constructor(private readonly testsService: TestsService,) {
  }
  getCategories() {
    this.categories = this.testsService.getCategories();
  }
  ngOnInit(): void {
    this.getCategories();
  }
}
