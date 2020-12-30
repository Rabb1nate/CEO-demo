import React, {useState} from 'react'
import {Modal} from "antd";

const WithModal = (props) => {
  const {render, children} = props
  const [visible, setVisible] = useState(false)
  const cancel = () => {
    setVisible(false)
  }
  return (
    <>
      {
        render({
          onClick: setVisible.bind(null, true)
        }, cancel)
      }
      <Modal
        visible={visible}
        onCancel={setVisible.bind(null, false)}
        footer={null}
      >
        <div style={{padding: '30px'}}>
          {children}
        </div>
      </Modal>
    </>
  )
}

export default WithModal
