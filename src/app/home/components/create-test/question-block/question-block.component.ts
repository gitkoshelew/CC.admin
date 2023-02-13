import {Component, EventEmitter, OnInit, Output} from '@angular/core';

type TimerDefaultType = {
  minutes: string;
  seconds: string;
};
type QuestionType = 'single' | 'multi';

@Component({
  selector: 'app-question-block',
  templateUrl: './question-block.component.html',
  styleUrls: ['./question-block.component.scss']
})
export class QuestionBlockComponent implements OnInit{
  @Output() questionTypeEvent = new EventEmitter<QuestionType>()
  selectedQuestionType: QuestionType = 'single';
  onChangeType(){
    this.questionTypeEvent.emit(this.selectedQuestionType)
  }

  timer: TimerDefaultType = {
    minutes: '5',
    seconds: '00',
  };
  questionTypeData: QuestionType[] = ['single', 'multi'];

  ngOnInit(): void {
    this.onChangeType()
  }
}
