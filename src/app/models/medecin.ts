export class Medecin {
    _id: string;
    fullname: string;
    speciality: { id: string, titre: string }; // Update the type of speciality
    description: string;
    phone: string;
    address: string;
    image: string;
    region: string;
    workingHours?: { day: string, hours: string[] }[];
    
    constructor(
        _id: string,
      fullname: string,
      speciality: {  id: string,titre: string,}, // Update the type of speciality
      description: string = "",
      phone: string = "",
      address: string = "",
      image: string = "",
      region: string = "",
      workingHours: { day: string, hours: string[] }[] = [
        { day: "monday", hours: ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00"] },
        { day: "tuesday", hours: ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00"] },
        { day: "wednesday", hours: ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00"] },
        { day: "thursday", hours: ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00"] },
        { day: "friday", hours: ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00"] },
      ]
    ) {
        this._id = _id;
      this.fullname = fullname;
      this.speciality = { id: speciality.id, titre: speciality.titre };
      this.description = description;
      this.phone = phone;
      this.address = address;
      this.image = image;
      this.region = region;
      this.workingHours = workingHours;
    }
  }
  