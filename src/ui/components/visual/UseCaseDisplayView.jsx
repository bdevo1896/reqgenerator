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

export default UseCaseDisplayView;