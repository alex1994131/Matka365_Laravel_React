import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import '../../sass/app.scss' ;
import '../../css/app.css' ;

const UserLayout = Loadable({
    loader: () => import('./Page/User/Layout'),
    loading: Loader
});

class Main extends Component {
    render() {
        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route path="/" component={UserLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default Main;
