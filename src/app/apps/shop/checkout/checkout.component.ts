import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/userService';
import { Router } from '@angular/router';
import { Question } from '../../../models/questions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  questionForm!: FormGroup;
  id: string | null = null;
  question: Question | null = null;

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
      correctAnswer: ['', Validators.required],
      category: [''],
      validation: [false]  // Add validation field
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getQuestionsById(this.id);
    }
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
      this.questionForm.patchValue({
        name: this.question.name,
        text: this.question.text,
        choice1: this.question.singleChoiceData?.options[0] || '',
        choice2: this.question.singleChoiceData?.options[1] || '',
        choice3: this.question.singleChoiceData?.options[2] || '',
        choice4: this.question.singleChoiceData?.options[3] || '',
        correctAnswer: this.question.singleChoiceData?.correctAnswer || '',
        category: this.question.category,
        validation: this.question.validation || false  // Populate validation field
      });
    }
  }

  get availableChoices() {
    return [
      this.questionForm.get('choice1')?.value,
      this.questionForm.get('choice2')?.value,
      this.questionForm.get('choice3')?.value,
      this.questionForm.get('choice4')?.value
    ].filter(choice => choice);
  }

  updateQuestion(): void {
    if (this.id) {
      // Check validation
      if (this.questionForm.get('validation')?.value) {
        if (!this.questionForm.get('name')?.value || !this.questionForm.get('text')?.value) {
          this.openSnackBar2('Question name and text cannot be empty', 'Close');
          return;
        }

        const options = [
          this.questionForm.get('choice1')?.value,
          this.questionForm.get('choice2')?.value,
          this.questionForm.get('choice3')?.value,
          this.questionForm.get('choice4')?.value
        ].filter(choice => choice);

        if (options.length < 1) {
          this.openSnackBar2('There must be at least one answer', 'Close');
          return;
        }

        if (!this.questionForm.get('correctAnswer')?.value) {
          this.openSnackBar2('A correct answer must be selected', 'Close');
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
        ].filter(choice => choice),  // Filter out empty choices
        correctAnswer: this.questionForm.get('correctAnswer')?.value,
        category: this.questionForm.get('category')?.value,
        validation: this.questionForm.get('validation')?.value  // Include validation field
      };

      this.userService.updateSingleChoiceQuestion(this.id, questionData)
        .subscribe(
          response => {
            console.log('Question updated successfully', response);
            this.openSnackBar2('Question updated successfully', 'Close');
          },
          error => {
            console.error('Error updating question', error);
            this.openSnackBar2('Question is not updated!', 'Close');
          }
        );
    } else {
      console.error('Question ID is not available');
    }
  }

  openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
}
