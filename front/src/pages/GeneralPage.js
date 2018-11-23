import React, { Component } from 'react';

import { Row, Col, Button, Form, Select, InputNumber, Divider } from 'antd';

import moment from 'moment';

import Board from '../components/board/Board';

import { ResponsiveBar } from '@nivo/bar';

import { ResponsivePie } from '@nivo/pie';

import { ResponsiveCalendar } from '@nivo/calendar';

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
            timeLine: [],
            legend: [],
        }
    }

    async componentWillMount() {
        const response = await this.dataClient.getAllWasteByPeriod('WEEK', 1);

        const responseFiltered = response.data.filter((value) => value.data > 0);

        const start = new Date(2018, 0, 1, 0, 0, 0);
        const end = new Date(2018, 11, 31, 11, 59, 59);
        console.log(end)


        const responseTimeLine = (await this.dataClient.getWastesByPeriodFull(start, end)).data.reduce((acc, current) => [...acc, ...current.data], []).map((value) => {
            console.log(value)
            value.collectionDate = new Date(value.collectionDate);
            value.collectionDate.setHours(0);
            value.collectionDate.setMinutes(0);
            value.collectionDate.setSeconds(0);
            return value;
        });

        const rs = {};

        responseTimeLine.forEach(value => {
            if (!rs[value.collectionDate]) {
                rs[value.collectionDate] = {
                    day: moment(value.collectionDate).format('YYYY-MM-DD'),
                    value: value.quantityCollected
                }
            } else {
                rs[value.collectionDate].value += value.quantityCollected;
            }
        });

        const rs2 = Object.keys(rs).map(function (key) {
            return rs[key];
        });

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

        const legend = responseFiltered.map(value => ({ name: value.name, color: value.color }));

        this.setState({
            datas: barDatas || [],
            colors: barColors,
            keys: barKeys,
            pieData: pieData,
            totalKg: totalKg,
            timeLine: rs2,
            legend: legend,
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
                    <Col xs={{ span: 24 }} lg={{ span: 24 }}>
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
                        <Board height={heightBoard}>
                            <Divider orientation="left"> <h3 style={{ color: '#618833' }}>Resíduos produzidos em Kg</h3></Divider>

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
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                />
                                <div style={{ display: 'flex' }}>
                                    {this.state.legend.map(value => <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}><div style={{ height: '10px', width: '10px', background: value.color }} /><span style={{fontSize: '0.65em', marginLeft: '2px'}}>{value.name}</span></div>)}
                                </div>
                            </div>
                        </Board>
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Board height={heightBoard}>
                            <Divider orientation="left"><h3 style={{ color: '#618833' }}>Resíduos produzidos em percentual</h3></Divider>



                            <div style={{ height: '80%' }}>
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
                                <div style={{ display: 'flex' }}>
                                    {this.state.legend.map(value => <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}><div style={{ height: '10px', width: '10px', background: value.color }} /><span style={{fontSize: '0.65em', marginLeft: '2px'}}>{value.name}</span></div>)}
                                </div>
                            </div>
                        </Board>
                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                        <Board height={window.innerHeight * 0.45}>
                            <Divider orientation="left"><h3 style={{ color: '#618833' }}>Foram coletados {this.state.totalKg.toFixed(2)} Kg de residuos este ano</h3></Divider>


                            <div style={{ height: '80%' }}>
                                <ResponsiveCalendar
                                    margin={{
                                        top: 50,
                                        right: 10,
                                        bottom: 10,
                                        left: 50
                                    }}
                                    from="2018-01-01T03:00:00.000Z"
                                    to="2018-12-31T03:00:00.000Z"
                                    data={this.state.timeLine}

                                    emptyColor="#eeeeee"
                                    colors={[
                                        "#61cdbb",
                                        "#97e3d5",
                                        "#e8c1a0",
                                        "#f47560"
                                    ]}
                                    yearSpacing={40}
                                    monthBorderColor="#ffffff"
                                    monthLegendOffset={10}
                                    dayBorderWidth={2}
                                    dayBorderColor="#ffffff"
                                    legends={[
                                        {
                                            "anchor": "bottom-right",
                                            "direction": "row",
                                            "translateY": 0,
                                            "itemCount": 4,
                                            "itemWidth": 34,
                                            "itemHeight": 36,
                                            "itemDirection": "top-to-bottom"
                                        }
                                    ]}
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