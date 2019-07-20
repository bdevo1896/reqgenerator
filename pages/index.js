import SideNavigation from '../src/ui/components/navigation/SideNavigation';
import {Fragment} from 'react';
import UseCaseOrganizerView from '../src/ui/components/visual/UseCaseOrganizerView';
import UseCaseAddButton from '../src/ui/components/visual/UseCaseAddButton';

const Home  = () => (
    <Fragment>
        <SideNavigation 
            classes="p-s-all"
        />
        <UseCaseOrganizerView />
        <UseCaseAddButton classes="m-xs-all"/>
    </Fragment>
)

export default Home;