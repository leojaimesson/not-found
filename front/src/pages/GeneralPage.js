import React, { Component } from 'react';

import { Row, Col, Button, Form, Select, InputNumber, Divider } from 'antd';

import Board from '../components/board/Board';

import { ResponsiveBar } from '@nivo/bar';

import { ResponsivePie } from '@nivo/pie';

import { ResponsiveStream } from '@nivo/stream';

import DataClient from '../api/DataClient';

const FormItem = Form.Item;

const Option = Select.Option;


class GeneralPage extends Component {

    constructor(props) {
        super(props);
        this.dataClient = new DataClient('http://localhost:3001/datas');
        this.state = {
            datas: [],
            colors: [],
            keys: [],
            pieData: [],
            totalKg: 0,
        }
    }

    async componentWillMount() {
        const response = await this.dataClient.getAllWasteByPeriod('WEEK', 1);

        const responseFiltered = response.data.filter((value) => value.data > 0);

        const totalKg = responseFiltered.reduce((acc, current) => acc + current.data, 0);

        const barDatas = responseFiltered.map(value => {
            const obj = {};
            obj[value.name] = value.data;
            obj['residuos'] = value.name;
            return obj;
        });
        const barKeys = responseFiltered.map(value => value.name);
        const barColors = responseFiltered.map(value => value.color);

        const pieData = responseFiltered.map(value => {
            const obj = {};
            obj.id = value.name;
            obj.label = value.name;
            obj.value = parseFloat(((value.data / totalKg) * 100).toFixed(2));
            return obj;
        });

        this.setState({
            datas: barDatas || [],
            colors: barColors,
            keys: barKeys,
            pieData: pieData,
            totalKg: totalKg
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const response = await this.dataClient.getAllWasteByPeriod(values.period, values.interval);
                const responseFiltered = response.data.filter((value) => value.data > 0);

                const totalKg = responseFiltered.reduce((acc, current) => acc + current.data, 0);

                const barDatas = responseFiltered.map(value => {
                    const obj = {};
                    obj[value.name] = value.data;
                    obj['residuos'] = value.name;
                    return obj;
                });
                const barKeys = responseFiltered.map(value => value.name);
                const barColors = responseFiltered.map(value => value.color);

                const pieData = responseFiltered.map(value => {
                    const obj = {};
                    obj.id = value.name;
                    obj.label = value.name;
                    obj.value = ((value.data / totalKg) * 100).toFixed(2);
                    return obj;
                });

                this.setState({
                    datas: barDatas || [],
                    colors: barColors,
                    keys: barKeys,
                    pieData: pieData,
                    totalKg: totalKg
                });
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const heightBoard = window.innerHeight * 0.70;
        return (
            <>
                <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}><h2 style={{ margin: '0px' }}>Visão geral</h2></Col>
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
                    <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                        <Row gutter={24}>
                            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                                <Board height={window.innerHeight * 0.20}>
                                    <Divider orientation="left"><h3 style={{ color: '#618833' }}>Peso total coletado</h3></Divider>
                                    <div style={{
                                        fontSize: '2em',
                                        height: '25%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>{this.state.totalKg.toFixed(2)} Kg</div>
                                </Board>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Board height={heightBoard}>
                            <Divider orientation="left"> <h3 style={{ color: '#618833' }}>Residuos produzidos em Kg</h3></Divider>

                            <div style={{ height: '80%' }}>
                                <ResponsiveBar
                                    margin={{
                                        top: 40,
                                        right: 50,
                                        bottom: 40,
                                        left: 50
                                    }}
                                    axisBottom={null}
                                    data={this.state.datas}
                                    indexBy="residuos"
                                    keys={this.state.keys}
                                    colors={this.state.colors}
                                    padding={0.2}
                                    labelTextColor='#ffffff'
                                    labelSkipWidth={16}
                                    labelSkipHeight={16}

                                />
                            </div>
                        </Board>
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Board height={heightBoard}>
                            <Divider orientation="left"><h3 style={{ color: '#618833' }}>Residuos produzidos em percentual</h3></Divider>



                            <div style={{ height: '90%' }}>
                                <ResponsivePie
                                     margin={{
                                        top: 40,
                                        right: 50,
                                        bottom: 55,
                                        left: 50
                                    }}
                                    data={this.state.pieData}
                                    animate
                                    innerRadius={0.6}
                                    padAngle={1}
                                    cornerRadius={3}
                                    colors={this.state.colors}
                                    radialLabelsLinkColor="inherit"
                                    radialLabelsLinkStrokeWidth={3}
                                    radialLabelsTextColor="inherit:darker(1.2)"
                                />
                            </div>
                        </Board>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Form.create()(GeneralPage);