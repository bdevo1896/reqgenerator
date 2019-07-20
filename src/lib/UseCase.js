import Block from './Block';

export const PARAMETER_TYPES = ["String","Number","Boolean","Array"];

export class Requirement {
    
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