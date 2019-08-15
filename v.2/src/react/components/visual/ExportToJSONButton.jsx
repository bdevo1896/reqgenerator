import {connect} from 'react-redux';
import {download} from '../../../lib/HelperFunctions';

const mapState = state => ({cases: state.useCases.cases});

function getDateString() {
    const d = new Date();
    return `-${d.getMonth()}-${d.getDate()}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}`;
}

const ExportToJSONButton = ({cases}) => (
    <button className="o_export-json-button main-button" onClick={() => download(`usecase${getDateString()}.json`,JSON.stringify(cases))}>Export to JSON</button>
)

export default connect(mapState,null)(ExportToJSONButton);