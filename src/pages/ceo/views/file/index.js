import React, {useReducer, useEffecet, memo} from 'react'
import {PageHeader} from "antd";
import FileList from "./components/FileList";
import Uploader from "./components/Uploader";
import {fetchFileList} from "../../../../until/api/ceo";

const reducer = (state, action) => {
  const {type, payload} = action

  switch (type) {
    case 'SET_FILE_LIST':
      return {...state, fileList: payload}
  }
}

const File = props => {

  return (
    <>
      <PageHeader title="文件"/>
      <FileList {...props}/>

      <PageHeader title="上传文件"/>
      <Uploader {...props}/>
    </>
  )
}

export default memo(File)
