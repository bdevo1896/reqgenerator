export function createID(symbol) {
    let randomNum = Math.floor(Math.random() * Math.pow(10,9));
    return `${symbol}${randomNum}`;
}

export default class Block {
    constructor(title,symbol,type) {
        this.title = title;
        this.symbol = symbol;
        this.type = type;
        this.id = createID(symbol);
        this.ref = null;
    }

    toJSON() {
        return {id: this.id, title: this.title,symbol: this.symbol,type: this.type};
    }

    toMarkDown() {
        return `### ${this.title} \n`;
    }
}