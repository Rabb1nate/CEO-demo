import {Button, Card} from "antd";
import React, {memo} from "react";
import {voteForCompany} from "../../../../../until/api/ceo";

const voteCompany = async (userId, targetCeo) => {
  const res = await voteForCompany(userId, targetCeo)
  console.log(res)
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
      <Button
        style={{margin: '10px 0'}}
        type="primary" onClick={voteCompany.bind(null, userId, ceo)}
      >
        为ta投票
      </Button>
    </Card>
  )
}

export default memo(CompanyItem)
