import UseCase, { Requirement, Parameter } from '../../lib/UseCase';

export const useCases = {
    state: {
        cases: {}
    },
    reducers: {
        createUseCase(state,payload) {
            const {cases} = state;
            const {title,description,ref} = payload;

            const newCase = new UseCase({title: title,description: description,requirements: {},inputs: {},outputs: {},ref: ref, currentList: cases});

            let newCases = {...cases};
            newCases[newCase.id] = newCase;

            return {
                ...state,
                cases: newCases
            }
        },
        
        deleteUseCase(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};
            if(newCases[id] != null) {
                delete newCases[id];
            }

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseRef(state,payload) {
            const {cases} = state;
            const {id,ref} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.ref = ref;

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseTitle(state,payload) {
            const {cases} = state;
            const {id,title} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.title = title;

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseDescription(state,payload) {
            const {cases} = state;
            const {id,description} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.description = description;

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseRequirements(state,payload) {
            const {cases} = state;
            const {id,requirements} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.requirements = requirements;

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseInputs(state,payload) {
            const {cases} = state;
            const {id,inputs} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.inputs = inputs;

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseOutputs(state,payload) {
            const {cases} = state;
            const {id,outputs} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.outputs = outputs;

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseSingleRequirement(state,payload) {
            const {cases} = state;
            const {id,reqId,text} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.updateRequirement(reqId,text);

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseSingleInput(state,payload) {
            const {cases} = state;
            const {id,paramId,name,type,required} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.updateInput(paramId,name,type,required);

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCaseSingleOutput(state,payload) {
            const {cases} = state;
            const {id,paramId,name,type,required} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.updateOutput(paramId,name,type,required);

            return {
                ...state,
                cases: newCases
            }
        },

        createRequirement(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.createRequirement();

            return {
                ...state,
                cases: newCases
            }
        },

        createInput(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.createInput();

            return {
                ...state,
                cases: newCases
            }
        },

        createOutput(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.createOutput();

            return {
                ...state,
                cases: newCases
            }
        },

        deleteRequirement(state,payload) {
            const {cases} = state;
            const {id,reqId} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.deleteRequirement(reqId);

            return {
                ...state,
                cases: newCases
            }
        },

        deleteInput(state,payload) {
            const {cases} = state;
            const {id,paramId} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.deleteInput(paramId);

            return {
                ...state,
                cases: newCases
            }
        },

        deleteOuput(state,payload) {
            const {cases} = state;
            const {id,paramId} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];
            useCase.deleteOutput(paramId);

            return {
                ...state,
                cases: newCases
            }
        },

        updateUseCase(state,payload) {
            const {cases} = state;
            const {id, title,description,requirements,inputs,outputs} = payload;

            const newCases = {...cases};
            const useCase = newCases[id];

            if(useCase != null) {
                useCase.title = title;
                useCase.description = description;
                useCase.requirements = requirements;
                useCase.inputs = inputs;
                useCase.outputs = outputs;
            }

            return {
                ...state,
                cases: newCases
            }
        },

        shiftUseCaseUp(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};

            const keys = Object.keys(newCases);

            let index = 0;
            let found = false;
            do {
                if(keys[index] == id) {
                    found = true;
                }else {
                    index++;
                }
            }while(index < keys.length && !found);
            const values = Object.values(newCases);
            if(index - 1 >= 0) {
                let tempVal = values[index - 1];
                let tempKey = keys[index - 1];
                let val = values[index];
                let key = keys[index];
                values[index] = tempVal;
                values[index-1] = val;
                keys[index] = tempKey;
                keys[index-1] = key;
            }

            const result = {};
            keys.forEach((key,i) => result[key]=values[i]);
            return {
                ...state,
                cases: result
            }
        },

        shiftUseCaseDown(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};

            const keys = Object.keys(newCases);

            let index = 0;
            let found = false;
            do {
                if(keys[index] == id) {
                    found = true;
                }else {
                    index++;
                }
            }while(index < keys.length && !found);

            const values = Object.values(newCases);

            if(index + 1 < keys.length) {
                let tempVal = values[index + 1];
                let tempKey = keys[index + 1];
                let val = values[index];
                let key = keys[index];
                values[index] = tempVal;
                values[index+1] = val;
                keys[index] = tempKey;
                keys[index+1] = key;
            }

            const result = {};
            keys.forEach((key,i) => result[key]=values[i]);
            return {
                ...state,
                cases: result
            }
        },

        importData(state,payload) {
            const {cases} = state;
            const {newCases} = payload;

            const newList = {...cases};
            Object.values(newCases).map((useCase) => {
                if(newList[useCase.id] != null) {
                    useCase.makeNewId(Object.values(newList));
                }

                const newRequirements = {};
                Object.values(useCase.requirements).map((req) => {
                    newRequirements[req.id] = new Requirement({id: req.id,text: req.text});
                })

                const newInputs = {};
                Object.values(useCase.inputs).map((param) => {
                    newInputs[param.id] = new Parameter({id: param.id, name: param.name, type: param.type, required: param.required});
                })

                const newOutputs = {};
                Object.values(useCase.outputs).map((param) => {
                    newOutputs[param.id] = new Parameter({id: param.id, name: param.name, type: param.type, required: param.required});
                })

                newList[useCase.id] = new UseCase({id: useCase.id,title: useCase.title, requirements: newRequirements, inputs: newInputs, outputs: newOutputs, ref: useCase.ref});
            })

            return {
                ...state,
                cases: newList
            }
        }
    },
    effects: {}
}