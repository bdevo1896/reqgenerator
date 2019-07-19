import UseCaseView from './UseCaseView';
import {connect} from 'react-redux';

const mapState = state => ({cases: state.useCase.cases});

const UseCaseOrganizerView = ({cases,classes}) => (
    <div className={`o_use-case-organizer ${classes}`}>
        {
            Object.values(cases).map((useCase) => {
                <UseCaseView 
                    useCase={useCase}
                    classes="m-xs-all"
                />
            })
        }
    </div>
)

export default connect(mapState)(UseCaseOrganizerView);