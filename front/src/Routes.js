import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Icon, Menu } from 'antd';

import BasePage from './pages/BasePage';
import GeneralPage from './pages/GeneralPage';
import UsersPage from './pages/UsersPage';
import TypesSolidWastePage from './pages/TypesSolidWastePage';
import SolidWasteCollectedPage from './pages/SolidWasteCollectedPage';

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

                    // <p></p>
                    // <p><Link to="/teste">Teste</Link></p>
                    // <p><Link to="/usuarios">usuários</Link></p>
                    // <p><Link to="/typos-residuos-solidos">Tipos de Residuos solidos</Link></p>
                    // <p><Link to="/solid-waste-collected">Coletas</Link></p>


                    <Menu mode="inline" defaultSelectedKeys={['4']} style={{ zIndex: '999' }}>

                        <Menu.Item key="1">
                            <Icon type="user" />
                            <Link to="/" className="nav-text">Visão Geral</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <Link to="/users" className="nav-text">Usuários</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="user" />
                            <Link to="/types-solid-waste" className="nav-text">Residuos Existentes</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <Link to="/solid-waste-collected" className="nav-text">Residuos Coletados</Link>
                        </Menu.Item>
                    </Menu>
                }

                content={
                    <>
                        <Route exact path="/" component={GeneralPage} />
                        <Route exact path="/users" component={UsersPage} />
                        <Route exact path="/types-solid-waste" component={TypesSolidWastePage} />
                        <Route exact path="/solid-waste-collected" component={SolidWasteCollectedPage} />
                    </>
                }
            />
        </Router>
    );
}