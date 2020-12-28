import React, {useState, useEffect, useReducer, memo} from 'react'
import {Card, PageHeader, Button, Modal, Input, Radio, Divider, message, List, Checkbox} from "antd";
import {
  setPosition as requestSetPos,
  getMember,
  showAllCompany,
  voteForCompany,
  createCompany as createCompanyImpl
} from "../../../until/api/ceo";
import './position.scss'
import {Contain, con} from '../store'

const positions = [
  'ceo',
  '副总裁',
  '总裁'
]

const companyTypes = [
  '贸易公司',
  '制造企业',
  '物流企业',
  '银行',
  '会计事务所',
  '新闻机构',
  '工商局',
  '税务局'
]

// const mockData = [
//   {
//     "id": 985,
//     "ceoId": 0,
//     "userName": "甘雅婷",
//     "studentId": "2016211032",
//     "companyName": "第一贸易企业",
//     "position": "ceo",
//     "teacherId": "1",
//     "personalScore": 10,
//     "academy": "信息管理与信息系统"
//   }, {
//     "id": 991,
//     "ceoId": 0,
//     "userName": "魏雨欣",
//     "studentId": "2017210959",
//     "companyName": "第一贸易企业",
//     "position": null,
//     "teacherId": "1",
//     "personalScore": 10,
//     "academy": "信息管理与信息系统"
//   }
// ]

const reducer = (state, action) => {
  const {payload, type} = action
  switch (type) {
    case 'SET_COMPANY_STATE':
      return {
        ...state,
        companies: payload.object,
        companyTotal: payload.totalNumber,
        companyCurrentPage: payload.currentPage,
        pageSize: payload.pageSize
      }
    case 'SET_MEMBER_STATE':
      return {
        ...state,
        members: payload
      }
    case 'CHANGE_COMPANY_PAGE':
      return {
        ...state,
        companyCurrentPage: payload.currentPage
      }
    default:
      alert('违规操作!')
      return {...state}
  }
}

function Position(props) {
  const {userId} = props

  const [state, dispatch] = useReducer(reducer, {
    companies: [],
    companyCurrentPage: 0,
    companyTotal: 0,
    members: null
  })

  const [posValue, setPosValue] = useState(null)
  const [stuId, setStuId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMember(userId).then(
      // res => setMembers(res.data)
      res => {
        dispatch({
          type: 'SET_MEMBER_STATE',
          payload: res.data
          // payload: mockData
        })
      }
    )
    showAllCompany(userId, 0).then(
      res => {
        dispatch({
          type: 'SET_COMPANY_STATE',
          payload: res.data
        })
        setLoading(false)
      }
    )
  }, [])

  const [visible, setVisible] = useState(false)
  const [companyType, setCompanyType] = useState('')
  const [companyName, setCompanyName] = useState('')

  const updateMember = async () => {
    const res = await getMember(userId)
    if (res.flag) {
      dispatch({
        type: 'SET_MEMBER_STATE',
        payload: res.data
      })
    } else {
      message.warn(res.message)
    }
  }
  const openPosition = id => {
    setVisible(true)
    setStuId(id)
  }
  const setPosition = async () => {/* 选了职位之后刷新成员 */
    try {
      const res = await requestSetPos(userId, stuId, posValue)
      message.info(res.message)
      if (res.flag) {
        setVisible(false)
        updateMember(userId)
      }
    } catch (e) {
      message.warning(e)
    }
  }
  const voteCompany = (targetCeo) => {
    voteForCompany(userId, targetCeo).then(
      res => {
        message.info(res.message)
      },
      e => {
        message.warn(e.message)
      }
    )
  }
  const createCompany = async (userId) => {
    const res = await createCompanyImpl(userId, companyName, companyType)
    message.info(res.msg ? res.msg : res.message)
  }

  /* UI */
  const MyCompany = () => {

  }
  const Member = ({member}) => {
    return (
      <Card
        key={member.id}
        title={member.userName}
        hoverable={true}
        className="card"
      >
        <ul style={{
          listStyle: 'none',
          padding: '0'
        }}>
          <li> {member.companyName}</li>
          <li> {member.studentId}</li>
          <li>专业 {member.academy}</li>
          <li> {member.position || "无职位"}</li>
          <li>分数：{member.personalScore}</li>
        </ul>
        <Button
          type={"primary"}
          shape="round"
          onClick={openPosition.bind(null, member.id)}
        >设置</Button>
      </Card>
    )
  }
  const NoMember = () => {
    return (
      <Card
        className="card"
        loading={false}
        title="无成员"
      />
    )
  }
  const LoadingMember = () => {
    return (
      <Card
        className="card"
        loading={true}
        title="请稍等..."
      />
    )
  }
  const Company = ({company}) => {
    const {companyName, creatTime, type, ceoName, teachclass, ceo} = company
    return (
      <Card title={companyName} hoverable>
        <ul>
          <li>ceo: {ceoName}</li>
          <li>类别 {type}</li>
          <li>班级 {teachclass}</li>
          <li>创建于 {creatTime}</li>
        </ul>
        <Button type="primary" onClick={voteCompany.bind(null, ceo)}>
          为ta投票
        </Button>
      </Card>
    )
  }

  return (
    <Contain>
      <div>
        <PageHeader title="成员" subTitle="member"/>
        <div className="member">
          {
            state.members
              ? (
                state.members?.length
                  ? state.members.map(member => <Member key={member.id} member={member}/>)
                  : <NoMember/>
              )
              : <LoadingMember/>
          }
        </div>
        <Modal
          visible={visible}
          onCancel={() => {
            setVisible(false)
          }}
          footer={false}
        >
          <Radio.Group onChange={({target: {value}}) => {
            setPosValue(value)
          }}>
            <PageHeader
              title="职位"
              subTitle="position"
              style={{padding: '16px 0'}}
            />
            {
              positions.map(position => (
                <Radio.Button
                  buttonStyle="solid"
                  key={position}
                  value={position}
                  onChange={e => {
                    setPosValue(e.target.value)
                  }}
                >
                  {position}
                </Radio.Button>
              ))
            }
          </Radio.Group>
          <Divider/>
          <Button
            type="primary"
            shape="round"
            onClick={setPosition}
            disabled={!posValue}
          > 确 认 </Button>
        </Modal>

        <PageHeader title="所有公司" subTitle="all company"/>
        <List
          style={{padding: '15px'}}
          dataSource={state.companies || []}
          grid={{column: 4}}
          loading={loading}
          pagination={{
            pageSize: state.pageSize || 7,
            total: state.companyTotal || 0
          }}
          renderItem={(company, i) => {
            return <Company key={i} company={company}/>
          }}
        >
        </List>

        <PageHeader title="创建公司"/>
        <Card style={{margin: '15px'}}>
          <Input placeholder="公司名" onChange={e => setCompanyName(e.target.value)}/>
          公司类型：<Radio.Group onChange={({target: {value}}) => {
          setPosValue(value)
        }}>
          {
            companyTypes.map(type => (
              <Radio.Button
                buttonStyle="solid"
                key={type}
                value={type}
                onChange={e => {
                  setCompanyType(e.target.value)
                }}
              >
                {type}
              </Radio.Button>
            ))
          }
        </Radio.Group>
          <br/>
          <Button
            onClick={createCompany.bind(null, userId)}
            type="primary"> 创 建 </Button>
        </Card>
      </div>
    </Contain>
  )
}

export default Position
