import {connect} from 'react-redux';
import UseCaseNavLink from './UseCaseNavLink';

const mapState = state => ({cases: state.useCases.cases});

function SideNavigation ({cases,classes}) {

    let index = 0;

    return (
        <nav className={`o_side-navigation ${classes}`}>
            <h2>Use Cases</h2>
            <ul className="m-xs-all">
                {
                    Object.values(cases).map((usecase)=> {
                        index++;
                        return (
                            <UseCaseNavLink 
                                key={usecase.id}
                                text={usecase.title}
                                useCaseRef={usecase.ref}
                                caseNum={index}
                            />
                        )
                    })
                }
            </ul>
            <style jsx>{`
                .o_side-navigation {
                    border-right: solid 1px #dddd;
                    overflow-y: scroll;
                }

                ul {
                    list-style: none;
                    display: grid;
                    justify-items: flex-start;
                    grid-gap: 15px;
                }
            `}</style>
        </nav>
    )
}

export default connect(mapState)(SideNavigation);