import { publicDecrypt } from "crypto";

export class WordSet {
    constructor(
        public id: string,
        public name: string,
        public owner_id: string
    ){}
}

export class Word {
    constructor(
        public id: string,
        public word_set_id: string,
        public base: string,
        public translation: string
    ){}
}