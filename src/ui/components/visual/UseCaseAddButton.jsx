import {connect} from 'react-redux';

const mapDispatch = ({useCase: createUseCase}) => ({
    createUseCase: () => createUseCase({payload: {title: "New Use Case", description: "This is the new description"}})
})

const UseCaseAddButton = ({classes,createUseCase}) => (
    <div className={`o_use-case-add-button ${classes}`}>
        <button onClick={()=>createUseCase()}>+</button>
    </div>
)

export default connect(null,mapDispatch)(UseCaseAddButton);