import React, {useState, memo, useEffect} from "react";
import {Button, Input, message} from "antd";
import {changeCompanyName} from '../../../../../until/api/ceo';
import WithModal from "../../../components/WithModal";
import {companyInfo} from "../../../../../until/api/ceo";
import {connect} from 'react-redux'

let cancel = () => {}

const MyCompany = (props) => {
  console.log(props)
  const {hasCompany, setHasCompany} = props
  const userId = localStorage.getItem('userId')

  const [info, setInfo] = useState(null)
  const [name, setName] = useState('')

  useEffect(() => {
      companyInfo(userId)
        .then(
          res => {
            if (!res.flag) {
              message.info(res.message || '数据库异常')
              return
            }
            if (!res.data) {
              setHasCompany(false)
              return
            }
            setHasCompany(true)
            const {companyName, creatTime, studentNum} = res.data
            setInfo({
              companyName,
              creatTime,
              studentNum,
            })
          }
        )
    }, []
  )

  const changeName = async () => {
    if (name.length > 10) {
      message.info("公司名字最长不超过10个汉字")
      return
    }
    const res = await changeCompanyName(userId, name.trim()).catch(e => {
      console.log('网络异常')
    })
    cancel()
    if (!res) {
      return
    }
    if (res.data.flag) {
      message.success('申请成功')

    } else {
      message.info('遇到错误' + res.message || '')
    }
  }
  return (
    <div>
      <div className="my-company">
        {
          info
            ? (
              <div className="flex_grid">
                <div>
                  <div className="item">
                    <span className="dscr">
                      公司名
                    </span>{info.companyName}</div>
                  <div className="item">
                    <span className="dscr">创建于</span>
                    {info.creatTime}</div>
                </div>
                <div>
                  <div className="item">
                    <span className="dscr">
                      成员数
                    </span>{info.studentNum}</div>
                </div>
              </div>
            )
            : (
              '暂无'
            )
        }
      </div>
      <WithModal
        render={
          (props, _cancel) => {
            cancel = _cancel
            return (
              hasCompany ? <Button {...props} type="primary">申请改名</Button> : <></>
            )
          }
        }
      >
        <span>输入公司名</span>
        <Input onChange={e => setName(e.target.value)}/>
        <Button onClick={changeName} type="primary" style={{marginLeft: '0'}}>确认</Button>
      </WithModal>
    </div>
  )
}
export default connect(
  state=>({hasCompany: state.hasCompany}),
  dispatch=>({
    setHasCompany(bool) {
      dispatch({
        type: 'SET_HAS_COMPANY',
        payload: bool
      })
    }
  })
)(MyCompany)
