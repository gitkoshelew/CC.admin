import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categories = ['JavaScript', 'Node.js', 'React'];
  tests = [
    {
      id: Math.random(),
      name: 'Test 1',
      questions: ['Question 1', 'Question 2', 'Question 3'],
    },
    {
      id: Math.random(),
      name: 'Test 2',
      questions: ['Question 1', 'Question 2', 'Question 3'],
    },
  ];
}
