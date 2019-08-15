import UseCaseView from './UseCaseView';
import {connect} from 'react-redux';

const mapState = state => ({cases: state.useCases.cases});

function UseCaseOrganizerView({cases,classes}){

    let index = 0;

    return (
    <div className={`o_use-case-organizer ${classes}`}>
        {
            Object.values(cases).map((useCase) => {
                index++;
                return (
                <UseCaseView 
                    useCase={useCase}
                    classes="m-xl-all dp8 p-m-all"
                    key={useCase.id}
                    caseNum={index}
                />
                )
            })
        }
        <style jsx>{`
            .o_use-case-organizer {
                overflow-x: hidden;
                overflow-y: scroll;
                padding-right: 10em;
            } 
        `}</style>
    </div>
    )
}

export default connect(mapState)(UseCaseOrganizerView);