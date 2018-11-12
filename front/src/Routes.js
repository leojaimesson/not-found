import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BasePage from './pages/BasePage';
import GeneralPage from './pages/GeneralPage';
import UsersPage from './pages/UsersPage';
import TypesSolidWastePage from './pages/TypesSolidWastePage';

const Teste = () => (
    <div>
        <h2>teste</h2>
    </div>
);

export default class Routes extends Component {
    render = () => (
        <Router>
            <BasePage
                menu={
                    <>
                        <p><Link to="/">Visão Geral</Link></p>
                        <p><Link to="/teste">Teste</Link></p>
                        <p><Link to="/usuarios">usuários</Link></p>
                        <p><Link to="/typos-residuos-solidos">Tipos de Residuos solidos</Link></p>
                    </>
                }

                content={
                    <>
                        <Route exact path="/" component={GeneralPage} />
                        <Route exact path="/teste" component={Teste} />
                        <Route exact path="/usuarios" component={UsersPage} />
                        <Route exact path="/typos-residuos-solidos" component={TypesSolidWastePage} />
                    </>
                }
            />
        </Router>
    );
}