import React, {memo} from 'react'
import {Table} from "antd";

const MyTable = props => {
  const {columns, dataSource} = props
  return (
    <Table
      style={{
        margin: '15px'
      }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default MyTable
