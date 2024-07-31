

export class Medecin2 {
    _id: string;
    fullname: string;
    speciality: string ;
    description: string;
    phone: string;
    address: string;
    image: string;
    region: string;
     

    constructor(data: any) {
      this._id = data._id;
      this.fullname = data.fullname;
      this.speciality = data.speciality  ;
      this.description = data.description;
      this.phone = data.phone;
      this.address = data.address ;
      this.image = data.image;
      this.region = data.region;
    }

 
  }
  