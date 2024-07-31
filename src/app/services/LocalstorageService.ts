import { Injectable } from '@angular/core';

 const TOKEN = 'jwtToken';
const USER_NAME = 'userName';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
 
  getToken(): any {
  
    return localStorage.getItem(TOKEN);
  }
 
  removeToken() {
    localStorage.removeItem(TOKEN);
  }
  setUserName(userName: string) {
    localStorage.setItem(USER_NAME, userName);
  }

  getUserName(): string | null {
    return localStorage.getItem(USER_NAME);
  }
}
