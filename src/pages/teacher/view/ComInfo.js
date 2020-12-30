import React, { Component, Fragment } from 'react'
import {
  Table, Button, message,Modal,InputNumber
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import '../../teacher/style/ComInfo.css';
import { ShowComInfo, putScore,deleteCompany,ShowComMember,ChoseCompany,ShowComLevel } from '../../../until/api/teacherApi';
import baseUrl from '../../../until/BaseUrl';
// 父组件
class ComInfo extends Component { 
  constructor(props) { 
      super(props);
      // this.handleDelete = this.handleDelete.bind(this);
      this.expandedRowRender = this.expandedRowRender.bind(this);
      this.onExpand = this.onExpand.bind(this);
      this.ShowCompanyLevel = this.ShowCompanyLevel.bind(this);
      // this.textInput = React.createRef();
      this.state = {
        columns : [
          {
            title: '公司名称',
            dataIndex: 'comName',
            key:'comName'
          },
          {
            title: 'CEO学号',
            dataIndex: 'ceoID',
            key:'ceoID'
          },
          {
            title: 'CEO姓名',
            dataIndex: 'ceoname',
            key:'ceoname'
          },
          {
            title: '公司得分',
            dataIndex: 'companyScore',
            key:'companyScore'
          },
          {
            title: '票数',
            dataIndex: 'count',
            key:'count'
          },
          {
            title: '等级',
            dataIndex: 'level',
            key:'level'
          },
          {

            title: '得分',
            dataIndex: 'ShowScore',
            // width: '20%'
          },
          {
            title: '老师打分',
            dataIndex: 'scoreTeacher',
            key: 'scoreTeacher',
            width:'20%',
            render: (text,record) => {
             
              return (
                <Fragment>
                  <CustomTextInput parent={ this} ref={this.textInput} txt={text} record={ record}/>      
                </Fragment>

              )
            },
            width:'6%'
          },
          {
            title: '添加学生',
            dataIndex: 'AddStudent',
            key: 'AddStudent',
            width:'20%',
            render: (text,record) => {
             
              return (
                <Fragment>
                  <AddStudent parent={ this} ref={this.textInput} txt={text} record={ record}/>      
                </Fragment>

              )
            },
            width:'6%'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) =>
              this.state.data.length >= 1 ? (
                <DelPop record={record} data={this.state.data} parent={ this}/>
                // <Popconfirm title="确认删除该公司?" onConfirm={() => this.handleDelete(record.key,record.ceoID,record.companyName)}>
                //   <a>删除公司</a>
                // </Popconfirm>
              ) : null,
          },
        ],
        data: [
          
        ],
        pagination: {
          total:20,
          pageSize: 7,
          // onChange:this.onchange,
        },
        expandedData: {},
        loading: false,
        disabled: true,
        expandedloading: {},
        // 是否能看公司等级
        ComLeLoading:false
      };

      

  }
  getChildrenData = (result,msg) => { 
    this.setState({
        data:msg
    })
}
  // handleDelete = (key,ceo,companyName) => {
  //   const dataSource = [...this.state.data];
  //   // console.log(ceo);
  //   let res = deleteCompany(ceo,companyName,localStorage.teachclass);
  //   res.then(
  //     (result) => { 
  //       console.log(result);
  //       if (result.data.flag == true) { 
  //         this.setState({
  //           data: dataSource.filter((item) => item.key !== key),
  //         });
  //         message.success('删除成功！');
  //       }
  //       else {
  //         message.error('删除失败！');
  //       }
  //     },
  //     (err) => { 
  //       console.log(err);
  //       message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
  //     }
  //   )

  // };


  IsPagination = (record) => { 
    if (this.state.expandedData[record.comName] > 10) {
      return true
    }
    else { 
      return false
    }
  }
  expandedRowRender = (record) => {


    const columns = [
      { title: '学号', dataIndex: 'studentId', key: 'studentId' },
      { title: '姓名', dataIndex: 'userName', key: 'userName' },
      {
        title: '公司名',key: 'companyName',dataIndex:'companyName'
      },
      { title: '职位', dataIndex: 'position', key: 'position' },
      { title:'专业',dataIndex:'academy',key:'academy' },
    ]; 
    
    
    
    return (
      <Fragment>
          <Table
          rowKey={record => record.studentId}
          columns={columns}
          dataSource={this.state.expandedData[record.comName]}
          loading={this.state.expandedloading[record.comName]}
          pagination={ this.IsPagination(record)}
        />

        
        
      </Fragment>
      
    )
  
  };
  onExpand = (expanded, record) => {
    // console.log(record);
    if (expanded == false) {
      // console.log('合并');
      this.setState({
        expandedData: {
          ...this.state.expandedData,
          [record.comName]: [],
        }
      });
    }
    else {
      // console.log("展开！");
      // this.setState({
      //   expandedloading: {
      //   ...this.state.expandedloading,
      //   [record.comName]:true
      // } });

      if (this.state.expandedloading[record.comName] == undefined) {
        this.setState({
          expandedloading: {
            ...this.state.expandedloading,
            [record.comName]: true
          }
        })
      }
      else { 
        let loading = this.state.expandedloading;
        loading[record.comName] = true;
        this.setState({
          expandedloading: loading
        })
      }
      let res = ShowComMember(record.ceoID);
      res.then(
        (result) => {
          let mydata = [];
          for (let i in result.data.data) {
            if (result.data.data[i].position == null || result.data.data[i].position === undefined ||
              result.data.data[i].position == 'null') { 
              result.data.data[i].position = '';
              
            }
            mydata.push({
              key: i,
              'studentId': result.data.data[i].studentId,
              'userName': result.data.data[i].userName,
              'companyName': result.data.data[i].companyName,
              'position': result.data.data[i].position,
              'academy': result.data.data[i].academy
            })
            
            // if (result.data.data[i].position == null || result.data.data[i].position === undefined) { 
            //   mydata.position = '';
            // }
          }
          
          this.setState({
            expandedData: {
              ...this.state.expandedData,
              [record.comName]: mydata,
            },
            
            
          });
          let loading = this.state.expandedloading;
          if (loading[record.comName] == true) {
            loading[record.comName] = false;
          }
          // else if (loading[record.comName] == null) { 
          //   loading
          // }

          this.setState({
            // expandedloading[record.comName]:false
          })
          // this.setState({expandedloading: false})
        },
        (err) => {
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
          console.log(err);
        }
      )



    }
  }
  changeScore() { 
    this.setState({
        
      data: [],
      pagination: {
        total:20,
        pageSize: 10,
        hideOnSinglePage:false
        },
      loading: true,
    })
    let res = ShowComInfo(localStorage.teachclass);
    let mydata=[];
    res.then(
      (result) => { 
        // console.log(result);
        if (result.data.data == undefined) {
          this.setState({
            data: [],
            
            loading: false,
            
          })
        }
        else { 
          let newData = [];
          for (let j = 0; j < result.data.data["totalNumber"];j++) { 
            newData.push(false);
          }
          for (let i in result.data.data["object"]) { 
            mydata.push({
              key:i,
              // "companyID": result.data.data["object"][i]["companyID"],
              "comName": result.data.data["object"][i]["companyName"],
              "ceoID":result.data.data["object"][i]["ceo"],
              "ceoname":result.data.data["object"][i]["ceoName"],
              "companyScore":result.data.data["object"][i]["companyScore"],
              "count":result.data.data["object"][i]["count"],
              "level": result.data.data["object"][i]["level"],
              "ShowScore":result.data.data["object"][i]["scoreTeacher"],
              "scoreTeacher":result.data.data["object"][i]["scoreTeacher"],
            })


          }
          if (result.data.data["object"].length > result.data.data["pageSize"]) {
            this.setState({
              data: mydata,
              pagination: {
                total: result.data.data["totalNumber"],
                pageSize: result.data.data["pageSize"],
                hideOnSinglePage:false
              },
              loading: false,
              
            })
          }
          else { 
            this.setState({
              data: mydata,
              pagination: {
                total: result.data.data["totalNumber"],
                pageSize: result.data.data["pageSize"],
                hideOnSinglePage:true
              },
              loading: false,
              
            })
          }
                
        }
        
        // console.log(this.state);
      },
      (err) => { 
        message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
        console.log(err);
      }
  )
  }

  Refresh = () => { 
    this.setState({
        
      data: [],
      pagination: {
        total:20,
        pageSize: 10,
        hideOnSinglePage:false
        },
      loading: true,
    })
    let res = ShowComInfo(localStorage.teachclass);
    let mydata=[];
    res.then(
      (result) => { 
        // console.log(result);
        if (result.data.data == undefined) {
          this.setState({
            data: [],
            
            loading: false,
            
          })
        }
        else { 
          let newData = [];
          for (let j = 0; j < result.data.data["totalNumber"];j++) { 
            newData.push(false);
          }
          for (let i in result.data.data["object"]) { 
            mydata.push({
              key:i,
              // "companyID": result.data.data["object"][i]["companyID"],
              "comName": result.data.data["object"][i]["companyName"],
              "ceoID":result.data.data["object"][i]["ceo"],
              "ceoname":result.data.data["object"][i]["ceoName"],
              "companyScore":result.data.data["object"][i]["companyScore"],
              "count":result.data.data["object"][i]["count"],
              "level": result.data.data["object"][i]["level"],
              "ShowScore":result.data.data["object"][i]["scoreTeacher"],
              "scoreTeacher":result.data.data["object"][i]["scoreTeacher"],
            })


          }
          // result.data.data["pageSize"]
          if (result.data.data["object"].length > 7) {
            this.setState({
              data: mydata,
              pagination: {
                total: result.data.data["totalNumber"],
                pageSize: 7,
                hideOnSinglePage:false
              },
              loading: false,
              
            })
          }
          else { 
            this.setState({
              data: mydata,
              pagination: {
                total: result.data.data["totalNumber"],
                pageSize:7,
                // pageSize: result.data.data["pageSize"],
                hideOnSinglePage:true
              },
              loading: false,
              
            })
          }
                
        }
        
        // console.log(this.state);
      },
      (err) => { 
        message.warning(err.result.message);
        console.log(err);
      }
  )
  }
  ShowCompanyLevel=()=> { 

    // console.log(localStorage.teachclass);
    let res = ShowComLevel(localStorage.teachclass);
    this.setState({
      ComLeLoading:true
    })
    res.then(
      (result) => { 

        if (result.data.flag == true) {
          message.success(result.data.message);
          this.Refresh();
        }
        else { 
          message.error(result.data.message);
        }
      },
      (err) => { 
        message.error('一键生成公司等级失败');
      }
    ).then(
      () => { 

        this.setState({
          ComLeLoading:false
        })
      }
    )

  }
    // 表格
  componentDidMount() {
    
    this.setState({
        
        data: [],
        pagination: {
          total:20,
          pageSize: 10,
          hideOnSinglePage:false
          },
        loading: true,
      })
      let res = ShowComInfo(localStorage.teachclass);
      let mydata=[];
      res.then(
        (result) => { 
          // console.log(result);
          if (result.data.data == undefined) {
            this.setState({
              data: [],
              
              loading: false,
              
            })
          }
          else { 
            let newData = [];
            for (let j = 0; j < result.data.data["totalNumber"];j++) { 
              newData.push(false);
            }
            for (let i in result.data.data["object"]) { 
              mydata.push({
                key:i,
                // "companyID": result.data.data["object"][i]["companyID"],
                "comName": result.data.data["object"][i]["companyName"],
                "ceoID":result.data.data["object"][i]["ceo"],
                "ceoname":result.data.data["object"][i]["ceoName"],
                "companyScore":result.data.data["object"][i]["companyScore"],
                "count":result.data.data["object"][i]["count"],
                "level": result.data.data["object"][i]["level"],
                "ShowScore":result.data.data["object"][i]["scoreTeacher"],
                "scoreTeacher":result.data.data["object"][i]["scoreTeacher"],
              })
  
  
            }
            // result.data.data["pageSize"]
            if (result.data.data["object"].length > 7) {
              this.setState({
                data: mydata,
                pagination: {
                  total: result.data.data["totalNumber"],
                  pageSize: 7,
                  hideOnSinglePage:false
                },
                loading: false,
                
              })
            }
            else { 
              this.setState({
                data: mydata,
                pagination: {
                  total: result.data.data["totalNumber"],
                  pageSize:7,
                  // pageSize: result.data.data["pageSize"],
                  hideOnSinglePage:true
                },
                loading: false,
                
              })
            }
                  
          }
          
          // console.log(this.state);
        },
        (err) => { 
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
          console.log(err);
        }
    )
      } 
    
  
    render() { 
        return (
            <Fragment>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              
             
                <span className='title'>公司信息</span>
                <Button
                icon={<DownloadOutlined />}
                disabled={this.state.IsShowlevel}
                type='primary'
                onClick={this.ShowCompanyLevel}
                loading={this.state.ComLeLoading}
                >
                  生成公司等级
                </Button>
                    {/* <span className='com-search'>
                        <Input placeholder="公司名称" className="input" />
                        <Button type="primary">搜索</Button>
                    </span> */}
                </div>

            <div>
              
              <Table
                    
                className="components-table-demo-nested"
                columns={this.state.columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                expandedRowRender={record => this.expandedRowRender(record)}
                onExpand={(expanded,record)=>this.onExpand(expanded,record)}      
              />
             
              </div>
            </Fragment>
        );
    }
}



// 子组件
class DelPop extends React.Component { 
  constructor(props) { 
      super(props);
      this.showModal = this.showModal.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.state = {
          loading: false,
          visible: false,
      }        
  }

  showModal = () => { 
      this.setState({
          visible:true
      })
  }

  handleDelete = () => {
      const dataSource = [...this.props.parent.state.data];
      const key = this.props.record.key;
      const ceo = this.props.record.ceoID;
      const companyName = this.props.record.comName;
      console.log(companyName);
      let res = deleteCompany(ceo,companyName,localStorage.teachclass);
      res.then(
        (result) => { 
          console.log(result);
          console.log(result.data.flag);
          this.props.parent.setState({
                data: dataSource.filter((item) => item.key !== key)
          })
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
  
  handleCancel = () => {
      this.setState({ visible: false });
  };

  render(){ 
      const { visible, loading } = this.state;
      return (
          <>
          <a onClick={ this.showModal}>删除</a>
          <Modal
          width="15vw"
          visible={visible}
          title=""
          onOk={this.handleDelete}
          onCancel={this.handleCancel}
          footer={[
              <Button key="back" onClick={this.handleCancel}>
              取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleDelete}>
              确定
              </Button>,
          ]}
          >
                  <p style={{textAlign:'center'}}>确认删除？</p>
          </Modal>
      </>
          );
  }
}

// 子组件
class CustomTextInput extends React.Component { 
  constructor(props) { 
      super(props);
      this.showModal = this.showModal.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.textInput = React.createRef();
      this.focusTextInput = this.focusTextInput.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.state = {
          loading: false,
          visible: false,
          inputValue: this.props.txt,
          record:this.props.record
      }        
  }

  showModal = () => { 
      this.setState({
          visible:true
      })
  }
  
  handleCancel = () => {
      this.setState({ visible: false });
  };

  focusTextInput() {
      let ceo = this.state.record.ceoID;
      let scoreTeacher = this.state.inputValue;
      console.log(ceo);
      let res = putScore(ceo, scoreTeacher);
      res.then(
        (result) => { 
          console.log(result);
          if (result.data.error) {
            message.error('修改失败！');
            
          }
          else { 
            message.success('修改成功！');
            
          }
          
          
          
        },
        (err) => { 
          console.log(err);
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
         
          }
      ).then(() => { 
        
        this.handleCancel();
        this.props.parent.changeScore();
      })
    
    
    
  }

  handleInput(e) { 
    this.setState({
      inputValue:e
    })
  }


  render(){ 
      const { visible, loading } = this.state;
      return (
          <>
          <a onClick={ this.showModal}>打分</a>
          <Modal
          width="15vw"
          visible={visible}
          title="老师打分"
          onCancel={this.handleCancel}
          footer={[
              <Button key="back" onClick={this.handleCancel}>
              取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.focusTextInput}>
              确定
              </Button>,
          ]}
          >
            
            <div className="Inp-Sco-div">
              <InputNumber
                className='InpSco'
                type="text"
                value={this.state.inputValue}
                onChange={this.handleInput}
                min={1}
                max={ 100}
              />
              </div>
                  
          </Modal>
      </>
          );
  }
}


// 子组件
class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      // inputValue: this.props.txt,
      record:this.props.record,
      inputValue: '',
      loading: false,
      visible: false,
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });

    let ceo = this.state.record.ceoID;
    let companyName = this.state.record.comName;
    let studentId = this.textInput.current.value;
    console.log(ceo);
    let res = ChoseCompany(ceo, studentId,companyName);
    res.then(
      (result) => { 
        console.log(result);
       
        if (result.data.flag) {
          message.success(result.data.message);
        }
        else { 
          message.warning(result.data.message);
        }
        this.setState({ loading: false, visible: false });
        
        
      },
      (err) => { 
        console.log(err);
        message.warning(err.data.message);
        this.setState({ loading: false, visible: false });
        }
    ).then(() => { 
      this.props.parent.onExpand(true, this.state.record);
    })

    

  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  focusTextInput() {
    let ceo=this.state.record.ceoID;
    let scoreTeacher = this.textInput.current.value;
    console.log(ceo);
    let res = putScore(ceo, scoreTeacher);
    res.then(
      (result) => { 
        console.log(result);
        message.success('修改成功！');
        
        
      },
      (err) => { 
        console.log(err);
        message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
        }
      )
    
  }

  handleInput(e) { 
    let value = e.target.value;
    this.setState({
      inputValue: value,
    })
  }
  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          添加
        </Button>
        <Modal
          visible={visible}
          title="添加新的学生信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[

            <Button key="back" onClick={this.handleCancel}>
              返回
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
            <div className="Inp-Sco-div">
                <input
                      className='InpSco'
                      type="text"
                      ref={this.textInput}
                      value={this.state.inputValue}
                      onChange={this.handleInput}
                      placeholder='请输入学生学号'
                  />
            </div>
        </Modal>
      </>
    );
  }
}
export default ComInfo;