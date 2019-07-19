import {connect} from 'react-redux';
import {useState} from 'react';

const mapDispatch = ({useCases: {updateUseCaseTitle,updateUseCaseDescription,updateUseCaseRequirements,updateUseCaseInputs,updateUseCaseOutputs}}) => ({
    updateTitle: (id,title) => updateUseCaseTitle({id: id, title: title}),
    updateDescription: (id,description) => updateUseCaseDescription({id: id, description: description}),
    updateRequirements: (id,requirements) => updateUseCaseRequirements({id: id, requirements: requirements}),
    updateInputs: (id,inputs) => updateUseCaseInputs({id: id, inputs: inputs}),
    updateOutputs: (id,outputs) => updateUseCaseOutputs({id: id, outputs: outputs})
})

const ParameterView = ({name,type,classes}) => (
    <li className={classes}>
        <p>{name} :<span>{type}</span></p>
    </li>
)

const UseCaseDisplayView = ({useCase,classes}) => (
    <div className={`display-view ${classes}`}>
        <h3>{useCase.title}</h3>
        <small>Description</small>
        <p>{useCase.description}</p>
        <small>Requirements</small>
        <ol>
            {
                useCase.requirements.map((requirement) => {
                    return (
                        <li>{requirement}</li>
                    )
                })
            }
        </ol>
        <div className="ins-outs">
            <div>
                <small>In</small>
                <ul>
                    {
                        useCase.inputs.map((input) => {
                            return (
                                <ParameterView 
                                    name={input.name}
                                    type={input.type}
                                />
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <small>Out</small>
                <ul>
                    {
                        useCase.outputs.map((output) => {
                            return (
                                <ParameterView 
                                    name={output.name}
                                    type={output.type}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
)

function UseCaseView (props) {

    const {updateTitle,updateDescription,updateRequirements,updateInputs,updateOutputs,classes} = props;
    const {id,title,description,requirements,inputs,outputs,ref} = props.useCase;

    const [newRequirements,setRequirements] = useState(requirements);

    return (
        <div className={`o_use-case-view ${classes}`} ref={ref}>
            <input name="title" onChange={(event)=>updateTitle(id,event.target.value)}/>
            <textarea name="description"  onChange={(event)=>updateDescription(id,event.target.value)}/>
            <style jsx>{`
                .o_use-case-view {
                    display: grid;
                    justify-items: center;
                    align-items: center;
                    grid-gap: 15px;
                }
            `}</style>
        </div>
    )
}

export default connect(null,mapDispatch)(UseCaseView);