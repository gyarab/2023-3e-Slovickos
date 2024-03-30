export class UserSet {
    constructor(
        public id: string,
        public jmeno: string,
        public id_vlastnik: string
    ){}
}
export interface setModel {
    id: string,
    email: string,
    name: string,
    username: string,
    token: string
}