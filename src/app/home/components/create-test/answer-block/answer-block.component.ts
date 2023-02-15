import {Component, EventEmitter, Input, Output} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

interface ContentInterface{
  options: Array<AnswerInterface>
  correctAnswer: Array<string>
}
interface AnswerInterface{
  id: number
  title: string
  isCorrectAnswer: boolean
}
type QuestionType = 'single' | 'multi';

@Component({
  selector: 'app-answer-block',
  templateUrl: './answer-block.component.html',
  styleUrls: ['./answer-block.component.scss']
})
export class AnswerBlockComponent {
  answers: ContentInterface = {options: [], correctAnswer: []} as ContentInterface;
  @Input() questionTypeProps!: QuestionType
  @Input() validateFormProps!: UntypedFormGroup;
  @Output() answersEvent = new EventEmitter<ContentInterface>()

  selectCheckbox(id: number){
    if(this.questionTypeProps === "single"){
      for (let i = 0; i <  this.answers.options.length; i++) {
        if(this.answers.options[i].isCorrectAnswer && i === id){
          for (let j = 0; j < this.answers.options.length; j++) {
            if (j !== i){
              this.answers.options[j].isCorrectAnswer = false
            }
          }
        }
      }
    }
  }

  addAnswer(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.answers.options.length > 0 ? this.answers.options[this.answers.options.length - 1].id + 1 : 0;
    const answer: AnswerInterface = {
      id,
      title: `title${id}`,
      isCorrectAnswer: false
    };
    const index = this.answers.options.push(answer);
    this.validateFormProps.addControl(
      this.answers.options[index - 1].title,
      new UntypedFormControl(null, Validators.required)
    );
  }

  removeAnswer(answer: AnswerInterface, e: MouseEvent): void {
    e.preventDefault();
    if (this.answers.options.length > 1) {
      const index = this.answers.options.indexOf(answer);
      this.answers.options.splice(index, 1);
      this.validateFormProps.removeControl(answer.title);
    }
  }
  ngOnInit(): void {
    this.addAnswer();
  }
}

