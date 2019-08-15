import SideNavigation from '../src/ui/components/navigation/SideNavigation';
import {Fragment} from 'react';
import UseCaseOrganizerView from '../src/ui/components/visual/UseCaseOrganizerView';
import ButtonDrawer from '../src/ui/containers/ButtonDrawer';

const Home  = () => (
    <Fragment>
        <SideNavigation 
            classes="p-s-all"
        />
        <UseCaseOrganizerView />
        <ButtonDrawer />
    </Fragment>
)

export default Home;