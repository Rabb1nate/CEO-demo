import {Button, Card} from "antd";
import React, {memo} from "react";
import {voteForCompany} from "../../../../../until/api/ceo";
import {message} from "antd";
import Comfirm from "../../../components/Comfirm";

const voteCompany = async (userId, targetCeo) => {
  const res = await voteForCompany(userId, targetCeo)
  if (!res) return
  if (res.flag) {
    message.success('投票成功')
  } else {
    message.warn(res.message)
  }
}

const CompanyItem = (props) => {
  const {company, userId} = props
  const {companyName, creatTime, type, ceoName, teachclass, ceo} = company
  return (
    <Card title={companyName} hoverable>
      <ul>
        <li>ceo: {ceoName}</li>
        <li>类别 {type}</li>
        <li>班级 {teachclass}</li>
        <li>创建于 {creatTime}</li>
      </ul>
      <Comfirm
        text="你确定吗，一个人只能投一次票"
        render={
          (open, onOk) => {
            onOk(voteCompany.bind(null, userId, ceo))
            return (
              <Button
                type="primary"
                style={{margin: '10px 0'}}
                onClick={open}>
                为TA投票
              </Button>
            )
          }
        }
      />
    </Card>
  )
}

export default memo(CompanyItem)
