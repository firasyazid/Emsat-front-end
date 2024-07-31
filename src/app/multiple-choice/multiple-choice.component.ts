import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userService';
import { Router } from '@angular/router';
import { Question } from '../models/questions';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {
  questionForm!: FormGroup;
  id: string | null = null;
  question: Question | null = null;
  correctAnswerChoices: string[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
      choice1: [''],
      choice2: [''],
      choice3: [''],
      choice4: [''],
      correctAnswers: this.fb.array([]),
      category: [''],
      validation: [false]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getQuestionsById(this.id);
    }

    this.getCorrectAnswerChoices(this.id || '');
   }

  getQuestionsById(id: string): void {
    this.userService.getQuestionsbyId(id).subscribe(
      (data: Question) => {
        this.question = data;
        this.populateForm();
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  populateForm(): void {
    if (this.question) {
      const correctAnswers = this.question.multipleChoiceData?.correctAnswer || [];
      this.questionForm.patchValue({
        name: this.question.name,
        text: this.question.text,
        choice1: this.question.multipleChoiceData?.options[0] || '',
        choice2: this.question.multipleChoiceData?.options[1] || '',
        choice3: this.question.multipleChoiceData?.options[2] || '',
        choice4: this.question.multipleChoiceData?.options[3] || '',
        category: this.question.category,
        validation: this.question.validation || false
      });
  
      // Set correct answers
      this.correctAnswersFormArray.clear();
      correctAnswers.forEach(answer => {
        this.correctAnswersFormArray.push(this.fb.control(answer));
      });
    }
  }
  
  get correctAnswersFormArray(): FormArray {
    return this.questionForm.get('correctAnswers') as FormArray;
  }
  
  get availableChoices() {
    return [
      this.questionForm.get('choice1')?.value,
      this.questionForm.get('choice2')?.value,
      this.questionForm.get('choice3')?.value,
      this.questionForm.get('choice4')?.value
    ].filter(choice => choice);
  }

  onCorrectAnswerChange(choice: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (isChecked) {
      this.correctAnswersFormArray.push(this.fb.control(choice));
    } else {
      const index = this.correctAnswersFormArray.controls.findIndex(x => x.value === choice);
      this.correctAnswersFormArray.removeAt(index);
    }
  }

  updateQuestion(): void {
    if (this.id) {
      if (this.questionForm.get('validation')?.value) {
        if (!this.questionForm.get('name')?.value || !this.questionForm.get('text')?.value) {
          this.openSnackBar('Question name and text cannot be empty', 'Close');
          return;
        }

        const options = [
          this.questionForm.get('choice1')?.value,
          this.questionForm.get('choice2')?.value,
          this.questionForm.get('choice3')?.value,
          this.questionForm.get('choice4')?.value
        ].filter(choice => choice);

        if (options.length < 2) {
          this.openSnackBar('There must be at least two answers', 'Close');
          return;
        }

        if (this.correctAnswersFormArray.length < 2) {
          this.openSnackBar('There must be at least two correct answers', 'Close');
          return;
        }
      }

      const questionData = {
        name: this.questionForm.get('name')?.value,
        text: this.questionForm.get('text')?.value,
        options: [
          this.questionForm.get('choice1')?.value,
          this.questionForm.get('choice2')?.value,
          this.questionForm.get('choice3')?.value,
          this.questionForm.get('choice4')?.value
        ].filter(choice => choice),
        correctAnswers: this.correctAnswersFormArray.value,
        category: this.questionForm.get('category')?.value,
        validation: this.questionForm.get('validation')?.value
      };

      this.userService.updateMultipleChoiceQuestion(this.id, questionData)
        .subscribe(
          response => {
            console.log('Question updated successfully', response);
            this.openSnackBar('Question updated successfully', 'Close');
          },
          error => {
            console.error('Error updating question', error);
            this.openSnackBar('Question is not updated!', 'Close');
          }
        );
    } else {
      console.error('Question ID is not available');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }



  getcorrect_answer_indices( correctAnswers: string[], options: string[]): number[] {
    let indices: number[] = [];
    correctAnswers.forEach((answer) => {
      let index = options.indexOf(answer);
      indices.push(index);
    });
    return indices;
   }
    

   getCorrectAnswerChoices(id: string): void {
    this.userService.getCorrectAnswerChoices(this.id || '').subscribe(
      (data) => {
        this.correctAnswerChoices = data.correctAnswerChoices;
        console.log('Correct answer choices:', this.correctAnswerChoices);
        this.populateForm(); // Populate the form after fetching correctAnswerChoices

       },
      (error) => {
        console.error('Error fetching correct answer choices:', error);
      }
    );
  }

   
}
