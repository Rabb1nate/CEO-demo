import React, { Component,Fragment } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import baseurl from '../../../until/BaseUrl';
import axios from 'axios';
import '../style/ImData.css';


class ImData extends Component {
  constructor(props) { 
    super(props);
    this.state = {

      classList:[],
      uploadingClass:false
    }
    this.handleUploadClass = this.handleUploadClass.bind(this);
    this.handleStatusClass = this.handleStatusClass.bind(this);
    this.Ajax = this.Ajax.bind(this);
  }

  Ajax (type, url, formData){
    let status = false;
    axios({
      method: 'post',
      url: url,
      data: formData,
      processData: false,
      contentType:false
    }).then(
      (result) => {
        console.log(result);

        if (result.data.flag == true) {
          console.log('上传成功！');
          message.success("上传成功");
          status = true;
        }
        else if (result.data.flag == false) {
          console.log('上传失败');
          message.error('上传失败！');
        }
      }
    ).then(() => {
      if (type == 0) {
        this.handleStatusStu(status);
      }
      else if (type == 1) {
        this.handleStatusClass(status);
      }
    })

  }


  handleUploadClass = () => {
    const { classList } = this.state;
    const formData = new FormData();
    classList.forEach(file => {
      formData.append('file', file);
    });
    this.setState({
      uploadingClass: true
    })
    this.Ajax(1, baseurl + '/admin/file', formData);
  }
    

  handleStatusClass = (status) => { 
    console.log(status);
    if (status == true) { 
      this.setState({
        uploadingClass: false,
        classList:[]
      })
    }
    
  }
  
  IsDisabled = () => { 
    if (this.state.classList.length == 0) {
      console.log(this.state.classList.length);
      return true;
    }
    else if (this.state.classList.length > 1) {
      console.log(this.state.classList.length);
      message.warning('只能上传一份文件');
      return true;
    }
    
  }
  render() {
    const { uploadingClass,classList } = this.state;
    const classprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.classList.indexOf(file);
          const newclassList = state.classList.slice();
          newclassList.splice(index, 1);
          return {
            classList: newclassList,
          };
        });
       
      },
      beforeUpload: file => {
        console.log(this.state.classList)
        this.setState(state => ({
          classList: [...state.classList, file],
        }));
        this.IsDisabled();
        return false;
      },
      // classList,
    };
    
    return (
      <>
        <div>
          <div>
              <span className="Nav-top">导入数据</span>
          </div>
          <div className="StuInfo">
              <Upload {...classprops}>
                  <Button icon={<UploadOutlined />} className="button">更新学生信息</Button>
              </Upload>
              <Button
                    onClick={this.handleUploadClass}
                    disabled={this.IsDisabled()}
                    loading={uploadingClass}
                    style={{ marginTop: 16 }}
                  >
                    {uploadingClass ? '上传中' : '开始上传'}
              </Button>
          </div> 
        </div>
        
      </>
    );
  }
}

export default ImData;
