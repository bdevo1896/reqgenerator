import SideNavigation from '../src/react/components/navigation/SideNavigation';
import {Fragment} from 'react';
import UseCaseOrganizerView from '../src/react/components/visual/UseCaseOrganizerView';
import ButtonDrawer from '../src/react/containers/ButtonDrawer';

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