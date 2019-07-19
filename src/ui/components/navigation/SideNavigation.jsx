import {connect} from 'react-redux';
import UseCaseNavLink from './UseCaseNavLink';

const mapState = state => ({cases: state.useCases.cases});

const  SideNavigation = ({cases}) => (
        <nav>
            <h2>Use Cases</h2>
            <ul>
                {
                    Object.values(cases).map((usecase)=> {
                        return (
                            <UseCaseNavLink 
                                key={usecase.id}
                                text={usecase.title}
                                ref={usecase.ref}
                            />
                        )
                    })
                }
            </ul>
        </nav>
    )

export default connect(mapState)(SideNavigation);