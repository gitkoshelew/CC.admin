import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';
import { TopicInterface } from '../../types/topic.interface';
import { Observable } from 'rxjs';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  topics: Observable<TopicInterface[]> | null = null;

  constructor(
    private readonly router: Router,
    private readonly testsService: TestsService,
    public modalService: ModalService,
  ) {}

  navigateToCategories(event: MouseEvent, title: string, topicId: number) {
    event.stopPropagation();
    this.router.navigate([`topics/${title}/${topicId}`]);
  }
  getTopics() {
    this.topics = this.testsService.getTopics();
  }

  ngOnInit(): void {
    this.getTopics();
  }
}
