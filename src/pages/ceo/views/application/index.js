import React, {memo, useEffect, useReducer, useState} from 'react'

import {showApplication, agreeApplication, downloadFile, fetchFileList} from "../../../../until/api/ceo";

import FileList from './components/FileList'
import ApplicationItem from "./components/ApplicationItem";

import {Card, PageHeader, Button, List, message} from "antd";
import {PAGE_SIZE, SET_PAGE, INIT_PAGE, SET_CURR_PAGE, LOADING} from "./consts/constants";
import './style/application.scss'

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
      return {
        ...state,
        total: payload.totalNumber,
        loading: false,
        data: payload.object,
        pageSize: payload.pageSize || PAGE_SIZE
      }
  }
}

function Application(props) {
  const {userId} = props
  const [state, dispatch] = useReducer(reducer, {
    currentPage: 0,
    loading: true,
    data: [],
    pageSize: 0,
    fileList: []
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

  const handleAgree = (studentId, companyName) => {
    agreeApplication(userId, studentId, companyName)
  }
  console.log(state)
  return (
    <div>
      <PageHeader title="所有申请" subTitle="all application"/>
      <List
        dataSource={state.data}
        grid={{column: 4}}
        loading={state.loading}
        pagination={{
          pageSize: state.pageSize || 8,
          total: state.total,
        }}
        renderItem={item => (
          <Card
            hoverable
            style={{margin: '10px'}}
            title={item.companyName || '无名'}
          >
            <List.Item>
              <ApplicationItem handleAgree={handleAgree} info={item}/>
            </List.Item>
          </Card>
        )}
      />

      <PageHeader title="文件"/>
      <FileList list={state.fileList}/>
    </div>
  )
}

export default memo(Application)
