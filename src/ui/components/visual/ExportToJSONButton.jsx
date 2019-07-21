import {connect} from 'react-redux';
import {download} from '../../../lib/HelperFunctions';

const mapState = state => ({cases: state.useCases.cases});

const ExportToJSONButton = ({cases}) => (
    <button className="o_export-json-button main-button" onClick={() => download('usecase.json',JSON.stringify(cases))}>Export to JSON</button>
)

export default connect(mapState,null)(ExportToJSONButton);