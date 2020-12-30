import React from 'react'
import {withRouter} from 'react-router-dom'
import {message, Button} from 'antd'
import LoginApi from '../../../until/api/LoginApi'
import Confirm from "./Comfirm";

const WelcomeTitle = props => {
  let {userName, userId, history} = props
  if (!userName) {
    userName = localStorage.getItem('userName')
  }

  const exit = async () => {
    const res = await LoginApi.Exit(userId)
    message.info(res.data.message)
    if (res.data.flag) {
      localStorage.clear()
      history.replace('/')
    }
  }

  return (
    <div
      style={{
        color: '#1890ff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{fontSize: '17px', textAlign: 'center'}}>CEO {userName}</div>
      <Confirm
        render={
          (onClick, onOk) => {
            onOk(exit)
            return (
              <Button onClick={onClick} type="primary" style={{
                fontSize: '12px',
                margin: '10px',
              }}>退出登陆</Button>
            )
          }
        }
      >

      </Confirm>
    </div>
  )
}
export default (withRouter(WelcomeTitle))
