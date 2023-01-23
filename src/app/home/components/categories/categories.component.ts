import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories = [
    'JavaScript',
    'Node.js',
    'React',
    'Angular',
    'React Native',
    'Python',
    'Java',
    'C++',
    'SQL',

    'HTML',
    'Css',
  ]; //TODO: get data from the server through the service

  constructor(
    private readonly router: Router,
    public modalService: ModalService,
  ) {}

  navigateToCategories(event: MouseEvent, path: string) {
    event.stopPropagation();
    this.router.navigate([`categories/${path}`]);
  }
}
