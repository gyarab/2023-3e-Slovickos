export class NewName {
    constructor(
        public id: number | null,
        public name: string
    ){}
}

export class NewUserName {
    constructor(
        public id: number | null,
        public username: string
    ){}
}

export class NewEmail {
    constructor(
        public id: number | null,
        public email: string
    ){}
}

export class NewPassword {
    constructor(
        public id: number | null,
        public password: string
    ){}
}

export class User {
    constructor(
        public id: string,
        public email: string,
        public username: string,
        public name: string,
        public token: string
    ){}
}

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{8,}$/;

export const NameValid = /^[a-zA-Z]*$/;

export const UserNameValid = /^[a-zA-Z0-9_]*$/;