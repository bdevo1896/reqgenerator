import Block from './Block';

function makeId() {
    return 'P'+Math.floor(Math.random() * 30000);
}

export const PARAMETER_TYPES = ["String","Number","Boolean","Array"];

export class Requirement {
    constructor(text) {
        this.text = text;
        this.id = makeId();
    }

    toJSON() {
        return {id: this.id, text: this.text};
    }
}

export class Parameter {
    constructor(name,type,required) {
        this.id = makeId();
        this.name = name;
        this.type = type;
        this.required = required;
    }

    toJSON() {
        return {id: this.id, name: this.name, type: this.type, required: this.required};
    }
}

export default class UseCase extends Block {
    constructor(title,description,requirements,inputs,outputs) {
        super(title,'UC','usecase');
        this.description = description;
        this.requirements = requirements;
        this.inputs = inputs;
        this.outputs = outputs;
    }

    toJSON() {
        const base = super.toJSON();
        base.requirements = this.requirements;
        base.inputs = this.inputs;
        base.outputs = this.outputs;
        return base;
    }
}