export class Pharmacy {
	static map(arg0: (pharmacy: any, i: any) => any) {
		throw new Error('Method not implemented.');
	}
    _id: string;
    name: string;
    phone: string;
    region: {
        _id: string;
        name: string; // This is the region name
        __v: number;
        id: string;
      };
      type: {
        _id: string;
        name: string;
        __v: number;
        id: string;
      };
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
  