import {connect} from 'react-redux';
import {useState} from 'react';

const mapDispatch = ({useCases: {updateUseCaseTitle,updateUseCaseDescription,updateUseCaseRequirements,updateUseCaseInputs,updateUseCaseOutputs}}) => ({
    updateTitle: (id,title) => updateUseCaseTitle({id: id, title: title}),
    updateDescription: (id,description) => updateUseCaseDescription({id: id, description: description}),
    updateRequirements: (id,requirements) => updateUseCaseRequirements({id: id, requirements: requirements}),
    updateInputs: (id,inputs) => updateUseCaseInputs({id: id, inputs: inputs}),
    updateOutputs: (id,outputs) => updateUseCaseOutputs({id: id, outputs: outputs})
})

function UseCaseView (props) {

    const {updateTitle,updateDescription,updateRequirements,updateInputs,updateOutputs,classes} = props;
    const {id,title,description,requirements,inputs,outputs,ref} = props.useCase;

    const [newRequirements,setRequirements] = useState(requirements);

    return (
        <div className={`o_use-case-view ${classes}`} ref={ref}>
            <input name="title" onChange={(event)=>updateTitle(id,event.target.value)}/>
            <textarea name="description"  onChange={(event)=>updateDescription(id,event.target.value)}/>
        </div>
    )
}

export default connect(null,mapDispatch)(UseCaseView);