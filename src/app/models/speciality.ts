

export class Speciality {
    id?: string;
    titre: string;
    icon: string;


    constructor(data: any) {
        this.id = data.id;
        this.titre = data.titre;
        this.icon = data.icon;
    }
}