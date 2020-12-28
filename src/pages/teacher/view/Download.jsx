import React, { Component, Fragment } from 'react';
import { showFile,DeleteUpload,download } from '../../../until/api/teacherApi';
import {Table,Popconfirm,message} from 'antd';

class Download extends Component { 
    constructor(props) { 
        super(props);
        this.onchange = this.onchange.bind(this);
        this.state = {
            columns: [
                  {
                    title: '学号',
                    dataIndex: 'stuid',
                    key: 'stuid',
                    },
                  {
                    title: '教学班号',
                    dataIndex: 'teachclass',
                    key: 'teachclass',
                    },
                
                  {
                    title: '文件名',
                    dataIndex: 'filename',
                    key: 'filename',
                      render: (text, record) => { 
                          console.log(record.id);
                          let url = `http://120.79.207.60:8089/upload/download?id=` + record.id;
                          return (
                            //   <a
                            //       onClick={() => { this.handleDownload(record.id) }}
                            //   >{text}</a>
                              <a href={url}>{ text}</a>
                        )
                      }
                },
                
                {
                    title: '删除',
                    dataIndex: 'delete',
                    key:'delete',
                    render: (text, record) =>
                      this.state.data.length >= 1 ? (
                        <Popconfirm title="确认删除该文件?" onConfirm={() => this.handleDelete(record,record.key,record.id)}>
                          <a>删除</a>
                        </Popconfirm>
                      ) : null,
                  },
            ],
            data: [],
            loading: false,
            pagination: {
                onChange: this.onchange,
                pageSize:15,
            }
            
        }
    }

    // handleDownload = (id) => { 
    //     let res = download(id);
    //     res.then((result) => { 
    //         console.log(result);
    //     },
    //     (error) => { 
    //         console.log(error);
    //     })
    // }
    handleDelete = (record, key, id) => {
        const dataSource = [...this.state.data];
        console.log(id);
        let res = DeleteUpload(id);
        res.then(
          (result) => { 
            console.log(result);
            console.log(result.data.flag);    
            this.setState({
              data: dataSource.filter((item) => item.key !== key),
            });
            if (result.data.flag == true) { 
                message.success('删除成功！');
                }
            else {
                message.error('删除失败！');
            }
            
          },
          (err) => { 
            console.log(err);
            message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
          }
        )
    

      };
    onchange(page) { 
        this.setState({
            loading:true
        })
        let res = showFile(localStorage.class,page);
        res.then(
            (result) => { 
                let data = JSON.parse(result.data);
                let newData = [];
                for (let i in data) { 
                    newData.push({
                        key: i,
                        "stuid": data[i].studentId,
                        "teachclass":data[i].teachclass,
                        "filename":data[i].fileName
                    })
                };
                this.setState({
                    data: newData,
                    loading:false
                });
                console.log(this.state.loading);
                
            },
            (err) => { 
                console.log(err);
            }
        )
    }
    componentDidMount() { 
        this.setState({
            loading:true
        })
        let res = showFile(localStorage.teachclass,0);
        res.then(
            (result) => { 
                let data = JSON.parse(result.data);
                // console.log(data);
                let newData = [];
                for (let i in data) { 
                    newData.push({
                        key: i,
                        "stuid": data[i].studentId,
                        "filename": data[i].fileName,
                        "id": data[i].id,
                        "teachclass":data[i].teachclass
                    })
                };
                this.setState({
                    data: newData,
                    loading:false
                });
                console.log(this.state.loading);
                
            },
            (err) => { 
                console.log(err);
            }
        )


    }
    render() { 
        return (
            <Fragment>
                <Table
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                />

            </Fragment>
        )
    }
}
export default Download;