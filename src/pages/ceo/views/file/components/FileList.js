import React, {useEffect, useReducer, useState, memo} from "react";
import {downloadFile, fetchFileList, deleteFile} from "../../../../../until/api/ceo";
import {Button, List, message, Table} from "antd";
import Confirm from "../../../components/Comfirm";

const mockData = [
  {
    "fileName": "新建文本文档.txt",
    "filePath": "1",
    "id": 1,
    "studentId": "2016211032",
    "teachclass": "SJ00201A2031780003"
  }
]


const fileReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_FILE':
      return {...state, loading: true}
    case 'FETCH_OK':
      const list = action.payload?.map((item, i) => item.key = i)
      return {...state, loading: false, list}
    case 'FETCH_FAIL':
      return {...state, loading: false}
    default:
      return state
  }
}
/*可下载列表*/
const FileList = props => {
  const {userId, teachclass} = props

  const [currentPage, setPage] = useState(1)

  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    list: []
  })

  useEffect(() => {
    if (teachclass) {
      fetchFileList(teachclass, currentPage)
        .then(list => {
          dispatch({
            type: 'FETCH_OK',
            payload: list
          })
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
  const handleDelete = async (id) => {
    const res = await deleteFile(id)
    console.log(res)
  }
  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
    }, {
      title: '学生id',
      dataIndex: 'studentId',
      key: 'studentId',
    }, {
      title: '班级',
      dataIndex: 'teachclass',
      key: 'teachclass',
    }, {
      title: '下载/删除',
      dataIndex: 'download',
      key: 'download',
      render(_, {studentId, id}) {
        console.log(studentId)
        return (
          <div>
            <Confirm render={
              (onClick, onOk) => {
                onOk(downloadFile.bind(null, id))
                return (<a onClick={onClick}>下载</a>)
              }
            }/>
            {
              studentId === userId
                ? (<a onClick={handleDelete.bind(null, id)}>删除</a>) : null
            }
          </div>
        )
      }
    }
  ]

  return (
    <>
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

      <Table
        style={{
          margin: '15px'
        }}
        dataSource={state.list}
        columns={columns}
      />
    </>
  )
}

export default memo(FileList)
