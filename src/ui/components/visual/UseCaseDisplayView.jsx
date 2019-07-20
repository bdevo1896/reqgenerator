const ParameterView = ({name,type,classes}) => (
    <li className={classes}>
        <p>{name} :<span>{type}</span></p>
    </li>
)

const UseCaseDisplayView = ({useCase,onEdit,caseNum}) => (
    <div className={`display-view`}>
        <button className="m-xs-all" onClick={onEdit}>Edit</button>
        <h3>UC{caseNum < 10 ? `0${caseNum}`:`${caseNum}`}: {useCase.title}</h3>
        <small>Description</small>
        <p>{useCase.description}</p>
        <small>Requirements</small>
        <ol>
            {
                useCase.requirements.map((requirement) => {
                    return (
                        <li>{requirement.text}</li>
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
        <style jsx>{`
            .display-view {
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
            }

            button {
                position: absolute;
                right: 10px;
                top: 10px;
            }

        `}</style>
    </div>
)

export default UseCaseDisplayView;