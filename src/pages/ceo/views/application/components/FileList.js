import React, {useEffect, useReducer, useState, memo} from "react";
import {downloadFile, fetchFileList} from "../../../../../until/api/ceo";
import {Button, List, message} from "antd";

const fileReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_FILE':
      return {...state, loading: true}
    case 'FETCH_OK':
      return {...state, loading: false, list: action.payload}
    case 'FETCH_FAIL':
      return {...state, loading: false}
    default:
      return state
  }
}
/*可下载列表*/
const FileList = props => {
  const teacherClass = localStorage.getItem('class')

  const [currentPage, setPage] = useState(1)

  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    list: []
  })

  useEffect(() => {
    if (teacherClass) {
      fetchFileList(teacherClass, currentPage)
        .then(list => {
          if (list.length) {
            dispatch({
              type: 'FETCH_OK',
              payload: list
            })
          }
        }, e => {
          message.warn(e)
        })
    }
  }, [currentPage])

  const handleDownload = async (id) => {
    try {
      const res = await downloadFile(id)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <List
      size="small"
      style={{padding: '15px'}}
      dataSource={state.list}
      loading={state.loading}
      pagination={{
        onChange(pos) {
          setPage(pos)
        }
      }}
      renderItem={({fileName, id}, i) => {
        return (
          <li key={i} style={{padding: '15px'}}>
            <span>{fileName}</span>
            <Button type="primary" onClick={handleDownload.bind(null, id)}>下载</Button>
          </li>
        )
      }}
    />
  )
}

export default memo(FileList)
