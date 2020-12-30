import React, {memo, useEffect, useReducer} from 'react'

import {showApplication, agreeApplication} from "../../../../until/api/ceo";
import Lists from "../../components/Lists";
import FileList from '../file/components/FileList'
import ApplicationItem from "./components/ApplicationItem";
import Uploader from "../file/components/Uploader";
import {Card, PageHeader, List, message} from "antd";
import {PAGE_SIZE, SET_PAGE, INIT_PAGE, SET_CURR_PAGE, LOADING, MARK_STATE} from "./consts/constants";
import './style/application.scss'
import MyTable from "../../components/MyTable";

const reducer = (state, {type, payload}) => {
  switch (type) {
    case LOADING:
      return {...state, loading: true}
    case SET_PAGE:
      return {
        ...state,
        loading: false,
        data: payload.data
      }
    case SET_CURR_PAGE:
      return {...state, currentPage: payload, loading: false}
    case INIT_PAGE:
      payload.object?.forEach((item, i) => item.key = i)
      return {
        ...state,
        total: payload.totalNumber,
        loading: false,
        data: payload.object,
        pageSize: payload.pageSize || PAGE_SIZE
      }
    case MARK_STATE:
      const newState = state.slice()
      newState.data[payload] = '已同意'
      return {...state, state: newState}
  }
}

function Application(props) {
  const {userId, teachclass} = props
  const [state, dispatch] = useReducer(reducer, {
    currentPage: 0,
    loading: true,
    data: [],
    pageSize: 0,
  })

  useEffect(() => {
    showApplication(0, userId).then(
      res => {
        if (!res.flag) return
        dispatch({
          type: INIT_PAGE,
          payload: res.data
        })
      }
    )
  }, [])

  const handleAgree = async (studentId, companyName, idx) => {
    const res = await agreeApplication(userId, studentId, companyName)
    if (res && res.flag) {
      message.success('已同意')
      dispatch({
        type: MARK_STATE,
        payload: idx
      })
    } else {
      message.info(res.message || "请求失败")
    }
  }
  return (
    <div>
      <PageHeader title="所有申请"/>
      {/*<Lists*/}
      {/*  dataSource={state.data}*/}
      {/*  render={item => (*/}
      {/*    <Card*/}
      {/*      hoverable*/}
      {/*      style={{margin: '10px'}}*/}
      {/*      title={item.companyName || '无名'}*/}
      {/*    >*/}
      {/*      <List.Item>*/}
      {/*        <ApplicationItem handleAgree={handleAgree} info={item}/>*/}
      {/*      </List.Item>*/}
      {/*    </Card>*/}
      {/*  )}*/}
      {/*/>*/}
      <MyTable
        dataSource={state.data}
        columns={[
          {
            title: '申请人',
            dataIndex: 'studentName'
          }, {
            title: '学院',
            dataIndex: 'academy'
          }, {
            title: '状态',
            dataIndex: 'state',
            render(text, record) {
              const {state} = record
              return (
                <span
                  className={state === '已同意' ? 'status pass' : 'status'}
                >{state}</span>
              )
            }
          }, {
            title: '班级',
            dataIndex: 'teachclass'
          }, {
            title: '操作',
            dataIndex: 'action',
            render(text, record) {
              const {studentId, companyName, state} = record
              return (
                state !== '已同意'
                  ? <a onClick={handleAgree.bind(null, studentId, companyName)}>同意</a>
                  : <span>已同意</span>
              )
            }
          }
        ]}
      />
    </div>
  )
}

export default memo(Application)
