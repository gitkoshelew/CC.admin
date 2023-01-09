import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WebsocketService } from 'src/shared/websocket/websocket.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  public messages$: Observable<string[]>;

  public form: FormGroup;

  constructor(private fb: FormBuilder, private wsService: WebsocketService) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, [Validators.required]],
    });

    this.messages$ = this.wsService.on<string[]>('messages');
  }

  public sendText(): void {
    if (this.form.valid) {
      this.wsService.send('set-text', this.form.value.text);
      this.form.reset();
    }
  }
}
