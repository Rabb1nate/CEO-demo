import React from 'react'
import {withRouter} from 'react-router-dom'
import {message, Button} from 'antd'
import LoginApi from '../../../until/api/LoginApi'

const WelcomeTitle = props => {
  let {userName, userId} = props
  if (!userName) {
    userName = localStorage.getItem('userName')
    if (!userName) {
      props.history.replace('/')
    }
  }

  const exit = async () => {
    const res = await LoginApi.Exit(userId)
    message.info(res.data.message)
    if (res.data.flag) {
      localStorage.clear()
      window.location.replace('/')
    }
  }

  return (
      <div
        style={{
          padding: '15px',
          color: '#fff'
        }}
      >
        <span style={{fontSize: '17px', marginLeft: '10px'}}>CEO  {userName}</span>
        <Button onClick={exit} type="primary">退出登陆</Button>
      </div>
  )
}
export default (withRouter(WelcomeTitle))
