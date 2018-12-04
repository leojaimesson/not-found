import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

import { Table, Row, Col, Button, Form, Select, DatePicker } from 'antd';

import TypeSolidWasteClient from '../api/TypeSolidWasteClient';
import DataClient from '../api/DataClient';

import DataList from '../helpers/DataList';

import DataDoc from '../helpers/DataDoc';

import CollectionReport from '../docs/templates/CollectionReport';

const FormItem = Form.Item;

const Option = Select.Option;
class ReportPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.typeSolidWasteClient = new TypeSolidWasteClient('https://betatcc.herokuapp.com/types-solid-waste');
        this.dataClient = new DataClient('https://betatcc.herokuapp.com/datas');
        this.state = {
            typesSolidWaste: [],
            dataTypesSolidWaste: [],
            dataTables: [],
            total: 0,
            dataDoc: {},
            filteredInfo: {},
            sortedInfo: {}
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
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {
                    type,
                    endDate,
                    startDate,
                } = values;

                if (endDate && startDate) {
                    const start = new Date(startDate);
                    start.setHours(0)
                    start.setMinutes(0);
                    start.setSeconds(0);

                    const end = new Date(endDate);
                    end.setHours(23)
                    end.setMinutes(59);
                    end.setSeconds(59);

                    const response = await this.dataClient.getWastesByPeriodFull(start, end, type);

                    const result = response.data.map((value) => DataList.toSolidWasteCollectedData(value.data)).reduce((acc, current) => [...acc, ...current]);

                    const result2 = result.map((value) => {
                        return DataDoc.toSolidWasteCollectedData(value);
                    });

                    const total = result2.reduce((acc, current) => acc + current[1], 0);

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

    handleChangeTable = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render = () => {

        const { getFieldDecorator } = this.props.form;

        const columns = [
            {
                title: '',
                dataIndex: 'color',
                key: 'color',
                width: 20,
                render: color => (
                    <div style={{ width: '10px', height: '10px', background: color }}></div>
                )
            }, {
            title: 'Data',
            dataIndex: 'collectionDate',
            key: 'collectionDate',
            width: 150,
            sorter: (a, b) => {
                const firstSplit = a.collectionDate.split('/');
                const secondSplit = b.collectionDate.split('/');

                const first = new Date(parseInt(firstSplit[2]), parseInt(firstSplit[1]) - 1, parseInt(firstSplit[0]));
                const second = new Date(parseInt(secondSplit[2]), parseInt(secondSplit[1]) - 1, parseInt(secondSplit[0]));

                return first - second;
            },
            sortOrder: this.state.sortedInfo.columnKey === 'collectionDate' && this.state.sortedInfo.order,
        }, {
            title: 'Total coletado',
            dataIndex: 'quantityCollected',
            key: 'quantityCollected',
            width: 200,
            render: (text, record) => (
                `${text} Kg`
            ),
            sorter: (a, b) => a.quantityCollected - b.quantityCollected,
            sortOrder: this.state.sortedInfo.columnKey === 'quantityCollected' && this.state.sortedInfo.order,
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
                                <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ padding: '0px' }}>
                                    <h3 style={{ margin: '0px' }}>Total Coletado {this.state.dataTables.reduce((acc, current) => acc + current.quantityCollected, 0).toFixed(2)} Kg</h3>
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
                        <Table columns={columns} onChange={this.handleChangeTable} bordered dataSource={this.state.dataTables} scroll={window.innerWidth <= 600 ? { x: 700 } : undefined} style={{ background: "white", marginBottom: '20px' }} />
                    </div>
                }

            </>
        );
    }
}

export default Form.create()(ReportPage);