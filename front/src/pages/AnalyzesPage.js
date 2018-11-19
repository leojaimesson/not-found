import React, { Component } from 'react';

import { Row, Col } from 'antd';

import { Link } from "react-router-dom";

import Board from '../components/board/Board';


export default class AnalysesPage extends Component {


    render() {
        return (
            <>
                <h2>Visão geral</h2>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                        <Link to="/analises/s" className="nav-text">

                            <Board height={window.innerHeight * 0.15}>
                                <h3 style={{ color: '#618833' }}>Produção e coleta de residuos</h3>
                            </Board>
                        </Link>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                        <Board height={window.innerHeight * 0.15}>
                            <h3 style={{ color: '#618833' }}>Volume coletado</h3>
                            <hr style={{ marginBottom: '25px' }} />
                            {/* <Pie data={data} width="600" height={window.innerHeight * 0.55} /> */}
                            {/* <Button style={{position: 'absolute', right: '25px', bottom: '20px'}}>Detalhes</Button> */}
                        </Board>
                    </Col>
                </Row>
            </>
        );
    }
}