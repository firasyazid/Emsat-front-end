import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { User } from '../models/user';
import { Appointment } from '../models/appointement';
import { Pharmacy } from '../models/pharmacy';
import { Pharmacy2 } from '../models/pharmacy2';
import { Region } from '../models/region';
import { Type } from '../models/types';
import { Medecin } from '../models/medecin';
import { Medecin2 } from '../models/medecin2';
import { Speciality } from '../models/speciality';
import { Article } from '../models/article';
import { Category } from '../models/category';
import { test } from '../models/tests';
import { Question } from '../models/questions';
import { Section } from '../models/section';
import { HttpHeaders } from '@angular/common/http';


export interface MonthPercentage {
  month: string;
  count: number;
}



@Injectable({
  providedIn: 'root'
})


export class UserService {
  private baseUrl = 'http://192.168.1.189:3003/api/v1/users/';
  private baseUrl2 = 'http://192.168.1.189:3003/api/v1/tests/';
  private baseUrl3 = 'http://192.168.1.189:3008/api/v1/articles/';  
  private baseUrl4 = 'http://192.168.1.189:3003/api/v1/tests/total/';   
  private baseUrluser = 'http://192.168.1.189:3003/api/v1/users/total/';  
  private forgotPasswordUrl = 'http://192.168.1.189:3003/api/v1/users/forgot-password';  
  private apiUrl = 'http://192.168.1.189:3003/api/v1/users/send-email';
  
 
  
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://192.168.1.189:3003/api/v1/users/last-user');
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    const url = `${this.baseUrl}search?q=${searchTerm}`;
    return this.http.get<User[]>(url);
  }


  getUsersbyExpire(): Observable<User[]> {
    return this.http.get<User[]>('http://192.168.1.189:3003/api/v1/users/users-by-expiry');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://192.168.1.189:3003/api/v1/users/${userId}`);
  }
   createUser(user: User): Observable<User> {
    return this.http.post<User>('http://192.168.1.189:3003/api/v1/users/register', user);
  }

    forgetpassword(email: string): Observable<object> {
    return this.http.post<object>(`${this.forgotPasswordUrl}`, { email });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`http://192.168.1.189:3003/api/v1/users/${user.id}`, user);
  }



  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3003/api/v1/users/${userId}`);
  }

  getAppointements(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('http://192.168.1.189:3005/api/v1/Appointement/');
  }


  deleteApp(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3005/api/v1/Appointement/${userId}`);
  }

  getPharmacy(): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>('http://192.168.1.189:3007/api/v1/pharmacy/');
  }

  createPharmacy(user: Pharmacy2): Observable<Pharmacy2> {
    return this.http.post<Pharmacy2>(`http://192.168.1.189:3007/api/v1/pharmacy/`, user);
  }
  
  deletePharmacy(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3007/api/v1/pharmacy/${userId}`);
  }

  getRegionPhramacy(): Observable<Region[]> {
    return this.http.get<Region[]>('http://192.168.1.189:3007/api/v1/RegionPharmacy/');
  }


  getType(): Observable<Type[]> {
    return this.http.get<Type[]>('http://192.168.1.189:3007/api/v1/type/');
  }


  getMedecin(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>('http://192.168.1.189:3004/api/v1/medecin/');
  }


  deleteMedecin(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3004/api/v1/medecin/${userId}`);
  }

  createMed(productData: FormData): Observable<Medecin> {
    return this.http.post<Medecin>('http://192.168.1.189:3004/api/v1/medecin/', productData);
  }

  addMedecin(medecin: Medecin2, imageFile: string): Observable<Medecin2> {
    const formData = new FormData();
    formData.append('fullname', medecin.fullname);
    formData.append('speciality', medecin.speciality);
    formData.append('description', medecin.description);
    formData.append('phone', medecin.phone);
    formData.append('address', medecin.address);
    formData.append('region', medecin.region);
    formData.append('image', imageFile);
    return this.http.post<Medecin2>(`${this.baseUrl}`, formData);
  }

  getSpec(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>('http://192.168.1.189:3004/api/v1/speciality/');
  }

  deleteSpec(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3004/api/v1/speciality/${userId}`);
  }
  addSpec(spec: Speciality, icon: string): Observable<Speciality> {
    const formData = new FormData();
    formData.append('titre', spec.titre);
      formData.append('icon', icon);
    return this.http.post<Speciality>(`${this.baseUrl2}`, formData);
  }

  createRegion(user: Region): Observable<Region> {
    return this.http.post<Region>(`http://192.168.1.189:3007/api/v1/RegionPharmacy/`, user);
  }
  deleteRegion(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3007/api/v1/RegionPharmacy/${userId}`);
  }
  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>('http://192.168.1.189:3008/api/v1/articles/');
  }

  deleteArticle(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3008/api/v1/articles/${userId}`);
  }


  addArticle(art: Article, categoryId: string, imageFile: string, imageFile2: string, 
    imageFile3: string, imageFile4: string, imageFile5: string): Observable<Article> {
    const formData = new FormData();
    formData.append('title', art.title);
    formData.append('description', art.description);
    formData.append('contenu', art.contenu);
    formData.append('source', art.source);
    formData.append('category', categoryId);
    formData.append('image', imageFile);
    formData.append('image1', imageFile2);
    formData.append('image2', imageFile3);
    formData.append('image3', imageFile4);
    formData.append('video', imageFile5);
    return this.http.post<Article>(`${this.baseUrl3}/${categoryId}`, formData);
  }

  getCat(): Observable<Category[]> {
    return this.http.get<Category[]>('http://192.168.1.189:3006/api/v1/categories/');
  }

  deleteCat(userId: string): Observable<object> {
    return this.http.delete<object>(`http://192.168.1.189:3006/api/v1/categories/${userId}`);
  }

  createCat(user: Category): Observable<Category> {
    return this.http.post<Category>('http://192.168.1.189:3006/api/v1/categories/', user);
  }
  getAppointementsConfirmed(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('http://192.168.1.189:3005/api/v1/Appointement/confirmed/');
  }


  getAppointementsCancelled(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('http://192.168.1.189:3005/api/v1/Appointement/canceled/');
  }

  getAppointmentsByMonth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl4}/appointments-by-month`);
  }

  getTotalUsers(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(this.baseUrluser);
  }

  getTotalAppointments(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`http://192.168.1.189:3003/api/v1/tests/total/`);
  }

  getTotalMedecins(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`http://192.168.1.189:3003/api/v1/tests/total`);
  }

  addTest(test: test): Observable<test> {
    return this.http.post<test>(`${this.baseUrl2}`, test);
  }

  getTests(): Observable<test[]> {
    return  this.http.get<test[]>(`${this.baseUrl2}`);
  }

  
  deletetTest(testId: string): Observable<object> {
    return this.http.delete<object>(`${this.baseUrl2}/${testId}`);
  }

  GetTestbyId(userId: string): Observable<test> {
    return this.http.get<test>(`http://192.168.1.189:3003/api/v1/tests/${userId}`);
  }



  getQuestionsByCategory(categoryId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`http://192.168.1.189:3003/api/v1/questions//cat/${categoryId}`);
  }

  getCategory(): Observable<Section[]> {

    return this.http.get<Section[]>(`http://192.168.1.189:3003/api/v1/categories`);}


    updateCat(user: Section): Observable<Section> {
      return this.http.put<Section>(`http://192.168.1.189:3003/api/v1/categories/${user._id}`, user);
    }

    addQuestionToCategory(testId: string, categoryId: string, type: string, name: string): Observable<Question> {
      const body = { type, name };
      return this.http.post<Question>(`http://192.168.1.189:3003/api/v1/tests/${testId}/categories/${categoryId}`, body);
    }

    getTestByCategoryId(categoryId: string): Observable<{ testId: string }> {
      return this.http.get<{ testId: string }>(`http://192.168.1.189:3003/api/v1/categories/test-by-category/${categoryId}`);
    }
  
    deleteQuestion(questionid: string): Observable<object> {
      return this.http.delete<object>(`http://192.168.1.189:3003/api/v1/questions/${questionid}`);
    }
  
    getQuestionsbyId(userId: string): Observable<Question> {
      return this.http.get<Question>(`http://192.168.1.189:3003/api/v1/questions/${userId}`);
    }

    updateSingleChoiceQuestion(id: string, questionData: any): Observable<any> {
      return this.http.put(`http://192.168.1.189:3003/api/v1/questions/singleChoice/${id}`, questionData);
    }
  

    updateMultipleChoiceQuestion(id: string, questionData: any): Observable<any> {
      return this.http.put(`http://192.168.1.189:3003/api/v1/questions/multipleChoice/${id}`, questionData);
    }  

    getCorrectAnswerChoices(questionId: string): Observable<any> {
      const url = `http://192.168.1.189:3003/api/v1/questions/correct-answer-indices/${questionId}`;
      return this.http.get<any>(url);
    }  

    getExpirationStats(): Observable<MonthPercentage[]> {
      return this.http.get<MonthPercentage[]>(`http://192.168.1.189:3003/api/v1/users/expiration-stats/`);
    }
 

    getUserRolePercentages(): Observable<any> {
      return this.http.get<any>(`http://192.168.1.189:3003/api/v1/users/user-role-percentage/`);
    }

    sendEmailWithAttachment(
      text: string,
      subject: string,
      email: string,
      file?: File  
    ): Observable<any> {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('subject', subject);
      formData.append('email', email);
  
       if (file) {
        formData.append('file', file, file.name);
      }
  
      return this.http.post(this.apiUrl, formData);
    }

}
