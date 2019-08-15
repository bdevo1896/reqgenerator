import {PureComponent} from 'react';

export default class DynamicForm extends PureComponent {

    constructor() {
        super();
        state = {
            formValues: {}
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {value, name} = event.target;
        const {formValues} = state;

        if(formValues[name] == null) {
            formValues[name] = value;
        }else {
            formValues[name] = value;
        }
    }

    render() {
        return (
            <form>
                <input name="first_name" placeholder="First Name" type="text" onChange={(event) => this.handleChange(event)}/>
                <input name="last_name" placeholder="Last Name" type="text" onChange={(event) => this.handleChange(event)}/>
                <input name="age" type="number" onChange={(event) => this.handleChange(event)}/>
            </form>
        )
    }
}