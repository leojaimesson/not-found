import React, { Component } from 'react';

import { Row, Col, Button, Form, Select, InputNumber } from 'antd';

import Board from '../components/board/Board';

import { Pie } from 'react-chartjs-2';

import DataClient from '../api/DataClient';

const FormItem = Form.Item;

const Option = Select.Option;


class GeneralPage extends Component {

    constructor(props) {
        super(props);
        this.dataClient = new DataClient('http://localhost:3001/datas');
        this.state = {
            datasets: [],
            labels: [],
        }
    }

    async componentWillMount() {
        const response = await this.dataClient.getAllWasteByPeriod('WEEK', 1);

        const data = response.data.map(value => value.data);
        const labels = response.data.map(value => value.name);
        const colors = response.data.map(value => value.color);

        this.setState({
            datasets: [{
                data: data || 0,
                backgroundColor: colors,
                borderWidth: 1,
            }],
            labels: labels
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const response = await this.dataClient.getAllWasteByPeriod(values.period, values.interval);

                const data = response.data.map(value => value.data);
                const labels = response.data.map(value => value.name);
                const colors = response.data.map(value => value.color);

                this.setState({
                    datasets: [{
                        data: data || 0,
                        backgroundColor: colors,
                        borderWidth: 1,
                    }],
                    labels: labels
                });
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {

        const data = {
            datasets: this.state.datasets,
            labels: this.state.labels
        };

        const { getFieldDecorator } = this.props.form;

        const heightBoard = window.innerHeight * 0.60;
        return (
            <>
                <Row type="flex" justify="space-between" align="middle" gutter={24} style={{background: 'white', margin: '0px', padding: '10px 0px'}}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}><h2 style={{margin: '0px'}}>Visão geral</h2></Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Form layout="inline" onSubmit={this.handleSubmit} style={{ float: 'right' }}>
                            <FormItem>
                                <span>Periodo</span>
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('interval', {
                                    rules: [{ required: true, message: 'O intervalo é obrigatório!' }],
                                    initialValue: 1
                                })(
                                    <InputNumber min={1} />,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('period', {
                                    rules: [{ required: true, message: 'O periodo é obrigatorio!' }],
                                    initialValue: 'WEEK'
                                })(
                                    <Select style={{ width: 120 }}>
                                        <Option value="DAY">Dia</Option>
                                        <Option value="WEEK">Semana</Option>
                                        <Option value="MONTH">Mês</Option>
                                        <Option value="YEAR">Ano</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Consultar
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Board>
                            <h3 style={{ color: '#618833' }}>Residuos produzidos</h3>
                            <hr style={{ marginBottom: '25px' }} />
                            <Pie data={data} width={600} height={heightBoard * 0.9} />
                        </Board>
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Row gutter={24}>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Board height={window.innerHeight * 0.30}>
                                    <h3 style={{ color: '#618833' }}>Volume coletado</h3>
                                    <hr style={{ marginBottom: '25px' }} />
                                </Board>
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Board height={window.innerHeight * 0.30}>
                                    <h3 style={{ color: '#618833' }}>Volume coletado</h3>
                                </Board>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Board height={window.innerHeight * 0.27}>
                            <h3 style={{ color: '#618833' }}>Volume coletado</h3>
                            <hr style={{ marginBottom: '25px' }} />
                        </Board>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Form.create()(GeneralPage);