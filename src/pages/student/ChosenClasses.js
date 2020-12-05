import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination, message } from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import '../../static/style/style.scss'
// const columns = [
//     {
//       title: 'count',
//       dataIndex: 'count',
//       key: 'count',
//     },
//     {
//       title: 'type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'companyName',
//       dataIndex: 'companyName',
//       key: 'companyName',
//     },
//     {
//       title: 'ceoName',
//       key: 'ceoName',
//       dataIndex: 'ceoName',

//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <a>Invite {record.name}</a>
//           <a>Delete</a>
//         </Space>
//       ),
//     },
//   ];

class ChosenClasses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage:parseInt(sessionStorage.getItem("Page1"))||"1",
            data : [
              ],
         }
        //  this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      // this.setState()
      if(newProps!==this.props){
        try{
          if(newProps.message){
            if(newProps.isVoteForCompany === true )
            message.success(newProps.message)
            if(newProps.isVoteForCompany === false )
            message.error(newProps.message)
          }
          const {data} = newProps
          let newdata = data.object
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page1"))||'1',
            data:newdata
          })
        }
        catch{
          console.log("error")
        }
      }
    }
    componentDidMount() {
      //如果要获取数据，最好在这里进行，组件在render之前不会返回数据
      if(localStorage.getItem("userId")){
        this.props.getAllCompanies(localStorage.getItem("userId"))
      }
      this.setState()
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
        // this.props.getAllCompanies(localStorage.getItem("userId"),page)
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            // data:newdata
        })


        changePage(1,page)
    }
    render() { 

      const columns = [
        {
            title: 'count',
            dataIndex: 'count',
            key: 'count',
        },
          {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
          },
        {
            title: 'companyName',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'ceoName',
            key: 'ceoName',
            dataIndex: 'ceoName',
        },
        {
          title: 'ceoId',
          key: 'ceo',
          dataIndex: 'ceo',
      },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.props.VoteForCompany.bind(this,localStorage.getItem("userId"),record.ceo)}>为{record.companyName}投票</a>
            </Space>
          ),
        },
      ]
        return ( 
          <div className="table_div">
            <Table columns={columns} dataSource={this.state.data}/>
            </div>
             )

    } 
}
 
const mapDispatchToProps = (dispatch) => {
  //把发送action的方法绑定到当前组件的props
  return {
    getAllCompanies: (userId, page) => {
      dispatch(actions.getAllCompanies(userId,page))
    },
    VoteForCompany: (studentId,ceoId) => {
      dispatch(actions.VoteForCompany(studentId,ceoId))
    }
  }
}
const mapStateToProps = state => {
  //把store里的state绑定到当前组件的props
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenClasses)