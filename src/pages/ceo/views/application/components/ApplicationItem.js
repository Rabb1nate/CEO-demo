import {Button} from "antd";
import React, {memo} from "react";

const ApplicationItem = (props) => {
  const {handleAgree, info} = props
  return (
    <>
      <ul style={{
        listStyle: 'none',
        padding: '0'
      }}>
        <li> {info.studentName}</li>
        <li> {info.studentId}</li>
        <li>专业 {info.academy}</li>
        <li> {info.position || "无职位"}</li>
        <li>状态：{info.state}</li>
        <li>班级id：{info.teachclass}</li>
      </ul>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {
          info.state === '等待中'
            ? (
              <>
                <Button
                  type="primary" shape="round"
                  onClick={handleAgree.bind(null, info.studentId, info.companyName)}
                >同意</Button>
              </>
            )
            : <div className="status pass">已同意</div>
        }
      </div>
    </>
  )
}
export default memo(ApplicationItem)
