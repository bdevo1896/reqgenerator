import {connect} from 'react-redux';
import UseCaseNavLink from './UseCaseNavLink';

const mapState = state => ({cases: state.useCases.cases});

const  SideNavigation = ({cases,classes}) => (
        <nav className={`o_side-navigation ${classes}`}>
            <h2>Use Cases</h2>
            <ul>
                {
                    Object.values(cases).map((usecase)=> {
                        return (
                            <UseCaseNavLink 
                                key={usecase.id}
                                text={usecase.title}
                                useCaseRef={usecase.ref}
                            />
                        )
                    })
                }
            </ul>
            <style jsx>{`
                .o_side-navigation {
                    border-right: solid 2px #EEEE;
                }
            `}</style>
        </nav>
    )

export default connect(mapState)(SideNavigation);