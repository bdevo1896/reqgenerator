import {Component} from 'react';
import {PARAMETER_TYPES} from '../../../lib/UseCase';

export default class ParameterView extends Component {

    constructor(props){
        super(props);
        const {parameter,isInput,onUpdate} = props;
        this.state = {
            id: parameter.id,
            name: parameter.name,
            type: parameter.type,
            required: parameter.required,
            isInput: isInput,
            onUpdate: onUpdate
        }
    }

    componentWillUnmount() {
        const {id,name,type,required,isInput,onUpdate} = this.state;
        const {deleted} = this.props;

        if(!deleted) {
            onUpdate(id,name,type,required,isInput);
        }
    }

    render() {

        const {name,type,required} = this.state;
        const {onClick} = this.props;

    return (
        <li className="parameter-view">
            <label className="m-xs-all">
                <small>Name</small>
                <input 
                    className="m-xs-top" 
                    type="text" 
                    defaultValue={name} 
                    onChange={(event) => {
                        this.setState({name: event.target.value}); 
                    }}
                />
            </label>

            <label className="m-xs-all">
                <small>Type</small> 
                <select 
                    className="m-xs-top" 
                    onChange={(event) => {
                        this.setState({type: event.target.value})
                        }} 
                    defaultValue={type}
                >
                    {
                        PARAMETER_TYPES.map((type) => {
                            return (
                                <option key={type} value={type}>{type}</option>
                            )
                        })
                    }
                </select>
            </label>
            <label className="m-xs-all">
                <small>Required</small> 
                <input 
                    className="m-xs-top" 
                    type="checkbox" 
                    defaultChecked={required} 
                    onChange={(event)=> {
                        this.setState({required: event.target.checked}); 
                    }}/>
            </label>
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
}