import {connect} from 'react-redux';
import {useState} from 'react';

const mapDispatch = ({useCases: updateUseCaseTitle,updateUseCaseDescription,updateUseCaseRequirements,updateUseCaseInputs,updateUseCaseOutputs}) => ({
    updateTitle: (id,title) => updateUseCaseTitle({payload: {id: id, title: title}}),
    updateDescription: (id,description) => updateUseCaseDescription({payload: {id: id, description: description}}),
    updateRequirements: (id,requirements) => updateUseCaseRequirements({payload: {id: id, requirements: requirements}}),
    updateInputs: (id,inputs) => updateUseCaseInputs({payload: {id: id, inputs: inputs}}),
    updateOutputs: (id,outputs) => updateUseCaseOutputs({payload: {id: id, outputs: outputs}})
})

function UseCaseView (props) {

    const {updateTitle,updateDescription,updateRequirements,updateInputs,updateOutputs,classes} = props;
    const {id,title,description,requirements,inputs,outputs,ref} = props.useCase;

    const [newRequirements,setRequirements] = useState(requirements);

    return (
        <div className={`o_use-case-view ${classes}`} ref={ref}>
            <input name="title" value={title} onChange={(event)=>updateTitle(id,event.target.value)}/>
            <textarea name="description" value={description} onChange={(event)=>updateDescription(id,event.target.value)}/>
        </div>
    )
}

export default connect(null,mapDispatch)(UseCaseView);