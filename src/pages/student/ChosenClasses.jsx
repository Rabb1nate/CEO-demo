import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination, message , Empty } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import '../../static/style/style.scss'
class ChosenClasses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage:parseInt(sessionStorage.getItem("Page1"))||1,
            loading:true,
            data : [],
         }
        //  this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      // this.setState()
      if(newProps!==this.props){
        try{
          if(newProps.isVoteForCompany === true )
          message.success("投票成功")
          if(newProps.message){
            if(newProps.isVoteForCompany === false )
            message.error(newProps.message)
          }
          const {CompanyData} = newProps
          let newdata = CompanyData.object
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page1"))||1,
            data:newdata,
            loading:false,
          })
        }
        catch{}
      }
    }
    componentDidMount() {
      if(localStorage.getItem("userId") && !this.props.CompanyData){
        this.props.getAllCompanies(localStorage.getItem("userId"))
      }
      if(this.props.CompanyData){
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
        this.setState({
            currentPage: page,
        })


        changePage(1,page)
    }
    render() { 
      const pagination = {
        hideOnSinglePage:true,
    }
      const columns = [
        {
            title: '票数',
            dataIndex: 'count',
            key: 'count',
        },
          {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
          },
        {
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: '姓名',
            key: 'ceoName',
            dataIndex: 'ceoName',
        },
        {
          title: 'CEOID',
          key: 'ceo',
          dataIndex: 'ceo',
      },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.props.VoteForCompany.bind(this,localStorage.getItem("userId"),record.ceo)}>投票</a>
            </Space>
          ),
        },
      ]
      if(localStorage.getItem("userId"))
        return (
          <div className="table_div">
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
            </div>
             )
      else return(
        <div className="table_div">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>请登录后查看</Empty>
        </div>
      )

    } 
}
 
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompanies: (userId, page) => {
      dispatch(actions.getAllCompanies(userId))
    },
    VoteForCompany: (studentId,ceoId) => {
      dispatch(actions.VoteForCompany(studentId,ceoId))
    },
    Exist: () => {
      dispatch(actions.Exist())
    },
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenClasses)