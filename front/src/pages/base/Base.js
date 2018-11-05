import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Icon, Drawer, Avatar } from 'antd';

import './Base.css';

const { Header, Content } = Layout;

export default class Base extends Component {

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            placement: 'left',
        };
    }

    render = () => (
        <Layout style={{ height: '100%', overflow: 'auto' }}>
            <Drawer
                title="Basic Drawer"
                placement={this.state.placement}
                // closable={false}
                onClose={this.onClose}
                visible={this.state.visible}>
                {this.props.menu}
            </Drawer>
            <Header className="header">
                <Icon
                    className="trigger"
                    type="menu-fold"
                    onClick={this.showDrawer}
                />
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
            </Header>
            <Content style={{ padding: '20px 14px', boxSizing: 'border-box' }}>
                {this.props.content}
                <br /><br />

            </Content>
        </Layout>
    );
}

Base.propTypes = {
    menu: PropTypes.node,
    content: PropTypes.node
}