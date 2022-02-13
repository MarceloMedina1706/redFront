export class RegistrationUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    born: string;
    sex: string;

    constructor(name: string, lastName: string, email: string, password: string, 
        bornDate: string, sex: string) {

        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.born = bornDate;
        this.sex = sex;
    }
}
