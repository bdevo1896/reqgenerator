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
        this.html = '';
        this.markdown = '';
        this.ref = null;
    }

    toJSON() {
        return {id: this.id, title: this.title,symbol: this.symbol,type: this.type,html: this.html,markdown: this.markdown};
    }
}