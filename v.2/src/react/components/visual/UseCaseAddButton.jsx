import {connect} from 'react-redux';
import {createRef} from 'react';

const mapDispatch = ({useCases: {createUseCase}}) => ({
    createUseCase: () => createUseCase({title: "New Use Case", description: "This is the new description",ref: createRef()})
})

const UseCaseAddButton = ({classes,createUseCase}) => (
    <button className={`main-button o_use-case-add-button ${classes}`} onClick={()=>createUseCase()}> Add New Use Case</button>
)

export default connect(null,mapDispatch)(UseCaseAddButton);