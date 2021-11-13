import React from 'react';
import { Image } from 'semantic-ui-react';

import logo from '../images/main_logo.png';

function HomePage(){

    return(
        <div>
            <Image circular src={logo} centered size='big' />
        </div>
    );
};

export default HomePage;