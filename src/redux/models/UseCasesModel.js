import UseCase from '../../lib/UseCase';

export const useCases = {
    state: {
        cases: {}
    },
    reducers: {
        createUseCase(state,payload) {
            const {cases} = state;
            const {title,description} = payload;

            const newCase = new UseCase(title,description,[],[],[]);

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
            delete newCases[id];

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

        shiftUseCaseUp(state,payload) {
            const {cases} = state;
            const {id} = payload;

            const newCases = {...cases};

            const keys = Object.keys(newCases);

            let index = 0;
            let found = false;
            do {
                if(key[index] == id) {
                    found = true;
                }
                index++;
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

            let result = {};
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
                if(key[index] == id) {
                    found = true;
                }
                index++;
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

            let result = {};
            keys.forEach((key,i) => result[key]=values[i]);

            return {
                ...state,
                cases: result
            }
        }
    },
    effects: {}
}