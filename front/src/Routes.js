import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Icon, Menu } from 'antd';

import BasePage from './pages/BasePage';
import GeneralPage from './pages/GeneralPage';
import UsersPage from './pages/UsersPage';
import TypesSolidWastePage from './pages/TypesSolidWastePage';
import SolidWasteCollectedPage from './pages/SolidWasteCollectedPage';
import AnalysesPage from './pages/AnalyzesPage';
import AnalyzeCollectedWastesPage from './pages/AnalyzeCollectedWastesPage';

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
                    <Menu mode="inline" style={{ zIndex: '999' }}>
                        <Menu.Item key="1">
                            <Icon type="home" />
                            <Link to="/" className="nav-text">Visão Geral</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <Link to="/usuarios" className="nav-text">Usuários</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="tag" />
                            <Link to="/tipos-residuos-solidos" className="nav-text">Tipos de Resíduos Sólidos</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="delete" />
                            <Link to="/coletas" className="nav-text">Coletas</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="line-chart" />
                            <Link to="/analises" className="nav-text">Análises</Link>
                        </Menu.Item>
                    </Menu>
                }

                content={
                    <>
                        <Route exact path="/" component={GeneralPage} />
                        <Route exact path="/usuarios" component={UsersPage} />
                        <Route exact path="/tipos-residuos-solidos" component={TypesSolidWastePage} />
                        <Route exact path="/coletas" component={SolidWasteCollectedPage} />
                        <Route exact path="/analises" component={AnalysesPage} />
                        <Route exact path="/analises/s" component={AnalyzeCollectedWastesPage} />
                    </>
                }
            />
        </Router>
    );
}