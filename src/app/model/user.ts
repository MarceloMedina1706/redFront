export class User {

    constructor(idUser: number, name: string, lastName: string, email: string, born: string) { 
        this.idUser = idUser;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.born = born;
    }


    idUser: number;
	name: string;
	lastName: string;
	email: string;
	born: string;
}
