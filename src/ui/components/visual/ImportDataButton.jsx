import {connect} from 'react-redux';
import {useState,Fragment} from 'react';
import ImportDataForm from '../form/ImportDataForm';

const mapDispatch = ({useCases: {importData}}) => ({
    importData: (fileCases) => importData({newCases: fileCases}) 
})

function ImportDataButton({importData}) {
    const [formVisible,setFormVisible] = useState(false);

    const finishImport = (file) => {
        importData(file);
        setFormVisible(false);
    }
    return (
        <Fragment>
            <button className="main-button" onClick={() => setFormVisible(true)}>Import Data</button>
            <ImportDataForm 
                importData={finishImport}
                isVisible={formVisible}
            />
        </Fragment>
    )
}

export default connect(null,mapDispatch)(ImportDataButton);