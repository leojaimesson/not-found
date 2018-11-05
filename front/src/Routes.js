import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Base from './pages/base/Base';
import General from './pages/general/General';
import Users from './pages/users/Users';

const Teste = () => (
    <div>
        <h2>teste</h2>
    </div>
);

export default class Routes extends Component {
    render = () => (
        <Router>
            <Base
                menu={
                    <>
                        <p><Link to="/">Visão Geral</Link></p>
                        <p><Link to="/teste">Teste</Link></p>
                        <p><Link to="/usuarios">usuários</Link></p>
                    </>
                }

                content={
                    <>
                        <Route exact path="/" component={General} />
                        <Route exact path="/teste" component={Teste} />
                        <Route exact path="/usuarios" component={Users} />
                    </>
                }
            />
        </Router>
    );
}