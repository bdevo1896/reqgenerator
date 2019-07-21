import {connect} from 'react-redux';
import {download} from '../../../lib/HelperFunctions';

const mapState = state => ({cases: state.useCases.cases});

function getAllMarkdown(cases) {
    let finalMd = '';
    Object.values(cases).map((useCase) => {
        finalMd+=useCase.toMarkDown();
    })

    console.log(finalMd);
    return finalMd;
}

const ExportToMarkDownButton = ({cases}) => (
    <button className="o_export-markdown-button main-button" onClick={() => download('useCases.md',getAllMarkdown(cases))}>Export to Markdown</button>
)

export default connect(mapState)(ExportToMarkDownButton);