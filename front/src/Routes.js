import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Icon, Menu } from 'antd';

import BasePage from './pages/BasePage';
import GeneralPage from './pages/GeneralPage';
// import UsersPage from './pages/UsersPage';
import TypesSolidWastePage from './pages/TypesSolidWastePage';
import SolidWasteCollectedPage from './pages/SolidWasteCollectedPage';
import AnalyzeCollectedWastesPage from './pages/AnalyzeCollectedWastesPage';
import ReportPage from './pages/ReportPage';


export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titlePage: 'Visão Geral'
        }
    }

    render = () => (
        <Router>
            <BasePage
                menu={
                    <Menu mode="inline" style={{ zIndex: '999' }}>
                        <Menu.Item key="1" onClick={() => {this.setState({titlePage: 'Visão Geral'})}}>
                            <Icon type="home" />
                            <Link to="/" className="nav-text">Visão Geral</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="2" onClick={() => {this.setState({titlePage: 'Usuários'})}}>
                            <Icon type="user" />
                            <Link to="/usuarios" className="nav-text">Usuários</Link>
                        </Menu.Item> */}
                        <Menu.Item key="3" onClick={() => {this.setState({titlePage: 'Tipos de Resíduos Sólidos'})}}>
                            <Icon type="tag" />
                            <Link to="/tipos-residuos-solidos" className="nav-text">Tipos de Resíduos Sólidos</Link>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={() => {this.setState({titlePage: 'Coletas'})}}>
                            <Icon type="delete" />
                            <Link to="/coletas" className="nav-text">Coletas</Link>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={() => {this.setState({titlePage: 'Análises'})}}>
                            <Icon type="line-chart" />
                            <Link to="/analises" className="nav-text">Análises</Link>
                        </Menu.Item>
                        <Menu.Item key="6" onClick={() => {this.setState({titlePage: 'Relátorios'})}}>
                            <Icon type="file-text" />
                            <Link to="/relatorios" className="nav-text">Relatórios</Link>
                        </Menu.Item>
                    </Menu>
                }

                content={
                    <>
                        <Route exact path="/" component={GeneralPage} />
                        {/* <Route exact path="/usuarios" component={UsersPage} /> */}
                        <Route exact path="/tipos-residuos-solidos" component={TypesSolidWastePage} />
                        <Route exact path="/coletas" component={SolidWasteCollectedPage} />
                        <Route exact path="/analises" component={AnalyzeCollectedWastesPage} />
                        <Route exact path="/relatorios" component={ReportPage} />
                        {/* <Route exact path="/analises/s" component={AnalyzeCollectedWastesPage} /> */}
                    </>
                }

                titlePage={this.state.titlePage}
            />
        </Router>
    );
}