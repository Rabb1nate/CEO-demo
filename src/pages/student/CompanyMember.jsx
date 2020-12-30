import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table,  Space,   message, Button, Empty , Modal, Input, } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import '../../static/style/style.scss'

class CompanyMember extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page5"))||1,
            visible: false,
            score:'',
            data : [
              ],
            NumberData:'',
         }
         this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if( newProps.message ){
            if( newProps.isRunScore === true )
            message.success("打分成功")
            else if(newProps.isRunScore === false ){
              message.error(newProps.message)
            }
          }
          const {MemberData} = newProps
          const {NumberData} = newProps
          let newdata = MemberData.object
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page5"))||1,
            data:newdata,
            totalNum:MemberData.totalNumber,
            NumberData:NumberData,
          })
        
        }
        catch{}
      }
    }
    componentDidMount() {
      if(localStorage.getItem("userId") && !this.props.MemberData){
        this.props.ShowCompanyMember(localStorage.getItem("userId"))
        this.props.ShowNumber(localStorage.getItem("userId"))
      }
      if(this.props.MemberData){
        this.props.Exist()
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props || nextState!== this.state) {
        return true
      }
      else {
        return false
      }
    }
    scoreChange(e) {
      const value = e.target.value.replace(/[^\-?\d.]/g,'')
      this.setState({
        score: value,
      })
    }
    showModal = () => {
      this.setState({
        visible: true,
      })
    }
    handleOk = e => {
  
      this.setState({
        visible: false,
      });
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      })
    }
    
    onPageChange (page,pageSize) {
      if (localStorage.getItem("userId")){
        this.props.ShowCompanyMember(localStorage.getItem("userId"))
      }
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            // data:newdata
        })
        changePage(5,page)
    }
    render() { 

      const columns = [
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        },
          {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
          },
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '公司名',
            key: 'companyName',
            dataIndex: 'companyName',
        },
        {
            title: '专业',
            key: 'academy',
            dataIndex: 'academy',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.showModal}>为{record.userName}投票</a>
              <Modal
                title="打分"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={
                    <Button
                      type="primary"
                      onClick={this.props.RunScore.bind(this,this.state.score,record.studentId)}
                    >确认打分</Button>

                }
              >
                <div className="login_input">
                  <div>
                    分数：
                    <Input
                      placeholder="请输入分数"
                      onChange={this.scoreChange}
                      value={this.state.score}
                    />
                  </div>
                  <Button style={{ width:90 ,  }}>
      </Button>
                </div>
              </Modal>
            </Space>
          ),
        },
      ]
      const pagination = {
        pageSize: 8,
        total:this.state.totalNum,
        onChange:this.onPageChange,
        current:this.state.currentPage,
        hideOnSinglePage:true,
    }
    if (localStorage.getItem("userId")){
        return ( 
            <div className="table_div">
              {this.state.NumberData}
            <Table columns={columns} dataSource={this.state.data} pagination={pagination}/>
            </div>
             )
        }
        else{
          return ( 
            <div className="table_div">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>请登录后查看</Empty>
            </div>
             )
        }
    } 
}
 
const mapDispatchToProps = (dispatch) => {
  return {
    ShowCompanyMember: (studentId) => {
        dispatch(actions.ShowCompanyMember(studentId))
    },
    RunScore: (score,scored) => {
        dispatch(actions.RunScore(score,scored))
    },
    ShowNumber: (studentId) => {
      dispatch(actions.ShowNumber(studentId))
    },
    Exist: () => {
      dispatch(actions.Exist())
    },
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMember)