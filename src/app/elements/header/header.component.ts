import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { LocalstorageService } from '../../services/LocalstorageService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
	
	toggleChat: boolean = true;
	toggleSingle: boolean = true;
	userName: string | null = null;  
	role  : string | null = null;

	
	constructor( 
		private localstorageService: LocalstorageService
 
	) { }
	
	ngOnInit(): void {
		this.userName = this.localstorageService.getUserName();
		this.role = this.localstorageService.getRole();

	}
	
	
	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}

 

}
