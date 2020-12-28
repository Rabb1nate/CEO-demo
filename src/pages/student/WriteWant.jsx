import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button , Empty , message} from 'antd'
import actions from '../../redux/actionCreators/creators'
import { connect } from 'react-redux'
import { Select } from 'antd';
const { Option } = Select;

class WriteWant extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
            data:[],
         }
    }

    
      onChange1 = e => {
        this.setState({
          value1: e,
        })
      }
      onChange2 = e => {
        this.setState({
          value2: e,
        })
      }
      onChange3 = e => {
        this.setState({
          value3: e,
        })
      }
      onChange4 = e => {
        this.setState({
          value4: e,
        })
      }
      onChange5 = e => {
        this.setState({
          value5: e,
        })
      }
      onChange6 = e => {
        this.setState({
          value6: e,
        })
      }
      SubmitApplication = () => {
          let applications = new Array()
          let flag = true
          for(let i = 1 ; i <= 6 ; i ++){
            if(!this.state['value'+i])
            flag = false
          }
          if(flag === true){
            for(let i = 1 ; i <= 6 ; i ++){
              applications.push({
                  studentId:localStorage.getItem("userId"),
                  companyName:this.state['value'+i],
                  level:i
              })
          }
          this.props.AddApplication(applications)
          }
        else{
          message.error("请补全信息")
        }
      }
      UNSAFE_componentWillUpdate(newProps,newState){
        // this.setState()
        if(newProps!==this.props){
          try{
            if(newProps.message){
              if(newProps.isAddApplication === true )
              message.success(newProps.message)
              if(newProps.isAddApplication === false )
              message.error(newProps.message)
            }
            if(!newProps.message && newProps.isAddApplication === true){
                message.success("申请成功")
            }

                const {CompanyData} = newProps
                let newdata = CompanyData.object
                for (let item in newdata){
                    newdata[item].key = item
                  }
                this.setState({
                  data:newdata
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
      render() {
          const data = this.state.data
        if(localStorage.getItem("userId"))
        return (
        <div className="table_div">
            <div style={{ marginTop: 50 }}>
                <div>
                <Select
                showSearch
                style={{ width: 200 }}
                onChange={this.onChange1}
                placeholder="第一志愿"
                >
         {data.map(function (Val,Index)  {
            return (
                <Option value={Val.companyName} key={Val.ceoName} style={{ height: 40 }}>{Val.companyName}</Option>
            )})}
            </Select>
            </div>,
            <div>
                <Select
                showSearch
                style={{ width: 200 }}
                onChange={this.onChange2}
                placeholder="第二志愿"
                >
         {data.map(function (Val,Index)  {
            return (
                <Option value={Val.companyName} key={Val.ceoName} style={{ height: 40 }}>{Val.companyName}</Option>
            )})}
            </Select>
            </div>,
            <div>
                <Select
                showSearch
                style={{ width: 200 }}
                onChange={this.onChange3}
                placeholder="第三志愿"
                >
         {data.map(function (Val,Index)  {
            return (
                <Option value={Val.companyName} key={Val.ceoName} style={{ height: 40 }}>{Val.companyName}</Option>
            )})}
            </Select>
            </div>,
            <div>
                <Select
                showSearch
                style={{ width: 200 }}
                onChange={this.onChange4}
                placeholder="第四志愿"
                >
         {data.map(function (Val,Index)  {
            return (
                <Option value={Val.companyName} key={Val.ceoName} style={{ height: 40 }}>{Val.companyName}</Option>
            )})}
            </Select>
            </div>,
            <div>
                <Select
                showSearch
                style={{ width: 200 }}
                onChange={this.onChange5}
                placeholder="第五志愿"
                >
         {data.map(function (Val,Index)  {
            return (
                <Option value={Val.companyName} key={Val.ceoName} style={{ height: 40 }}>{Val.companyName}</Option>
            )})}
            </Select>
            </div>,
            <div>
                <Select
                showSearch
                style={{ width: 200 ,marginBottom: 50}}
                onChange={this.onChange6}
                placeholder="第六志愿"
                >
         {data.map(function (Val,Index)  {
            return (
                <Option value={Val.companyName} key={Val.ceoName} style={{ height: 40 }}>{Val.companyName}</Option>
            )})}
            </Select>
            </div>,
                <Button type="primary" size="middle" onClick={this.SubmitApplication}>提交</Button>
                </div>
                </div>
                )
                else 
                return (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>请登录后查看</Empty>
                )
            }
        }
const mapDispatchToProps = (dispatch) => {
    return {
      AddApplication: (applications) => {
        dispatch(actions.AddApplication(applications))
      },
      getAllCompanies: (userId) => {
        dispatch(actions.getAllCompanies(userId))
      },
      Exist: () => {
        dispatch(actions.Exist())
      },
    }
  }
  const mapStateToProps = state => {
    return state
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteWant))