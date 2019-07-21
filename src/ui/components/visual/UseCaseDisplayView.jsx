import {connect} from 'react-redux';

const mapDispatch = ({useCases: {shiftUseCaseUp,shiftUseCaseDown}}) => ({
    shiftUp: (id) => shiftUseCaseUp({id: id}),
    shiftDown: (id) => shiftUseCaseDown({id: id})
})

const ParameterView = ({name,type,isRequired,classes}) => (
    <li className={classes}>
        <p>{name} :<span>{type}</span> {isRequired ? '(Required)':''}</p>
    </li>
)

const UseCaseDisplayView = ({useCase,onEdit,caseNum,shiftUp,shiftDown}) => (
    <div className={`display-view`}>
        <button className="m-xs-all sec-button" onClick={onEdit}>Edit</button>
        <h3>UC{caseNum < 10 ? `0${caseNum}`:`${caseNum}`}: {useCase.title}</h3>
        <small>Description</small>
        <p>{useCase.description}</p>
        <small>Requirements</small>
        <ol className="m-s-left">
            {
                useCase.requirements.map((requirement) => {
                    return (
                        <li key={requirement.id}>{requirement.text}</li>
                    )
                })
            }
        </ol>
        <div className="parameters">
            <div>
                <small>In</small>
                <ul>
                    {
                        useCase.inputs.map((input) => {
                            return (
                                <ParameterView 
                                    key={input.name}
                                    name={input.name}
                                    type={input.type}
                                    isRequired={input.isRequired}
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
                                    key={output.name}
                                    name={output.name}
                                    type={output.type}
                                    isRequired={output.isRequired}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        <div className="directional-buttons">
                <button className="up-button" onClick={() => shiftUp(useCase.id)}></button>
                <button className="down-button" onClick={() => shiftDown(useCase.id)}></button>
        </div>
       
        <style jsx>{`
            .display-view {
                display: grid;
                grid-gap: 10px;
                width: 100%;
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

export default connect(null,mapDispatch)(UseCaseDisplayView);