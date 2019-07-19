import {connect} from 'react-redux';
import {createRef} from 'react';

const mapDispatch = ({useCases: {createUseCase}}) => ({
    createUseCase: () => createUseCase({title: "New Use Case", description: "This is the new description",ref: createRef()})
})

const UseCaseAddButton = ({classes,createUseCase}) => (
    <div className={`o_use-case-add-button ${classes}`}>
        <button onClick={()=>createUseCase()}>+</button>
    </div>
)

export default connect(null,mapDispatch)(UseCaseAddButton);