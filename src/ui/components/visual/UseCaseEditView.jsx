import {PureComponent,useState} from 'react';
import {PARAMETER_TYPES} from '../../../lib/UseCase';
import {connect} from 'react-redux';

const mapDispatch = ({useCases: {updateUseCaseTitle,updateUseCaseDescription,updateUseCaseRequirements,updateUseCaseInputs,updateUseCaseOutputs,shiftUseCaseUp,shiftUseCaseDown}}) => ({
    updateTitle: (id,title) => updateUseCaseTitle({id: id, title: title}),
    updateDescription: (id,description) => updateUseCaseDescription({id: id, description: description}),
    updateRequirements: (id,requirements) => updateUseCaseRequirements({id: id, requirements: requirements}),
    updateInputs: (id,inputs) => updateUseCaseInputs({id: id, inputs: inputs}),
    updateOutputs: (id,outputs) => updateUseCaseOutputs({id: id, outputs: outputs}),
    shiftUp: (id) => shiftUseCaseUp({id: id}),
    shiftDown: (id) => shiftUseCaseDown({id: id})
})

function ParameterView ({parameter,onClick,onUpdate,isInput}) {
    const [name,setName] = useState(parameter.name);
    const [type,setType] = useState(parameter.type);
    const [required,setRequired] = useState(parameter.isRequired);

    return (
        <li className="parameter-view">
            <label className="m-xs-all">
                <small>Name</small>
                <input className="m-xs-top" type="text" value={name} onChange={(event) => {setName(event.target.value); onUpdate(parameter.id,name,type,required,isInput)}}/>
            </label>

            <label className="m-xs-all">
                <small>Type</small> 
                <select className="m-xs-top" onChange={(event) => {setType(event.target.value); onUpdate(parameter.id,name,type,required,isInput)}} defaultValue={parameter.type}>
                    {
                        PARAMETER_TYPES.map((type) => {
                            return (
                                <option key={type} value={type}>{type}</option>
                            )
                        })
                    }
                </select>
            </label>
            <label className="m-xs-all"><small>Required</small> <input className="m-xs-top" type="checkbox" value={parameter.isRequired} onChange={(event)=> {setRequired(event.target.checked); onUpdate(parameter.id,name,type,required,isInput)}}/></label>
            <button className="remove-button" onClick={onClick}>Remove</button>
            <style jsx>{`
                .parameter-view {
                    display: grid;
                    grid-template-columns: repeat(4,2fr);
                }
                label {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;
                }
                button {
                    justify-self: flex-start;
                }
            `}</style>
        </li>
    )
}

const RequirementView = ({requirement,onClick,onChange}) => (
    <li>
        <input className="m-xs-all" type="text" value={requirement.text} onChange={(event) => onChange(requirement.id,event.target.value)}/>
        <button className="remove-button" onClick={onClick}>Remove</button>
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
        this.updateRequirement = this.updateRequirement.bind(this);
        this.updateParameter = this.updateParameter.bind(this);
    }

    addNewParameter(isInput) {
        const paramId = makeId();

        if(isInput) {
            const {inputs} = this.state;
            const newList = {...inputs};
            newList[paramId] = {id: paramId, name: '',type: PARAMETER_TYPES[0],isRequired: false};
            this.setState({inputs: newList});
        }else {
            const {outputs} = this.state;
            const newList = {...outputs};
            newList[paramId] = {id: paramId, name: '',type: PARAMETER_TYPES[0],isRequired: false};
            this.setState({outputs: newList});
        }
    }

    deleteParameter(isInput,id) {
        if(isInput) {
            const {inputs} = this.state;
            const newList = {...inputs};
            delete newList[id];
            this.setState({inputs: newList});
        }else {
            const {outputs} = this.state;
            const newList = {...outputs};
            delete newList[id];
            this.setState({outputs: newList});
        }
    }

    updateParameter(id,name,type,required,isInput) {
        const {inputs,outputs} = this.state;

        if(!isInput) {
            const newList = {...outputs};
            const param = newList[id];
            param.name = name;
            param.type = type;
            param.isRequired = required;
            this.setState({outputs: newList});
        }else {
            const newList = {...inputs};
            const param = newList[id];
            param.name = name;
            param.type = type;
            param.isRequired = required;
            this.setState({inputs: newList});
        }
    }

    addNewRequirement() {
        const paramId = makeId();
        const {requirements} = this.state;

        const newList = {...requirements};
        newList[paramId] = {id: paramId, text: ''};
        this.setState({requirements: newList})
    }

    deleteRequirement(id) {
        const {requirements} = this.state;
        const newList = {...requirements};
        delete newList[id];
        this.setState({requirements: newList})
    }

    updateRequirement(id,text) {
        const {requirements} = this.state;
        const newList = {...requirements};
        newList[id].text = text;
        this.setState({requirements: newList});
    }

    handleSave() {
        const {updateTitle,updateDescription,updateRequirements,updateInputs,updateOutputs,useCase,onSave} = this.props;
        const {id} = useCase;
        const {title,description,requirements,inputs,outputs} = this.state;

        updateTitle(id,title);
        updateDescription(id,description);

        const newRequirements = [];
        Object.values(requirements).map((req)=> {
            newRequirements.push(req.text);
        })
        updateRequirements(id,newRequirements);

        const newInputs = [];
        Object.values(inputs).map((input) => {
            newInputs.push({name: input.name,type: input.type,isRequired: input.isRequired})
        })
        updateInputs(id,newInputs);

        const newOutputs = [];
        Object.values(outputs).map((output) => {
            newInputs.push({name: output.name,type: output.type,isRequired: output.isRequired})
        })
        updateOutputs(id,newOutputs);

        onSave();
    }

    render() {
        const {title,description,requirements,inputs,outputs} = this.state;
        const {shiftUp,shiftDown,useCase} = this.props;
        return (
            <div className="edit-view">
                <button className="save-button sec-button m-xs-all" onClick={() => this.handleSave()}>Save</button>
                <label><h4>Title</h4> <input type="text" name="title" onChange={(event)=> this.setState({title: event.target.value})} value={title}/></label>
                <label><h4>Description</h4> <textarea name="description"  onChange={(event)=> this.setState({description: event.target.value})} value={description}/></label>
                <div>
                    <h4>Requirements</h4>
                    <ol className="m-s-left">
                        {
                            Object.values(requirements).map((req) => {
                                return (
                                    <RequirementView key={req.id} requirement={req} onClick={() => this.deleteRequirement(req.id)} onChange={this.updateRequirement}/>
                                )
                            })
                        }
                    </ol>
                    <button className="add-button" onClick={() => this.addNewRequirement()}>Add Requirement</button>
                </div>
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
                                            onUpdate={this.updateParameter}
                                            isInput={true}
                                        />
                                    )
                                })
                            }
                        </ul>
                        <button className="add-button" onClick={() => this.addNewParameter(true)}>Add Input</button>
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
                                            onUpdate={this.updateParameter}
                                            isInput={false}
                                        />
                                    )
                                })
                            }
                        </ul>
                        <button className="add-button" onClick={() => this.addNewParameter(false)}>Add Output</button>
                    </div>
                </div>
                <div className="directional-buttons">
                    <button className="up-button" onClick={() => shiftUp(useCase.id)}></button>
                    <button className="down-button" onClick={() => shiftDown(useCase.id)}></button>
                </div>
                <style jsx>{`
                    .edit-view {
                        display: grid;
                        align-items: center;
                        grid-gap: 20px;
                        width: 100%;
                    }

                    .edit-view label {
                        display: flex;
                        flex-flow: column nowrap;
                        margin-right: 5em;
                    }

                    .sec-button {
                        position: absolute;
                        right: 30px;
                        top: 10px;
                    }
        
                    .directional-buttons {
                        display: grid;
                        grid-template-rows: 20px 20px;
                        place-items: center;
                        grid-gap: 10px;
                        position: absolute;
                        top: 15px;
                        right: 10px;
                    }

                    .parameters {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                `}</style>
            </div>
        )
    }
}

export default connect(null,mapDispatch)(UseCaseEditView);