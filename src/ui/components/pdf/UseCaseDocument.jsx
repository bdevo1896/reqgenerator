import {connect} from 'react-redux';
import {Component} from 'react';

const mapState = state => ({cases: state.useCases.cases});
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function getDate() {
    let d = new Date();

    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

class UseCaseDocument extends Component {
    render() {
        const {cases,companyName} = this.props;
        let index = 0;
        return (
            <div className="page p-xl-all m-s-all dp3">
                <small className="date">{getDate()}</small>
                <h1 className="title">{companyName} Use Cases</h1>
                {
                    Object.values(cases).length > 0 &&
                    Object.values(cases).map(useCase => {
                        const requirements = Object.values(useCase.requirements);
                        const inputs = Object.values(useCase.inputs);
                        const outputs = Object.values(useCase.outputs);
                        index++;
                        return (
                            <div>
                                <h2 className="use-case-title">UC{index < 10 ? `0${index}` : index}: {useCase.title}</h2>
                                <h3 className="use-case-section-heading">Description</h3>
                                <p>{useCase.description}</p>
                                <h3 className="use-case-section-heading">Requirements</h3>
                                {
                                    requirements.length > 0 &&
                                    <ol className="p-s-all">
                                    {
                                        requirements.map((req) => {
                                            return (
                                                <li style={styles.listItem}>{req}</li>
                                            )
                                        })
                                    }
                                    </ol>
                                }
                                {
                                    requirements.length == 0 &&
                                    <p className="empty-section">No Requirements</p>
                                }
                                <h3 className="use-case-section-heading">Parameters</h3>
                                {
                                    (inputs.length > 0 || outputs.length > 0) &&
                                    <div>
                                        <div>
                                            <h4>Inputs</h4>
                                            {
                                                inputs.length == 0 &&
                                                <p className="empty-section">No Input Parameters</p>
                                            }
                                            {
                                                inputs.length > 0 &&
                                                <ol className="p-s-all">
                                                {
                                                    inputs.map((input) => {
                                                        return (
                                                            <li className="parameter">{input.name}:{<span className="type">{input.type}</span>} {input.required ? <small style={styles.parameterRequired}>Required</small> : null}</li>
                                                        )
                                                    })
                                                }
                                                </ol>
                                            }
                                        </div>
                                        <div>
                                            <h4>Outputs</h4>
                                                {
                                                    outputs.length == 0 &&
                                                    <p className="empty-section">No Output Parameters</p>
                                                }
                                                {
                                                    outputs.length > 0 &&
                                                    <ol className="p-s-all">
                                                    {
                                                        outputs.map((output) => {
                                                            return (
                                                                <li className="parameter">{output.name}:{<span className="type">{output.type}</span>} {output.required ? <small className="required">Required</small> : null}</li>
                                                            )
                                                        })
                                                    }
                                                    </ol>
                                                }
                                        </div>
                                    </div>
                                }
                                {
                                    (inputs.length == 0 && outputs.length == 0) &&
                                    <p className="empty-section">This use case has no parameters! Make sure to add some!</p>
                                }
                            </div>
                        )
                    })
                }
                {
                    Object.values(cases).length == 0 &&
                    <p className="no-cases-statement">Add Some Use Cases!</p>
                }
                <style jsx>{`
                    .page {
                        // transform-origin: top left;
                        // transform: scale(.5);
                        background-color: white;
                        display: flex;
                        flex-flow: column nowrap;
                    }

                    .date {
                        text-align: right;
                        width: 100%;
                        align-self: flex-end;
                    }
                `}</style>
            </div>
        )
    }
}

export default connect(mapState)(UseCaseDocument);