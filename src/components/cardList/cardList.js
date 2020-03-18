import React, { Component } from 'react';
import { Table, Button, Tabs, Skeleton, Card, Input, Form, message } from 'antd';
import axios from 'axios'
import { Fragment } from 'react';
import CSVReader from "react-csv-reader";

// dept: "IT"
// user_id: 2
// name: "GONI"
// date: "21-01"
// planned_t1: "09:00"
// actual_t1: "09:39"
// planned_t2: "18:00"
// actual_t2: "18:46"
// normal_overtime_hour_: "0:00:00"
// holiday_overtime_hour_: "0:00:00"
// late_minute_: "0:39:00"
// leave_early_minute_: null
// absenteeism_day_: 0
// remark: null


export default class CardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingDB: false,
            usedCard: [],
            columns: [
                {
                    title: 'Dept',
                    dataIndex: 'dept',
                    key: 'dept',
                },
                {
                    title: 'User ID',
                    dataIndex: 'user_id',
                    key: 'user_id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: 'Planned T1',
                    dataIndex: 'planned_t1',
                    key: 'planned_t1',
                },
                {
                    title: 'Actual T1',
                    dataIndex: 'actual_t1',
                    key: 'actual_t1',
                },
                {
                    title: 'Planned T2',
                    dataIndex: 'planned_t2',
                    key: 'planned_t2',
                },
                {
                    title: 'Actual T2',
                    dataIndex: 'actual_t2',
                    key: 'actual_t2',
                },
                {
                    title: 'Normal Overtime(Hour)',
                    dataIndex: 'normal_overtime_hour_',
                    key: 'normal_overtime_hour_',
                },
                {
                    title: 'Holiday Overtime(Hour)',
                    dataIndex: 'holiday_overtime_hour_',
                    key: 'holiday_overtime_hour_',
                },
                {
                    title: 'Late(Minute)',
                    dataIndex: 'late_minute_',
                    key: 'late_minute_',
                },
                {
                    title: 'Leave Early(Minute)',
                    dataIndex: 'leave_early_minute_',
                    key: 'leave_early_minute_',
                },
                {
                    title: 'Absenteeism(Day)',
                    dataIndex: 'absenteeism_day_',
                    key: 'absenteeism_day_',
                },
                {
                    title: 'Remark',
                    dataIndex: 'remark',
                    key: 'remark',
                },
            ],
            updateURL: 'http://localhost/test/api.php',
        }
    }

    componentDidMount() { }
    handleForce = (data) => this.setState({ usedCard: data }, console.log(data))


    uploadToDB = () => {
        let data = this.state.usedCard;
        if (data.length === 0) {
            message.destroy()
            message.warn('No Data Found')
        } else {
            message.destroy()
            message.loading('Please Wait');
            Promise.all(data.map(item => {
                return new Promise((resolve, reject) => {
                    let data = {
                        sql: `INSERT INTO table_name 
                            (Dept, User_ID, uname, Date, Planned_T1, Actual_T1, Planned_T2, Actual_T2, Normal_Overtime, Holiday_Overtime, Late, Leave_Early, AbsenteeismDay, Remark) 
                            VALUES (
                                '${item.dept == null ? "" : item.dept}', 
                                '${item.user_id == null ? "" : item.user_id}', 
                                '${item.name == null ? "" : item.name}', 
                                '${item.date == null ? "" : item.date}', 
                                '${item.planned_t1 == null ? "" : item.planned_t1}', 
                                '${item.actual_t1 == null ? "" : item.actual_t1}', 
                                '${item.planned_t2 == null ? "" : item.planned_t2}', 
                                '${item.actual_t2 == null ? "" : item.actual_t2}', 
                                '${item.normal_overtime_hour_ == null ? "" : item.normal_overtime_hour_}', 
                                '${item.holiday_overtime_hour_ == null ? "" : item.holiday_overtime_hour_}', 
                                '${item.late_minute_ == null ? "" : item.late_minute_}', 
                                '${item.leave_early_minute_ == null ? "" : item.leave_early_minute_}', 
                                '${item.absenteeism_day_ == null ? "" : item.absenteeism_day_}', 
                                '${item.remark == null ? "" : item.remark}'
                            );`
                    }
                    console.log(data)
                    axios.post(this.state.updateURL, data).then(res => {
                        resolve(res.data)
                    }).catch(err => {
                        resolve({ status: 'Problem' })
                    })
                })
            })).then(ress => {
                message.destroy()
                message.success("Uploaded")
            })
        }
    }

    deleteTable = () => {

        let data = {
            sql: `DELETE FROM table_name WHERE 1`
        }
        console.log(data)
        axios.post(this.state.updateURL, data).then(res => {
            message.destroy()
            message.success("Deleted")
        }).catch(err => {
            message.destroy()
            message.error("Network Error")
        })
    }


    render() {
        const { columns, usedCard, isLoadingDB } = this.state;
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
        };

        return (
            <Fragment>
                <Form.Item label="Upload CSV" style={{ marginTop: 10 }}>
                    <CSVReader
                        cssClass="react-csv-input"
                        onFileLoaded={this.handleForce}
                        parserOptions={papaparseOptions}
                    />
                </Form.Item>

                <Form.Item label="API UPload Link" style={{ marginTop: 10 }}>
                    <Input value={this.state.updateURL} placeholder="Upload URL" onChange={e => this.setState({updateURL: e.target.value})}/>
                </Form.Item>

                <Tabs>
                    <Tabs.TabPane tab="Report" key="1">
                        <Skeleton loading={isLoadingDB}>
                            <Card
                                title={`Data (${usedCard.length})`}
                                extra={[
                                    <Button type="primary" onClick={this.uploadToDB}>Upload</Button>,
                                    <Button type="primary" onClick={this.deleteTable}>Delete Table</Button>
                                ]}
                            >
                                <Table
                                    title={() => ""}
                                    dataSource={usedCard}
                                    columns={columns}
                                    pagination={false}
                                />
                            </Card>
                        </Skeleton>
                    </Tabs.TabPane>
                </Tabs>
            </Fragment>
        );
    }
}

