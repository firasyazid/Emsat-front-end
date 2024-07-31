import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/userService';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Pharmacy } from '../models/pharmacy';
import { Pharmacy2 } from '../models/pharmacy2';
import { Region } from '../models/region';
import { Type } from '../models/types';
import { Section } from '../models/section';
 

interface Customer {
	cust_id?: string;
	customer_name: string;
	location: string;
	total_spent: string;
	last_order: string;
	isSelected: boolean;
}


const CUSTOMERS: Customer[] = [
	 
];


@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


	checkedCustomerList: any;
	pharmacies: Pharmacy[] = [];
	isMasterSel: boolean;
	checkSingleItem: boolean = true;
	displayDialog = false;
	isModal = false;
	newPharmacy: Pharmacy2 = {
		_id: "",
		name: "",
		phone: "",
		region: "",
		type: "",
		address: "",
		location: [0, 0]
	}
	regionOptions: Region[] = [];
	selectedRegion!: Region;

	typeOptions: Type[] = [];
	selectedType!: Type;


	section : Section[]=[];

	category: Section = {
 		name: '',
 		timeLimit: 0,
	  };

	constructor(private modalService: NgbModal,
		private userService: UserService,
		private router: Router,
		private messageService: MessageService,
		private snackBar: MatSnackBar,
		private confirmationService: ConfirmationService


	) {

		this.isMasterSel = false;

		this.updateCustomerListing();

		this.getCheckedItemList();
	}

	ngOnInit(): void {
		this.getSection();
 	}



	 onUpdateSection(): void {
		this.userService.updateCat(this.category).subscribe(
		  response => {
			this.openSnackBar('Section updated successfully', 'Close');
			this.displayDialog = false;
			this.getSection();
		  },
		  error => {
			console.error('Error updating section', error);
			this.openSnackBar('Section is not updated!', 'Close');
		  }
		);
	  }
	
	  openEditDialog(sec: Section): void {
		this.category = { ...sec };
		this.displayDialog = true;
	  }
	
	 
	
	 private getSection() {
		this.userService.getCategory().subscribe((sec) => {
			this.section = sec;
 		});
	}





openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 2000,  
         horizontalPosition: 'left',
        verticalPosition: 'bottom',
     });


}

























	_addPharmacy(user: any) {
		if (!this.isFormValid()) {
			return;
		}

		this.userService.createPharmacy(user).subscribe(
			() => {
				this._getPharmacy();
				this.openSnackBar('pharmacy added successfully', 'Close');
 				this.modalService.dismissAll();

			},
			(error) => {
				console.error('Error:', error);
			}
		);
	}


	
 	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
 			horizontalPosition: 'left',
			verticalPosition: 'bottom',
		

 		});
	}

	private _getPharmacy() {
		this.userService.getPharmacy().subscribe((users) => {
			this.pharmacies = users;
		});
	}

	deletePharmacy(userId: string) {
		this.userService.deletePharmacy(userId).subscribe(() => {
			this._getPharmacy();
			this.openSnackBar('Pharmacy deleted successfully', 'Close');
		});
	}


	isFormValid(): boolean {
		if (!this.newPharmacy.name ||
			!this.newPharmacy.phone ||
			!this.newPharmacy.region
			|| !this.newPharmacy.type
			|| !this.newPharmacy.address
			|| !this.newPharmacy.location

		) {
			this.openSnackBar('Please fill all fields', 'Close');

			return false;
		}

		return true;
	}
/////

	RegionOptions() {
		this.userService.getRegionPhramacy().subscribe(
		  (options: Region[]) => {
			this.regionOptions = options;
			console.log('region options', options);
		  },
		  (error) => {
			console.error('Failed to load region options', error);
		  }
		);
		}

		TypeOptions() {
			this.userService.getType().subscribe(
			  (options: Type[]) => {
				this.typeOptions = options;
				console.log('type options', options);
			  },
			  (error) => {
				console.error('Failed to load type options', error);
			  }
			);
			}











































	open(content: any) {
		this.modalService.open(content);
	}


	page = 1;
	pageSize = 10;
	collectionSize = CUSTOMERS.length;
	customers!: Customer[];

	updateCustomerListing() {
		this.customers = this.pharmacies
			.map((pharmacy, i) => ({
				id: i + 1,
				cust_id: pharmacy._id,
				customer_name: pharmacy.name,
				location: pharmacy.address,
				total_spent: "-", // You can update this based on your pharmacy data
				last_order: "-", // You can update this based on your pharmacy data
				isSelected: false
			}))
			.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
	}


	/* Check Uncheck all checkbox on main check box click*/

	checkUncheckAll() {
		for (var i = 0; i < this.customers.length; i++) {
			this.customers[i].isSelected = this.isMasterSel;
		}
		this.getCheckedItemList();
	}

	isAllSelected() {
		this.isMasterSel = this.customers.every(function (item: any) {
			return item.isSelected == true;
		})
		this.getCheckedItemList();
	}

	getCheckedItemList() {
		this.checkedCustomerList = [];

		for (var i = 0; i < this.customers.length; i++) {
			if (this.customers[i].isSelected)
				this.checkedCustomerList.push(this.customers[i]);
			else
				this.checkSingleItem = false
		}

		if (this.checkSingleItem) {
			this.isMasterSel = true;
		}
		this.checkedCustomerList = JSON.stringify(this.checkedCustomerList);
	}




}
