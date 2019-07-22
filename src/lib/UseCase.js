function makeIdFromList(list,symbol) {
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

function makeId(symbol) {
    return ''+symbol+Math.floor(Math.random() * 30000);
}

export const PARAMETER_TYPES = ["String","Number","Boolean","Array"];

export class Requirement {
    constructor(params) {
        let properties = Object.assign({
            id: makeId('R'),
            text: ''
        },params);

        this.id = properties.id;
        this.text = properties.text;

        if(properties.currentReqs != null) {
            this.id = makeIdFromList(properties.currentReqs,'R');
        }
    }

    compareRequirement(otherReq, currentReqs) {
        if(this.id == otherReq.id) {
            otherReq.id = makeIdFromList(currentReqs,'R');
        }

        if(otherReq.text == null) {
            return -1;
        }else if(otherReq.text != this.text) {
            return 1;
        }else {
            return 0;
        }
    }

    toJSON() {
        return {id: this.id, text: this.text};
    }
}

export class Parameter {
    constructor(params) {
        let properties = Object.assign({
             id: makeId('P'),
             name: '',
             type: PARAMETER_TYPES[0],
             required: false,
        },params);

        this.id = properties.id;
        this.name = properties.name;
        this.type = properties.type;
        this.required = properties.required;

        if(properties.currentParams != null) {
            this.id = makeIdFromList(properties.currentParams,'P');
        }
    }

    compareParameters(otherParam, currentParams) {
        if(this.id == otherParam.id) {
            otherParam.id = makeIdFromList(currentParams,'P');
        }

        if(otherParam.name == null) {
            return -1;
        }
        else if(this.name != otherParam.name) {
            return 1;
        }

        return 0;
    }

    toJSON() {
        return {id: this.id, name: this.name, type: this.type, required: this.required};
    }
}

export default class UseCase {
    constructor(params) {
        let properties = Object.assign({
            id: makeId('UC'),
            title: 'New Use Case',
            description: 'This is an example description',
            requirements: {},
            inputs: {},
            outputs: {},
            ref: null
       },params);
       
       if(params.currentList == null) {
       this.id = properties.id;
       }else {
           this.id = makeIdFromList(params.currentList,'UC');
       }
       this.title = properties.title;
        this.description = properties.description;
        this.requirements = properties.requirements;
        this.inputs = properties.inputs;
        this.outputs = properties.outputs;
    }

    createRequirement() {
        const newReq = new Requirement({currentReqs: this.requirements});
        this.requirements[newReq.id] = newReq;
    }

    addRequirement(id,text) {
        const newReq = new Requirement({id: id,text: text});
        this.requirements[id] = newReq;
    }

    deleteRequirement(id) {
        if(this.requirements[id] != null) {
            delete this.requirements[id];
        }
    }

    updateRequirement(id,text) {
        if(this.requirements[id] != null) {
            this.requirements[id] = new Requirement({id: id,text: text});
        }
    }

    createInput() {
        const newParam = new Parameter({currentParams: this.inputs});
        this.inputs[newParam.id] = newParam;
    }

    createOutput() {
        const newParam = new Parameter({currentParams: this.outputs});
        this.outputs[newParam.id] = newParam;
    }

    addInput(id,name,type,required) {
        if(this.inputs[id] == null) {
            this.inputs[id] = new Parameter({id: id,name: name,type: type,required: required});
        }
    }

    addOutput(id,name,type,required) {
        if(this.outputs[id] == null) {
            this.outputs[id] = new Parameter({id: id,name: name,type: type,required: required});
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
            newList[id] = new Parameter({id: id,name: name,type: type,required: required});
            this.inputs = newList;
        }
    }

    updateOutput(id,name,type,required) {
        if(this.outputs[id] != null) {
            const newList = {...this.outputs};
            newList[id] = new Parameter({id: id,name: name,type: type,required: required});
            this.outputs = newList;
        }
    }

    compareUseCase(useCase, currentList) {
        if(useCase.id == this.id) {
            useCase.id = makeIdFromList(currentList,'UC');
        }

        if(useCase.title == null) {
            return -1;
        }
        else if(useCase.description != this.description && useCase.title != this.title) {
            return 1;
        }else {
            return 0;
        }
    }

    toJSON() {
        const base = super.toJSON();
        base.requirements = this.requirements;
        base.inputs = this.inputs;
        base.outputs = this.outputs;
        return base;
    }

    toMarkDown() {
        let markdown = super.toMarkDown();
        let requirementsMd = ``;
        Object.values(this.requirements).forEach((req,i) => requirementsMd+=`${i}. ${req}\n`);
        let inputsMd = ``;
        Object.values(this.inputs).forEach((input,i) => inputsMd+=`${i}. ${input}\n`);
        let outputsMd = ``;
        Object.values(this.inputs).forEach((input,i) => outputsMd+=`${i}. ${input}\n`);

        let useCaseMd =`${markdown}\n------\n#### Description\n${this.description}\n#### Requirements\n${requirementsMd}\n#### Parameters\n##### Inputs\n${inputsMd != '' ? inputsMd : 'No Inputs\n'}\n##### Outputs\n${outputsMd != '' ? outputsMd : 'No Outputs\n'}\n------\n`;

        console.log(useCaseMd);

        return useCaseMd;
    }
}