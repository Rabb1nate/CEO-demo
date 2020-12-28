import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table,  Space,   message, Button, Empty } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import '../../static/style/style.scss'

class CompanyMember extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page5"))||1,
            data : [
              ],
         }
         this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if( newProps.isVoteForCeo === true )
          message.success("投票成功")
          if( newProps.message ){
            if( newProps.isRunCeo === true ){
              message.success(newProps.message)
            }
            else if(newProps.isVoteForCeo === false || newProps.isRunCeo === false ){
              message.error(newProps.message)
            }
          }
          const {MemberData} = newProps
          let newdata = MemberData.object
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page5"))||1,
            data:newdata,
            totalNum:MemberData.totalNumber
          })
        
        }
        catch{}
      }
    }
    componentDidMount() {
      if(localStorage.getItem("userId") && !this.props.MemberData){
        this.props.ShowCompanyMember(localStorage.getItem("userId"))
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
              <a onClick={this.props.VoteForCeo.bind(this,record.studentId,localStorage.getItem("userId"))}>为{record.userName}投票</a>
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
    VoteForCeo: (ceoId,studentId) => {
        dispatch(actions.VoteForCeo(ceoId,studentId))
    },
    RunCeo: () => {
      dispatch(actions.RunCeo())
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