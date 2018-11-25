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
            
        </Router>
    );
}