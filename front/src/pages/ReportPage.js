import React, { Component } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

import moment from 'moment';

import { Table, Row, Col, Button, Form, Select, DatePicker } from 'antd';

import TypeSolidWasteClient from '../api/TypeSolidWasteClient';
import DataClient from '../api/DataClient';

import DataList from '../helpers/DataList';

import DataDoc from '../helpers/DataDoc';

import CollectionReport from '../docs/templates/CollectionReport';

const FormItem = Form.Item;

const Option = Select.Option;
class ReportPage extends Component {

    constructor(props) {
        super(props);
        this.typeSolidWasteClient = new TypeSolidWasteClient('http://localhost:3001/types-solid-waste');
        this.dataClient = new DataClient('http://localhost:3001/datas');
        this.state = {
            typesSolidWaste: [],
            dataTypesSolidWaste: [],
            dataTables: [],
            total: 0,
            dataDoc: {},
        };
    }

    async componentWillMount() {
        const response = await this.typeSolidWasteClient.getAll();
        this.setState({
            typesSolidWaste: response.data,
            dataTypesSolidWaste: response ? DataList.toTypesSolidWasteData(response.data) : [],
        });
    }

    handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {
                    type,
                    endDate,
                    startDate,
                } = values;

                if (endDate && startDate) {
                    const response = await this.dataClient.getWastesByPeriodFull(startDate, endDate, type);

                    const result = response.data.map((value) => DataList.toSolidWasteCollectedData(value.data))

                    const result2 = response.data.map((value) => DataDoc.toSolidWasteCollectedData(value.data)).reduce((acc, current) =>[...acc, ...current], []);
                    
                    const total = result2.reduce((acc, current) => acc + current[1], 0);

                    console.log(startDate.format('DD/MM/YYYY'));


                    this.setState({
                        dataTables: result,
                        dataDoc: {
                            datas: result2,
                            total: total,
                            startDate: startDate.format('DD/MM/YYYY'),
                            endDate: endDate.format('DD/MM/YYYY'),
                        },
                        total: total,
                    });
                }
            }
        });
    }

    render = () => {

        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: 'Data',
            dataIndex: 'collectionDate',
            key: 'collectionDate',
            width: 150
        }, {
            title: 'Total coletado',
            dataIndex: 'quantityCollected',
            key: 'quantityCollected',
            width: 200,
            render: (text, record) => (
                `${text} Kg`
            ),
        }, {
            title: 'Tipo',
            dataIndex: 'typeWasted',
            key: 'typeWasted'
        }];

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

                                <Col xs={{ span: 24 }} lg={{ span: 10 }} style={{ padding: '0px' }}>
                                    <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>

                                        <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ padding: '0px' }}>
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

                                        <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ padding: '0px' }}>
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

                                        <Col xs={{ span: 24 }} lg={{ span: 2 }} style={{ padding: '0px' }}>
                                            <FormItem {...formItemLayout} style={{ width: '100%' }}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    style={{ width: '100%' }}
                                                    icon="search"
                                                >
                                                </Button>
                                            </FormItem>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {this.state.dataTables.length > 0 &&
                    <div>
                        <div style={{
                            padding: '10px',
                            background: 'white',
                            margin: '16px 0px'
                        }}>
                            <Row type="flex" justify="space-between" align="middle" gutter={24} style={{ background: 'white', margin: '0px', padding: '10px 0px' }}>
                                <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ padding: '0px' }}>
                                    <h3 style={{margin: '0px'}}>Total Coletado</h3>
                                </Col>

                                <Col xs={{ span: 24 }} lg={{ span: 3 }} style={{ padding: '0px' }}>
                                    <Button ype="primary"
                                        htmlType="button"
                                        style={{ width: '100%' }}
                                        icon="file-pdf"
                                        onClick={() => {
                                            const { vfs } = vfsFonts.pdfMake;
                                            pdfMake.vfs = vfs;
                                            pdfMake.createPdf(CollectionReport(this.state.dataDoc)).download('report.pdf')
                                        }}>PDF</Button>
                                </Col>
                            </Row>
                        </div>
                        {this.state.dataTables.map((value, index) => <Table columns={columns} bordered dataSource={value} scroll={window.innerWidth <= 500 ? { x: 500 } : undefined} style={{ background: "white", marginBottom: '20px' }} />)}
                    </div>
                }

            </>
        );
    }
}

export default Form.create()(ReportPage);