import React, {useState, memo} from "react";
import {Button, Input, message} from "antd";
import {changeCompanyName} from '../../../../../until/api/ceo';
import WithModal from "../../../components/WithModal";

const MyCompany = props => {
  let {companyName} = props
  const userId = localStorage.getItem('userId')
  const [name, setName] = useState('')
  const changeName = async () => {
    const res = await changeCompanyName(userId, name).catch(e => {
      console.log('网络异常')
    })
    if (res.data.flag) {
      message.success('修改成功')
    } else {
      message.info('遇到错误' + res.message || '')
    }
  }
  return (
    <div>
      <span className="my-company">{companyName}</span>
      <WithModal render={(props) => <Button {...props} className="rename-btn" type="primary">改名</Button>}>
        <span>输入公司名</span>
        <Input onChange={e => setName(e.target.value)}/>
        <Button onClick={changeName} type="primary" style={{marginLeft: '0'}}>确认</Button>
      </WithModal>
    </div>
  )
}
export default memo(MyCompany)
