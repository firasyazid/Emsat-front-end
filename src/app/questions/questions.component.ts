import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userService';
import { Question } from '../models/questions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  displayDialog = false;
  isModal = false;
  testId: string | null = null;
  categoryId: string | null = null;
  questionType: string = '';
  questionName: string = '';


  questions: Question[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,


  ) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    console.log('Category ID:', categoryId);
    this.categoryId = categoryId;

    if (categoryId) {
      // Fetch the test ID by category ID
      this.userService.getTestByCategoryId(categoryId).subscribe(
        (response: { testId: string }) => {
          this.testId = response.testId;
          console.log('Test ID:', this.testId);

          // Fetch the questions for the category
          this.userService.getQuestionsByCategory(categoryId).subscribe(
            (data: Question[]) => {
              this.questions = data;
              console.log('Questions:', this.questions);
            },
            (error) => {
              console.error('Error fetching questions:', error);
            }
          );

        },
        (error) => {
          console.error('Error fetching test ID by category ID:', error);
        }
      );
    }
  }

  showDialog(): void {
    this.displayDialog = true;
  }


  hideDialog(): void {
    this.displayDialog = false;
  }

  onSubmit(): void {
    console.log('Form values:', this.testId, this.categoryId, this.questionType, this.questionName);
    if (this.testId && this.categoryId && this.questionType && this.questionName) {
      this.userService.addQuestionToCategory(this.testId, this.categoryId, this.questionType, this.questionName).subscribe(
        (newQuestion: Question) => {
          console.log('Question added:', newQuestion);
          this.questions.push(newQuestion);
          this.openSnackBar2('Question added successfully', 'Close');
          this.hideDialog();
        },
        (error) => {
          console.error('Error adding question:', error);
        }
      );
    } else {
      console.error('All fields are required');
    }
  }
  DeleteQuestion(questionid: string): void {

    try {
      this.userService.deleteQuestion(questionid).subscribe(
        (response: object) => {
          console.log('Question deleted:', response);
          this.userService.getQuestionsByCategory(this.categoryId || '').subscribe(
            (data: Question[]) => {
              this.questions = data;
              console.log('Questions:', this.questions);
            },
            (error) => {
              console.error('Error fetching questions:', error);
            }
          );
          this.openSnackBar2('Question deleted successfully', 'Close');
        },
        (error) => {
          console.error('Error deleting question:', error);
        }
      );
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  }

  openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  confirmDeletion(questionid: string): void {
    if (window.confirm('Are you sure you want to delete this test?')) {
      this.DeleteQuestion(questionid);
    }

  }

  navigateToCategories(id: string, type: string): void {
    if (type === 'singleChoice') {
      this.router.navigate(['/admin/ecom-checkout/', id]);
    } else if (type === 'multipleChoice') {
      this.router.navigate(['/admin/Multiplechoice/', id]);
    }
   }


}
