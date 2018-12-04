import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";

import { Icon, Menu } from 'antd';

import { isAuthenticated, login } from "./services/auth";

import BasePage from './pages/BasePage';
import GeneralPage from './pages/GeneralPage';
import UsersPage from './pages/UsersPage';
import TypesSolidWastePage from './pages/TypesSolidWastePage';
import SolidWasteCollectedPage from './pages/SolidWasteCollectedPage';
import AnalyzeCollectedWastesPage from './pages/AnalyzeCollectedWastesPage';
import ReportPage from './pages/ReportPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titlePage: 'Visão Geral',
            // email: '',
            // password: '',
        }
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                login('ok');
                this.props.history.push("/home");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
    };

    render = () => (
        <Router>
            <Switch>

                <BasePage
                    menu={
                        <Menu mode="inline" style={{ zIndex: '999' }}>
                            <Menu.Item key="1" onClick={() => { this.setState({ titlePage: 'Visão Geral' }) }}>
                                <Icon type="home" />
                                <Link to="/" className="nav-text">Visão Geral</Link>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => { this.setState({ titlePage: 'Usuários' }) }}>
                                <Icon type="user" />
                                <Link to="/usuarios" className="nav-text">Usuários</Link>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => { this.setState({ titlePage: 'Tipos de Resíduos Sólidos' }) }}>
                                <Icon type="tag" />
                                <Link to="/tipos-residuos-solidos" className="nav-text">Tipos de Resíduos Sólidos</Link>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={() => { this.setState({ titlePage: 'Coletas' }) }}>
                                <Icon type="delete" />
                                <Link to="/coletas" className="nav-text">Coletas</Link>
                            </Menu.Item>
                            <Menu.Item key="5" onClick={() => { this.setState({ titlePage: 'Análises' }) }}>
                                <Icon type="line-chart" />
                                <Link to="/analises" className="nav-text">Análises</Link>
                            </Menu.Item>
                            <Menu.Item key="6" onClick={() => { this.setState({ titlePage: 'Relatórios' }) }}>
                                <Icon type="file-text" />
                                <Link to="/relatorios" className="nav-text">Relatórios</Link>
                            </Menu.Item>
                        </Menu>
                    }

                    content={
                        <>
                            <Route exact path="/" component={withRouter(() => {
                                return (
                                    <div style={{ height: '100vh', width: '100vw', zIndex: '99999999', background: '#ededed', position: 'fixed', top: '0px', left: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ minWidth: '250px', background: 'rgb(139, 195, 74)', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', padding: '25px 10px', textAlign: 'center' }}>
                                            <h3 style={{ color: '#fff', opacity: '0.8', fontFamily: 'sans-serif', marginBottom: '10px', marginTop: '10px' }}>SolidWM</h3>
                                            <input value={this.state.email} onChange={e => { this.setState({ email: e.target.value }) }} type="text" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '3px', marginBottom: '10px' }} placeholder="Usuário" />
                                            <input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="text" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '3px' }} placeholder="Senha" />
                                            <button onClick={this.handleSignIn} style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '3px', background: '#4d74fc', color: 'white', marginTop: '10px' }}>Entrar</button>
                                        </div>
                                    </div>
                                )
                            })} />
                            {/* <PrivateRoute path="/home" component={GeneralPage} /> */}
                            <Route exact path="/home" component={GeneralPage} />
                            {/* <PrivateRoute path="/usuarios" component={UsersPage} /> */}
                            <Route exact path="/usuarios" component={UsersPage} />
                            {/* <PrivateRoute path="/tipos-residuos-solidos" component={TypesSolidWastePage} /> */}
                            <Route exact path="/tipos-residuos-solidos" component={TypesSolidWastePage} />
                            {/* <PrivateRoute path="/coletas" component={SolidWasteCollectedPage} /> */}
                            <Route exact path="/coletas" component={SolidWasteCollectedPage} />
                            {/* <PrivateRoute path="/analises" component={AnalyzeCollectedWastesPage} /> */}
                            <Route exact path="/analises" component={AnalyzeCollectedWastesPage} />
                            {/* <PrivateRoute path="/relatorios" component={ReportPage} /> */}
                            <Route exact path="/relatorios" component={ReportPage} />
                            {/* <Route exact path="/analises/s" component={AnalyzeCollectedWastesPage} /> */}
                        </>
                    }

                    titlePage={this.state.titlePage}
                />
            </Switch>
        </Router>
    );
}