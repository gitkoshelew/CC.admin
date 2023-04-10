import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TopicInterface } from '../../types/topic.interface';
import { TestsService } from '../../services/tests.service';
import { ActivatedRoute, Router } from '@angular/router';

type QuestionDataType = {
  questionId: string;
  isCompleted: boolean;
};
type QuestionsNumberType = '10' | '15' | '20' | '25' | '30';
interface AnswerInterface {
  titleAnswer: string;
  isCorrectAnswer: boolean;
}

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss', '../../../../styles.scss'],
})
export class CreateTestComponent implements OnInit {
  createTestForm!: FormGroup;
  defaultNumber: QuestionsNumberType = '10';
  questionPages!: any[];
  topics: Observable<TopicInterface[]> | null = null;
  topicId!: number;
  topicTitle!: string;

  constructor(
    private fb: FormBuilder,
    private readonly testsService: TestsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  submitForm(): void {
    if (this.createTestForm.valid) {
      console.log('submit', this.createTestForm.value);
    }
  }
  get titleQuestion() {
    return this.createTestForm.get('setting')!.get('titleQuestion');
  }
  get answers() {
    return this.createTestForm.get('answers') as FormArray;
  }
  get typeQuestion() {
    return this.createTestForm.get('extraSetting')!.get('questionType');
  }
  get numberQuestions() {
    return this.createTestForm.get('setting')!.get('numberQuestions');
  }
  setNavigateData(): void {
    this.topicId = this.activatedRoute.snapshot.params['topicId'];
    this.topicTitle = this.activatedRoute.snapshot.params['title'];
  } //получение значений из урла для реализации кнопки "назад" из создания теста
  initialFormBuilder(): void {
    this.createTestForm = this.fb.group({
      setting: this.fb.group({
        titleQuestion: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(100)]],
        difficulty: ['medium', Validators.required],
        topic: [this.topicId, Validators.required],
        numberQuestions: [this.defaultNumber],
      }),
      extraSetting: this.fb.group({
        questionType: ['single', Validators.required],
        time: this.fb.group({
          minutes: [0, Validators.required],
          seconds: [0, Validators.required],
        }),
      }),
      answers: this.fb.array([
        this.fb.group({
          titleAnswer: ['', [Validators.required, Validators.maxLength(100)]],
          isCorrectAnswer: [false, Validators.required],
        }),
      ]),
    });
  } // инициализация формы
  getTopics() {
    this.topics = this.testsService.getTopics();
  } //получение всех топиков с бэка
  onChangeQuestionType() {
    for (let i = 0; i < this.answers.value.length; i++) {
      this.answers.value[i].isCorrectAnswer = false;
    }
  } //сбрасывает все выранные ответы если мы переключили тип вопроса
  onChangeNumberQuestions() {
    console.log(this.questionPages);
    this.questionPages = new Array(Number(this.numberQuestions?.value));
  } //устанвливает количество вопросов в квизе
  setNumberCorrectAnswers(index: number) {
    if (this.typeQuestion?.value === 'single') {
      for (let i = 0; i < this.answers.value.length; i++) {
        if (i === index && this.answers.value[i].isCorrectAnswer) {
          for (let j = 0; j < this.answers.value.length; j++) {
            if (j !== i) {
              this.answers.value[j].isCorrectAnswer = false;
            }
          }
        }
      }
    }
  } //устанавливает количество правильных ответов
  addAnswer(): void {
    this.answers.push(
      this.fb.group({
        titleAnswer: ['', [Validators.required, Validators.maxLength(100)]],
        isCorrectAnswer: [false, Validators.required],
      }),
    );
  } //добовляет новый ответ
  removeAnswer(index: number): void {
    this.answers.removeAt(index);
  } //удаляет ответ
  navigateBackToTopic() {
    this.router.navigate([`topics/${this.topicTitle}/${this.topicId}`]);
  } //навигация обратно на страницу топика
  validationTrueAnswer(): boolean {
    return !this.answers.value.some((element: AnswerInterface) => {
      return element.isCorrectAnswer;
    });
  } //валидация, что хотя бы один правильный ответ должен быть выбран

  ngOnInit(): void {
    this.setNavigateData();
    this.getTopics();
    this.questionPages = new Array(Number(this.defaultNumber));
    this.initialFormBuilder();
  }
}
