import React, {useState, useEffect, useRef} from 'react'
import {Button, message, Upload} from 'antd'
import {uploadPPT} from "../../../../../until/api/ceo";
import isPPT from "../../../../../until/api/isPPT";
import {UploadOutlined} from '@ant-design/icons';

export default (props) => {
  let {userId, teachclass} = props
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const handleUpload = async () => {
    let file
    console.log(fileRef.current.files[0])
    if (!(file = fileRef.current?.files?.[0])) {
      message.info("请选择文件")
      return
    }
    if (!isPPT(file.name)) {
      message.info("请选择ppt文件")
      return
    }
    setFile(file)
  }
  const upload = async () => {
    if (!file || !isPPT(file.name)) {
      message.info("请选择ppt文件")
      return
    }
    const fd = new FormData()
    fd.append('file', file)
    if (!userId) userId = localStorage.getItem('userId')
    fd.append('studentId', userId)
    if (!teachclass) teachclass = localStorage.getItem('class')
    fd.append('teachclass', teachclass)

    const res = await uploadPPT(fd)
    if (!res) {
      message.warn('数据库异常')
      return
    }
    if (res.flag) {
      message.success('上传成功')
      window.location.reload()
    } else {
      message.warn(res.message || "数据库异常")
    }
  }
  return (
    <div style={{margin: '15px'}}>
      <div style={{
        height: '100%'
      }}>
        <label className="upload-btn">
          {file?.name ? file?.name : '选择文件'}
          <input
            ref={fileRef}
            style={{
              visibility: 'hidden',
              width: '0'
            }}
            type="file"
            onChange={handleUpload}
          />
        </label>
        <Button type="primary" onClick={upload}>上传</Button>
      </div>
    </div>
  )
}
