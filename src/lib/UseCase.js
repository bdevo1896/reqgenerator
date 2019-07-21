import Block from './Block';

function makeId(list,symbol) {
    let unique = false;
    let newId = '';
    do {
        newId = ''+symbol+Math.floor(Math.random() * 30000);
        if(list[newId] == null) {
            unique = true;
        }
    } while (!unique);

    return newId;
}

export const PARAMETER_TYPES = ["String","Number","Boolean","Array"];

export class Requirement {
    constructor(text,currentReqs) {
        this.text = text;
        this.id = makeId(currentReqs,'R');
    }

    constructor(id,text) {
        this.text = text;
        this.id = id;
    }

    constructor(currentReqs) {
        this.text = "";
        this.id = makeId(currentReqs,'R');
    }

    toJSON() {
        return {id: this.id, text: this.text};
    }
}

export class Parameter {
    constructor(id,name,type,required) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.required = required;
    }

    constructor(currentParams) {
        this.id = makeId(currentParams,'P');
        this.name = "";
        this.type = PARAMETER_TYPES[0];
        this.required = false;
    }

    constructor(currentParams) {
        this.id = makeId(currentParams,'P');
        this.name = '';
        this.type = PARAMETER_TYPES[0];
        this.required = false;
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

    createRequirement() {
        const newReq = new Requirement();
        this.requirements[newReq.id] = newReq;
    }

    addRequirement(id,text) {
        const newReq = new Requirement(id,text);
        this.requirements[id] = newReq;
    }

    deleteRequirement(id) {
        if(this.requirements[id] != null) {
            delete this.requirements[id];
        }
    }

    updateRequirement(id,text) {
        if(this.requirements[id] != null) {
            let req = this.requirements[id];
            req.text = text;
        }
    }

    createInput() {
        const newParam = new Parameter(this.inputs);
        this.inputs[newParam.id] = newParam;
    }

    createOutput() {
        const newParam = new Parameter(this.outputs);
        this.outputs[newParam.id] = newParam;
    }

    addInput(id,name,type,required) {
        if(this.inputs[id] == null) {
            this.inputs[id] = new Parameter(id,name,type,required);
        }
    }

    addOutput(id,name,type,required) {
        if(this.outputs[id] == null) {
            this.outputs[id] = new Parameter(id,name,type,required);
        }
    }

    deleteInput(id) {
        if(this.inputs[id] != null) {
            delete this.inputs[id];
        }
    }

    deleteOutput(id) {
        if(this.outputs[id] != null) {
            delete this.outputs[id];
        }
    }

    updateInput(id,name,type,required) {
        if(this.inputs[id] != null) {
            const newList = {...this.inputs};
            newList[id] = new Parameter(id,name,type,required);
            this.inputs = newList;
        }
    }

    updateOutput(id,name,type,required) {
        if(this.outputs[id] != null) {
            const newList = {...this.outputs};
            newList[id] = new Parameter(id,name,type,required);
            this.outputs = newList;
        }
    }

    toJSON() {
        const base = super.toJSON();
        base.requirements = this.requirements;
        base.inputs = this.inputs;
        base.outputs = this.outputs;
        return base;
    }
}