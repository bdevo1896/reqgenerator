import {PureComponent} from 'react';
import {PARAMETER_TYPES} from '../../../lib/UseCase';
import {connect} from 'react-redux';

const mapDispatch = ({useCases: {updateUseCaseTitle,updateUseCaseDescription,updateUseCaseRequirements,updateUseCaseInputs,updateUseCaseOutputs}}) => ({
    updateTitle: (id,title) => updateUseCaseTitle({id: id, title: title}),
    updateDescription: (id,description) => updateUseCaseDescription({id: id, description: description}),
    updateRequirements: (id,requirements) => updateUseCaseRequirements({id: id, requirements: requirements}),
    updateInputs: (id,inputs) => updateUseCaseInputs({id: id, inputs: inputs}),
    updateOutputs: (id,outputs) => updateUseCaseOutputs({id: id, outputs: outputs})
})

function makeId() {
    return Math.random() * 30000;
}

const ParameterView = ({parameter,onClick}) => (
    <li className="parameter-view">
        <label>Name <input type="text" value={parameter.name} onChange={(event) => parameter.name=event.target.value}/></label>
        <label>Type <select onChange={(event) => parameter.type = event.target.value}>
            {
                PARAMETER_TYPES.map((type) => {
                    return (
                        <option value={type} selected={parameter.type==type}>{type}</option>
                    )
                })
            }
        </select>
        </label>
        <label>Required <input type="checkbox" value={parameter.isRequired} onChange={(event)=> parameter.isRequired = event.target.value}/></label>
        <button onClick={onClick}>x</button>
    </li>
)

const RequirementView = ({requirement,onClick}) => (
    <li>
        <input type="text" value={requirement.text} onChange={(event) => requirement.text=event.target.value}/>
        <button onClick={onClick}>x</button>
    </li>
)

class UseCaseEditView extends PureComponent {


    constructor(props) {
        super(props);
        const {useCase} = props;
        this.state = {
            title: useCase.title,
            description: useCase.description,
            requirements: {},
            inputs: {},
            outputs: {}
        }

        useCase.inputs.map((input) => {
            const paramId = makeId();
            this.state.inputs[paramId] = input;
        })

        useCase.outputs.map((output) => {
            const paramId = makeId();
            this.state.outputs[paramId] = output;
        })

        useCase.requirements.map((req) => {
            const paramId = makeId();
            this.state.requirements[paramId] = req;
        })

        this.handleSave = this.handleSave.bind(this);
        this.addNewParameter = this.addNewParameter.bind(this);
        this.deleteParameter = this.deleteParameter.bind(this);
        this.addNewRequirement = this.addNewRequirement.bind(this);
        this.deleteRequirement = this.deleteRequirement.bind(this);
    }

    addNewParameter(isInput) {
        const paramId = makeId();

        if(isInput) {
            const {inputs} = this.state;
            inputs[paramId] = {id: paramId, name: '',type: PARAMETER_TYPES.string,isRequired: false};
        }else {
            const {outputs} = this.state;
            outputs[paramId] = {id: paramId, name: '',type: PARAMETER_TYPES.string,isRequired: false};
        }
    }

    deleteParameter(isInput,id) {
        if(isInput) {
            const {inputs} = this.state;
            delete inputs[id];
        }else {
            const {outputs} = this.state;
            delete outputs[id];
        }
    }

    addNewRequirement() {
        const paramId = makeId();
        const {requirements} = this.state;

        requirements[paramId] = {id: paramId, text: ''};
    }

    deleteRequirement(id) {
        const {requirements} = this.state;
        delete requirements[id];
    }

    handleSave() {
        const {updateTitle,updateDescription,updateRequirements,updateInputs,updateOutputs,useCase,onSave} = this.props;
        const {id} = useCase;
        const {title,description,requirements,inputs,outputs} = this.state;

        updateTitle(id,title);
        updateDescription(id,description);
        updateRequirements(id,Object.values(requirements));
        updateInputs(id,Object.values(inputs));
        updateOutputs(id,Object.values(outputs));

        onSave();
    }

    render() {
        const {title,description,requirements,inputs,outputs} = this.state;
        return (
            <div className="edit-view">
                <button onClick={() => this.handleSave()}>Save</button>
                <label><h4>Title</h4> <input type="text" name="title" onChange={(event)=> this.setState({title: event.target.value})} value={title}/></label>
                <label><h4>Description</h4> <textarea name="description"  onChange={(event)=> this.setState({description: event.target.value})} value={description}/></label>
                <h4>Requirements</h4>
                <ol>
                    {
                        Object.values(requirements).map((req) => {
                            return (
                                <RequirementView key={req.id} requirement={req} onClick={() => this.deleteRequirement(req.id)}/>
                            )
                        })
                    }
                </ol>
                <div className="parameters">
                    <div className="inputs">
                        <h4>Inputs</h4>
                        <ul>
                            {
                                Object.values(inputs).map((input) => {
                                    return (
                                        <ParameterView 
                                            key={input.id}
                                            parameter={input}
                                            onClick={() => this.deleteParameter(true,input.id)}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="outputs">
                        <h4>Outputs</h4>
                        <ul>
                            
                            {
                                Object.values(outputs).map((output)=> {
                                    return (
                                        <ParameterView 
                                            key={output.id}
                                            parameter={output}
                                            onClick={() => this.deleteParameter(false,output.id)}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <style jsx>{`
                    .edit-view {
                        display: grid;
                        align-items: center;
                        grid-gap: 20px;
                        width: 100%;
                    }
                `}</style>
            </div>
        )
    }
}

export default connect(null,mapDispatch)(UseCaseEditView);