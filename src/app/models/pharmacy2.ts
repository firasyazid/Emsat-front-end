

    export class Pharmacy2 {
        _id: string;
        name: string;
        phone: string;
        region: string
        type:  string;
        address: string;
        location: number[];
      
        constructor(data: any) {
          this._id = data._id;
          this.name = data.name;
          this.phone = data.phone || "";
          this.region = data.region;
          this.type = data.type;
          this.address = data.address || "";
          this.location = data.location;
        }
      }