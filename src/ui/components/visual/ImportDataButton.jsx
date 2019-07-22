import {connect} from 'react-redux';
import {useState,Fragment,createRef} from 'react';
import ImportDataForm from '../form/ImportDataForm';

const mapDispatch = ({useCases: {importData}}) => ({
    importData: (fileCases) => importData({newCases: fileCases}) 
})

function ImportDataButton({importData}) {
    const [formVisible,setFormVisible] = useState(false);

    const finishImport = (file) => {
        const newCases = JSON.parse(file);
        Object.values(newCases).map((useCase) => {
            useCase.ref = createRef();
        })
        importData(newCases);
        setFormVisible(false);
    }

    const onClose = () => {
        setFormVisible(false);
    }

    return (
        <Fragment>
            <button className="main-button" onClick={(event) => {
                event.preventDefault();
                setFormVisible(true);
            }}
            >Import Data</button>
            <ImportDataForm 
                importData={finishImport}
                isVisible={formVisible}
                closeForm={onClose}
            />
        </Fragment>
    )
}

export default connect(null,mapDispatch)(ImportDataButton);