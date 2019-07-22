import {connect} from 'react-redux';
import {download} from '../../../lib/HelperFunctions';

const mapState = state => ({cases: state.useCases.cases});

function getDateString() {
    const d = new Date();
    return `-${d.getMonth()}-${d.getDate()}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}`;
}

function getAllMarkdown(cases) {
    let finalMd = '';
    Object.values(cases).forEach((useCase,i) => {
        finalMd+=useCase.toMarkDown((i+1));
    })

    return finalMd;
}

const ExportToMarkDownButton = ({cases}) => (
    <button className="o_export-markdown-button main-button" onClick={() => download(`useCases${getDateString()}.md`,getAllMarkdown(cases))}>Export to Markdown</button>
)

export default connect(mapState)(ExportToMarkDownButton);