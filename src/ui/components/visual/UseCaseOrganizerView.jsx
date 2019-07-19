import UseCaseView from './UseCaseView';
import {connect} from 'react-redux';

const mapState = state => ({cases: state.useCases.cases});

const UseCaseOrganizerView = ({cases,classes}) => (
    <div className={`o_use-case-organizer ${classes}`}>
        {
            Object.values(cases).map((useCase) => {
                return (
                <UseCaseView 
                    useCase={useCase}
                    classes="m-xs-all"
                    key={useCase.id}
                />
                )
            })
        }
    </div>
)

export default connect(mapState)(UseCaseOrganizerView);