import React from 'react';
import {
    BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import Sidebar from './components/Sidebar';
import { Pagination } from './components/Pagination';

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <Sidebar />

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <RepoCreateContainer />

                    <Switch>
                        <Route path="/" exact component={CommitListContainer} />
                    </Switch>

                    <Pagination />
                </div>
            </div>
        </div>
    </Router>
);
