import SideNavigation from '../src/ui/components/navigation/SideNavigation';
import {Fragment} from 'react';
import UseCaseOrganizerView from '../src/ui/components/visual/UseCaseOrganizerView';
import UseCaseAddButton from '../src/ui/components/visual/UseCaseAddButton';

const Home  = () => (
    <Fragment>
        <SideNavigation />
        <UseCaseOrganizerView />
        <UseCaseAddButton />
    </Fragment>
)

export default Home;