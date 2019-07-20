import {connect} from 'react-redux';
import {createRef} from 'react';

const mapDispatch = ({useCases: {createUseCase}}) => ({
    createUseCase: () => createUseCase({title: "New Use Case", description: "This is the new description",ref: createRef()})
})

const UseCaseAddButton = ({classes,createUseCase}) => (
    <div className={`o_use-case-add-button`} >
        <button className={`main-button ${classes}`} onClick={()=>createUseCase()}> Add New Use Case</button>
        <style jsx>{`
            .o_use-case-add-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                cursor: pointer;
                display: grid;
                place-items: center;
            }
        `}</style>
    </div>
)

export default connect(null,mapDispatch)(UseCaseAddButton);