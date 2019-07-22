import {Component} from 'react';
import {connect} from 'react-redux';
import {Requirement,Parameter} from '../../../lib/UseCase';
import ParameterEditView from './ParameterEditView';

const mapDispatch = ({useCases: {updateUseCase,shiftUseCaseUp,shiftUseCaseDown,deleteUseCase}}) => ({
    updateUseCase: (id,title,description,requirements,inputs,outputs) => updateUseCase({id: id,title: title,description: description,requirements: requirements,inputs: inputs,outputs: outputs}),
    shiftUp: (id) => shiftUseCaseUp({id: id}),
    shiftDown: (id) => shiftUseCaseDown({id: id}),
    deleteCase: (id) => deleteUseCase({id: id})
})

const RequirementView = ({requirement,onClick,onChange}) => (
    <li>
        <input className="m-xs-all" type="text" value={requirement.text} onChange={(event) => onChange(requirement.id,event.target.value)}/>
        <button className="remove-button" onClick={onClick}>Remove</button>
        <style jsx>{`
            input {
                width: 60%;
            }
        `}</style>
    </li>
)

class UseCaseEditView extends Component {

    constructor(props) {
        super(props);
        const {useCase} = props;
        this.state = {
            title: useCase.title,
            description: useCase.description,
            requirements: useCase.requirements,
            inputs: useCase.inputs,
            outputs: useCase.outputs,
            deleted:  false
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addNewParameter = this.addNewParameter.bind(this);
        this.deleteParameter = this.deleteParameter.bind(this);
        this.addNewRequirement = this.addNewRequirement.bind(this);
        this.deleteRequirement = this.deleteRequirement.bind(this);
        this.updateRequirement = this.updateRequirement.bind(this);
        this.updateParameter = this.updateParameter.bind(this);
    }

    addNewParameter(isInput) {
        if(isInput) {
            const {inputs} = this.state;
            const newList = {...inputs};
            const newInput = new Parameter();
            newList[newInput.id] = newInput;
            this.setState({inputs: newList});
        }else {
            const {outputs} = this.state;
            const newList = {...outputs};
            const newOutput = new Parameter();
            newList[newOutput.id] = newOutput;
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
            param.required = required;
            this.setState({outputs: newList});
        }else {
            const newList = {...inputs};
            const param = newList[id];
            param.name = name;
            param.type = type;
            param.required = required;
            this.setState({inputs: newList});
        }
    }

    addNewRequirement() {
        const {requirements} = this.state;

        const newList = {...requirements};
        const newReq = new Requirement();
        newList[newReq.id] = newReq;
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
        const {onSave} = this.props;
        onSave();
    }

    handleDelete() {
        const {useCase, deleteCase} = this.props;
        deleteCase(useCase.id);
        this.setState({deleted: true})
    }

    componentWillUnmount() {
        const {updateUseCase,useCase} = this.props;
        const {id} = useCase;
        const {title,description,requirements,inputs,outputs,deleted} = this.state;

        if(!deleted) {
            updateUseCase(id,title,description,requirements,inputs,outputs)
        }
    }

    render() {
        const {title,description,requirements,inputs,outputs,deleted} = this.state;
        const {shiftUp,shiftDown,useCase} = this.props;
        return (
            <div className="edit-view">
                <button className="save-button sec-button m-xs-all" onClick={() => this.handleSave()}>Save</button>
                <button className="delete-button sec-bad-button m-xs-all" onClick={() => this.handleDelete()}>Delete</button>
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
                                        <ParameterEditView 
                                            key={input.id}
                                            parameter={input}
                                            onClick={() => this.deleteParameter(true,input.id)}
                                            onUpdate={this.updateParameter}
                                            isInput={true}
                                            deleted={deleted}
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
                                        <ParameterEditView 
                                            key={output.id}
                                            parameter={output}
                                            onClick={() => this.deleteParameter(false,output.id)}
                                            onUpdate={this.updateParameter}
                                            isInput={false}
                                            deleted={deleted}
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

                    .delete-button {
                        position: absolute;
                        right: 30px;
                        bottom: 10px;
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