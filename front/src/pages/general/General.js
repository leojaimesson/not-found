import React, { Component } from 'react';

import { Row, Col } from 'antd';

import Board from '../../components/board/Board';
import Bar from '../../components/charts/bar/Bar';

export default class General extends Component {
    render() {
        return (
            <Row gutter={24}>
                <Col xs={{ span: 24}} lg={{ span: 12 }}>
                    <Board height = { window.innerHeight * 0.5 }>
                        <Bar />
                    </Board>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Board height = { window.innerHeight * 0.5 }>
                        <Bar />
                    </Board>
                </Col>
            </Row>
        );
    }
}