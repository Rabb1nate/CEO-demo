import React, {useState, memo} from 'react'
import {Modal} from "antd";

const {confirm} = Modal

const Confirm = (props) => {
  const {render, text="你确定吗"} = props
  const [okCallback, setOkCallback] = useState(null)
  const onOk = (fn) => {
    okCallback || setOkCallback(() => fn)
  }
  const showConfirm = () => {
    confirm({
      title: text,
      okText: '确定',
      cancelText: '取消',
      onOk: okCallback
    });
  }
  return (
    <>
      {render(showConfirm, onOk)}
    </>
  )
}
export default memo(Confirm)
