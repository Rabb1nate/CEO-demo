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
            studentId:'',
            loading:true,
            b_loading:false,
            MyCompanyData:'',
            ScoreData:'',
            data : [
              ],
            NumberData:'',
         }
         this.onPageChange=this.onPageChange.bind(this)
         this.showModal = this.showModal.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if( newProps.isRunScore === true && !newProps.message){
            message.success("打分成功")
            this.setState({
              b_loading:false
            })
          }
          if( newProps.message ){
            if( newProps.isRunScore === true ){
              message.success("打分成功")
              this.setState({
                b_loading:false
              })
            }
            else if(newProps.isRunScore === false ){
              message.error(newProps.message)
              this.setState({
                b_loading:false
              })
            }
          }
          const MemberData = newProps.MemberData.data
          const NumberData = newProps.NumberData.data
          const MyCompanyData = newProps.MyCompanyData.data
          const ScoreData = newProps.ScoreData.data
          let newdata = MemberData
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page5"))||1,
            data:newdata,
            totalNum:MemberData.totalNumber,
            NumberData:NumberData,
            MyCompanyData:MyCompanyData,
            ScoreData:ScoreData,
            loading:false
          })
        }
        catch{

        }
      }
    }
    componentDidMount() {
      if(localStorage.getItem("userId") && !this.props.MemberData){
        this.props.ShowCompanyMember(localStorage.getItem("userId"))
        this.props.ShowNumber(localStorage.getItem("userId"))
        this.props.ShowScore(localStorage.getItem("userId"))
        this.props.ShowCompany(localStorage.getItem("userId"))
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
    scoreChange = (e) => {
      const value = e.target.value.replace(/[^\-?\d.]/g,'')
      this.setState({
        score: value,
      })
    }
    showModal = (studentId) => {
      this.setState({
        visible: true,
        studentId:studentId,
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
      var scored
      const columns = [
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            render:(text) => {
              if(!text)
              return(
                <p>暂无职位</p>
              )
              else {
                return(
                  <p>{text}</p>
                )
              }
            }
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
          title: '分数',
          key: 'action',
          render: (text, record) => {
            let flag = true
            let score 
            // if(record.studentId !== localStorage.getItem("userId") && this.state.NumberData.level !== 0)
            for(let item of this.state.ScoreData){
              if(item.scored === record.studentId){
                flag = false
                score = item.score
                break
              }
            }
            if(record.studentId !== localStorage.getItem("userId") && flag)
            return (
            <Space size="middle">
              <a onClick={this.showModal.bind(this,record.studentId)}>打分</a>
              <Modal
                title="打分"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={
                    <Button
                      type="primary"
                      onClick={this.props.RunScore.bind(this,this.state.score,this.state.studentId,this)}
                      loading={this.state.b_loading}
                    >确认打分</Button>

                }
              >
                <div className="score_Input">
                  <div>
                    分数：
                    <Input
                      placeholder="请输入分数"
                      onChange={this.scoreChange}
                      value={this.state.score}
                    />
                  </div>
                </div>
              </Modal>
            </Space>
          )
          if( !flag )
          return (
          <Space size="middle">
            <p >已打分:{score}</p>
          </Space>
        )
          else return(
            <Space size="middle">
            <p>暂无分数</p>
            </Space>
          )
        },
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
      if(this.state.NumberData.typeCode < 3 && this.state.NumberData.level === 0)
        return ( 
            <div className="table_div">
              <p>公司还未评选等级，不允许打分</p>
              <br/>
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
            </div>
             )
      if(this.state.NumberData.typeCode<3 && this.state.NumberData.level !== 0)
        return ( 
            <div className="table_div">
              <p>公司是第{this.state.NumberData.level}等公司，优秀人数{this.state.NumberData.excellentNum}人，良好人数{this.state.NumberData.goodNum}人，合格人数{this.state.NumberData.mediumNum}</p>
              <br/>
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
            </div>
            )
      else if(this.state.NumberData.typeCode >= 3 && this.state.NumberData.level !== 0)
         return ( 
        <div className="table_div">
          <p>公司属于其他机构，优秀，良好，合格人数固定</p>
          <br/>
        <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
        </div>
        )
        else return(
          <div className="table_div">
          <br/>
        <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
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
    RunScore: (score,scored,that) => {
        dispatch(actions.RunScore(score,scored))
        that.setState({
          b_loading:true
        })
    },
    ShowNumber: (studentId) => {
      dispatch(actions.ShowNumber(studentId))
    },
    ShowScore: (studentId) => {
      dispatch(actions.ShowScore(studentId))
    },
    ShowCompany: (studentId) => {
      dispatch(actions.ShowCompany(studentId))
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