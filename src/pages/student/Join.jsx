import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table,  Empty} from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import changeNav from '../../until/changeNav'
import '../../static/style/style.scss'

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page3"))||1,
            loading:true,
            data : [
              ],
         }
         this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if(newProps.isShowApplication===true){
            this.setState({
              loading:false
            })
          }
          else if(newProps.isShowApplication===false){
            this.setState({
              loading:false
            })
          }
          const {ApplicationData} = newProps
          let newdata = ApplicationData.object
          for (let item in newdata){
            newdata[item].key = item
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page3"))||1,
            data:newdata,
            totalNum:ApplicationData.totalNumber,
          })
        
        }
        catch{}
      }
    }
    componentDidMount() {
      if(localStorage.getItem("userId") && !this.props.ApplicationData){
        this.props.ShowApplication(parseInt(sessionStorage.getItem("Page3"))||1,localStorage.getItem("userId"))
      }
      if(this.props.ApplicationData){
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
        this.props.ShowApplication(page,localStorage.getItem("userId"))
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            // data:newdata
        })
        changePage(3,page)
    }
    render() { 
      changeNav(1, 1)
      const columns = [
        {
            title: '志愿等级',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '学号',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '专业',
            dataIndex: 'academy',
            key: 'academy',
        },
        {
            title: '公司名',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: (text) => {
                return(<p>{text}</p>)
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
    ShowApplication: (page,studentId) => {
        dispatch(actions.ShowApplication(page,studentId))
    },
    Exist: () => {
      dispatch(actions.Exist())
    },
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)