import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
  import { Article } from '../../models/article';
  import { MessageService } from 'primeng/api';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { ConfirmationService } from 'primeng/api';  
import { Form } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  articles: Article[] = [];
  imageDisplay!: string | ArrayBuffer;
  imageDisplay1!: string | ArrayBuffer;
  imageDisplay2!: string | ArrayBuffer;
  imageDisplay3!: string | ArrayBuffer;
  VideoDisplay4!: string | ArrayBuffer;

  newArticle: Article = {
    _id: '',
    title: '',
    description: '',
    contenu: '',
    category: '',
    source: '',
    image: '',
    image1: '',
    image2: '',
    image3: '',
    video: '',
    categoryName: '',
  };

  CategotyOptions: Category[] = [];
  selected!: Category;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.getArticles();
    this.SpecOptions();
  }


    getArticles() {
    this.userService.getArticle().subscribe((data) => {
      this.articles = data;
    });

}

deleteArt(userId: string) {
  this.userService.deleteArticle(userId).subscribe(() => {
      this.getArticles();
      this.openSnackBar2('Article deleted successfully', 'Close');
  });
}
openSnackBar2(message: string, action: string) {
this.snackBar.open(message, action, {
    duration: 2000,  
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
});
}

addArticle(art: Article,
    categoryId: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    video: string

): void {
  this.userService.addArticle(
    art,
    categoryId,
    image1,
    image2,
    image3,
    image4,
    video
  ).subscribe(
    response => {
      console.log('Article added successfully:', response);
      this.openSnackBar2('Article added successfully', 'Close');
      this.getArticles();
      this.modalService.dismissAll();
     },
    error => {
      console.error('Error adding Article:', error);
      this.openSnackBar2('Error adding Article', 'Close');}
  );
}
open(content: any) {
  this.modalService.open(content);
}
 

onImageUpload(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.newArticle.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
 
onImageUpload1(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.newArticle.image1 = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay1 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

onImageUpload2(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.newArticle.image2 = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay2 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}

onImageUpload3(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.newArticle.image3 = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay3 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}


onImageUpload4(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.newArticle.video = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.VideoDisplay4 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}



SpecOptions() {
  this.userService.getCat().subscribe(
    (options: Category[]) => {
    this.CategotyOptions = options;
    console.log('Category options', options);
    },
    (error) => {
    console.error('Failed to load Category options', error);
    }
  );
  }  

onCategoryChange(event: any) {
  if (event.value) {
    this.newArticle.category = event.value._id; 
  }
}


    
}