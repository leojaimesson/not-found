import React, { Component } from 'react';

import { Row, Col } from 'antd';

import 'antd/lib/grid/style/index.css';

import Board from '../../components/board/Board';
import Bar from '../../components/charts/bar/Bar';

export default class General extends Component {
    render() {
        return (
            <Row gutter={24}>
                <Col xs={{ span: 24}} lg={{ span: 12 }}>
                    <Board>
                        <Bar />
                    </Board>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Board>
                        <Bar />
                    </Board>
                </Col>
            </Row>
        );
    }
}