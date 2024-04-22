export class WordSet {
    constructor(
        public id: string,
        public name: string,
        public owner_id: string,
        public created: Date,
    ){}
}

export class WordData {
    constructor(
        public word_set_id: string,
        public base: string,
        public translation: string
    ){}
}
export class WordSetData {
    constructor(
    public name: string,
    public owner_id: number | null,
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

export const NameValid = /^[a-zA-Z0-9_/.\-, ]*$/;

export class WordSetNameData {
    constructor(
        public id: string | undefined,
        public name: string
    ){}
}
