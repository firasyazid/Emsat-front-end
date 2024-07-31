import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  questionForm!: FormGroup ;

  constructor( 

    private fb: FormBuilder

  ) { }
  ngOnInit(): void {
    this.questionForm = this.fb.group({
      questionName: ['', Validators.required],
      questionText: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.questionForm.valid) {
      console.log('Form Submitted!', this.questionForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
