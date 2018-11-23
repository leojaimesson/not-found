import React, { Component } from 'react';

import { Row, Col, Button, Form, Select, InputNumber, DatePicker, Divider } from 'antd';

import Board from '../components/board/Board';

import { ResponsiveBar } from '@nivo/bar';

import { ResponsiveStream } from '@nivo/stream';

import { ResponsivePie } from '@nivo/pie';

import DataClient from '../api/DataClient';
import TypeSolidWasteClient from '../api/TypeSolidWasteClient';

const FormItem = Form.Item;

const Option = Select.Option;

class AnalyzeCollectedWastesPage extends Component {

    constructor(props) {
        super(props);
        this.dataClient = new DataClient('http://localhost:3001/datas');
        this.typeSolidWasteClient = new TypeSolidWasteClient('http://localhost:3001/types-solid-waste');
        this.state = {
            typesSolidWaste: [],
            layoutAll: true,
            datas: [],
            colors: [],
            keys: [],
            pieData: [],
            totalKg: 0,
            streamDatas: [],
            streamKeys: [],
            streamColors: [],
            legend: [],
        }
    }

    async componentWillMount() {

        const responseType = await this.typeSolidWasteClient.getAll();

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
        const legend = responseFiltered.map(value => ({ name: value.name, color: value.color }));

        this.setState({
            datas: barDatas || [],
            colors: barColors,
            keys: barKeys,
            pieData: pieData,
            totalKg: totalKg,
            typesSolidWaste: responseType.data,
            legend: legend
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {
                    type,
                    endDate,
                    startDate,
                } = values;

                if (type === '') {
                    this.setState({
                        layoutAll: true
                    })
                } else {
                    this.setState({
                        layoutAll: false
                    })
                }

                const start = new Date(startDate);
                start.setHours(0)
                start.setMinutes(0);
                start.setSeconds(0);

                const end = new Date(endDate);
                end.setHours(23)
                end.setMinutes(59);
                end.setSeconds(59);

                if (endDate && startDate) {
                    if (type !== '') {
                        const response = await this.dataClient.getWastesByPeriodFull(start, end, type);

                        const responseFiltered = response.data[0].data.reduce((acc, current) => acc + current.quantityCollected, 0);

                        const totalKg = responseFiltered;

                        const x = response.data[0].data.map((value) => {
                            let obj = {};
                            obj[response.data[0].name] = value.quantityCollected;
                            return obj;
                        });
                        const streamKeys = []
                        streamKeys.push(response.data[0].name)
                        const streamColors = []
                        streamColors.push(response.data[0].color)
                        this.setState({
                            streamDatas: x,
                            streamKeys: streamKeys,
                            streamColors: streamColors,
                            totalKg: totalKg
                        });
                    } else {

                        const response = await this.dataClient.getWastesByPeriod(start, end);

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
                            totalKg: totalKg,
                        });
                    }
                } else {

                    if (type !== '') {
                        const response = await this.dataClient.getAllWasteByPeriodFull(values.period, values.interval, type);

                        const x = response.data[0].data.map((value) => {
                            let obj = {};
                            obj[response.data[0].name] = value.quantityCollected;
                            return obj;
                        });

                        const responseFiltered = response.data[0].data.reduce((acc, current) => acc + current.quantityCollected, 0);


                        const streamKeys = []
                        streamKeys.push(response.data[0].name)
                        const streamColors = []
                        streamColors.push(response.data[0].color)
                        this.setState({
                            streamDatas: x,
                            streamKeys: streamKeys,
                            streamColors: streamColors,
                            totalKg: responseFiltered
                        });
                    } else {
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

                }
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };


        return (

            <>
                {
                    !this.state.layoutAll &&
                    <>
                        <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>
                            <Col xs={{ span: 24 }} lg={{ span: 24 }}>

                                <Form layout="inline" onSubmit={this.handleSubmit}>

                                    <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '0px' }}>

                                        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>

                                            <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                {getFieldDecorator('type', {
                                                    rules: [{ required: false }],
                                                    initialValue: ''
                                                })(
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value="">Todos</Option>
                                                        {this.state.typesSolidWaste.map((value) => <Option value={value._id} key={value._id}>{value.name}</Option>)}
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>

                                        <Col xs={{ span: 24 }} lg={{ span: 14 }} style={{ padding: '0px' }}>
                                            <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>
                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('interval', {
                                                            rules: [{ required: false, message: 'O intervalo é obrigatório!' }]
                                                        })(
                                                            <InputNumber min={1} placeholder="intervalo" style={{ width: '100%' }} />,
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('period', {
                                                            rules: [{ required: true, message: 'O periodo é obrigatorio!' }],
                                                            initialValue: 'WEEK'
                                                        })(
                                                            <Select style={{ width: '100%' }}>
                                                                <Option value="DAY">Dia</Option>
                                                                <Option value="WEEK">Semana</Option>
                                                                <Option value="MONTH">Mês</Option>
                                                                <Option value="YEAR">Ano</Option>
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 1 }} style={{ padding: '10px 0px' }}></Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('startDate', {
                                                            rules: [{
                                                                required: false,
                                                            }]
                                                        })(
                                                            <DatePicker style={{ width: '100%' }} placeholder="Inicio" />
                                                        )}
                                                    </FormItem>
                                                </Col>

                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('endDate', {
                                                            rules: [{
                                                                required: false,
                                                            }],
                                                        })(
                                                            <DatePicker style={{ width: '100%' }} placeholder="fim" />
                                                        )}
                                                    </FormItem>
                                                </Col>

                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            style={{ width: '100%' }}
                                                        >
                                                            Consultar
                                                 </Button>
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>

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

                            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                                <Board height={window.innerHeight * 0.5}>
                                    <Divider orientation="left"> <h3 style={{ color: '#618833' }}>Residuos produzidos em Kg</h3></Divider>

                                    <div style={{ height: '80%' }}>
                                        <ResponsiveStream
                                            margin={{
                                                top: 60,
                                                right: 80,
                                                bottom: 60,
                                                left: 80
                                            }}
                                            keys={this.state.streamKeys}
                                            data={this.state.streamDatas}
                                            offsetType="diverging"
                                            colors={this.state.streamColors}
                                            animate={true}
                                            dotSize={8}
                                            dotBorderWidth={2}
                                            dotBorderColor="inherit:brighter(0.7)"
                                        />
                                    </div>
                                </Board>
                            </Col>
                        </Row>
                    </>
                }

                {
                    this.state.layoutAll &&
                    <>
                        <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>
                            <Col xs={{ span: 24 }} lg={{ span: 24 }}>

                                <Form layout="inline" onSubmit={this.handleSubmit}>

                                    <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '0px' }}>

                                        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>

                                            <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                {getFieldDecorator('type', {
                                                    rules: [{ required: false }],
                                                    initialValue: ''
                                                })(
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value="">Todos</Option>
                                                        {this.state.typesSolidWaste.map((value) => <Option value={value._id} key={value._id}>{value.name}</Option>)}
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>

                                        <Col xs={{ span: 24 }} lg={{ span: 14 }} style={{ padding: '0px' }}>
                                            <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>
                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('interval', {
                                                            rules: [{ required: false, message: 'O intervalo é obrigatório!' }]
                                                        })(
                                                            <InputNumber min={1} placeholder="intervalo" style={{ width: '100%' }} />,
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('period', {
                                                            rules: [{ required: true, message: 'O periodo é obrigatorio!' }],
                                                            initialValue: 'WEEK'
                                                        })(
                                                            <Select style={{ width: '100%' }}>
                                                                <Option value="DAY">Dia</Option>
                                                                <Option value="WEEK">Semana</Option>
                                                                <Option value="MONTH">Mês</Option>
                                                                <Option value="YEAR">Ano</Option>
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 1 }} style={{ padding: '10px 0px' }}></Col>
                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('startDate', {
                                                            rules: [{
                                                                required: false,
                                                            }]
                                                        })(
                                                            <DatePicker style={{ width: '100%' }} placeholder="Inicio" />
                                                        )}
                                                    </FormItem>
                                                </Col>

                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        {getFieldDecorator('endDate', {
                                                            rules: [{
                                                                required: false,
                                                            }],
                                                        })(
                                                            <DatePicker style={{ width: '100%' }} placeholder="fim" />
                                                        )}
                                                    </FormItem>
                                                </Col>

                                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                                    <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                        <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            style={{ width: '100%' }}
                                                        >
                                                            Consultar
                                                 </Button>
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>

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
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Board height={window.innerHeight * 0.5}>
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
                                        <div style={{ display: 'flex' }}>
                                            {this.state.legend.map(value => <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}><div style={{ height: '10px', width: '10px', background: value.color }} /><span style={{ fontSize: '0.65em', marginLeft: '2px' }}>{value.name}</span></div>)}
                                        </div>
                                    </div>
                                </Board>
                            </Col>

                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Board height={window.innerHeight * 0.5}>
                                    <Divider orientation="left"> <h3 style={{ color: '#618833' }}>Residuos produzidos em Kg</h3></Divider>

                                    <div style={{ height: '80%' }}>
                                        <ResponsivePie
                                            margin={{
                                                top: 40,
                                                right: 50,
                                                bottom: 55,
                                                left: 50
                                            }}
                                            data={this.state.pieData}
                                            animate={true}
                                            innerRadius={0.6}
                                            padAngle={1}
                                            cornerRadius={3}
                                            colors={this.state.colors}
                                            radialLabelsLinkColor="inherit"
                                            radialLabelsLinkStrokeWidth={3}
                                            radialLabelsTextColor="inherit:darker(1.2)"
                                        />
                                        <div style={{ display: 'flex' }}>
                                            {this.state.legend.map(value => <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}><div style={{ height: '10px', width: '10px', background: value.color }} /><span style={{ fontSize: '0.65em', marginLeft: '2px' }}>{value.name}</span></div>)}
                                        </div>
                                    </div>
                                </Board>
                            </Col>
                        </Row>
                    </>
                }
            </>
        );
    }
}

export default Form.create()(AnalyzeCollectedWastesPage);