export class Appointment {
    _id: string;
    user_id: string;
    doctor_id: string;
    date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    userName: string;
    doctorName: string;
    AppHour: { day: string, hours: string };
  
    constructor(data: any) {
      this._id = data._id;
      this.user_id = data.user_id;
      this.doctor_id = data.doctor_id;
      this.date = data.date;
      this.status = data.status;
      this.userName = data.userName;
      this.doctorName = data.doctorName;
      this.AppHour = data.AppHour;
    }
  }
  