import React, { Component,Fragment } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import   ManagerApi  from '../../../until/api/managerApi';
// import reqwest from 'reqwest';
import { InboxOutlined } from '@ant-design/icons';
import '../style/ImData.css';
class ImData extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      stuList: [],
      classList:[],
      uploadingStu: false,
      uploadingClass:false
    }
    this.handleUploadStu = this.handleUploadStu.bind(this);
    this.handleUploadClass = this.handleUploadClass.bind(this);

  }
  

  handleUploadStu = () => {
    const { stuList } = this.state;
    const formData = new FormData();

    let status = true;
    stuList.forEach(file => {
      formData.append('stufile', file);
    });

    
    this.setState({
      uploadingStu: true,
    });
    
    var ajax = new XMLHttpRequest()
    ajax.open("post", "http://120.79.207.60:8089/admin/stufile", true)
    ajax.onload = function () {
    console.log(ajax.responseText)
    }
    ajax.send(formData);
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4){
        if(ajax.status == 200){
          message.success("上传成功");
          status = true;
          
        }
      }
      else{
        message.error("上传失败")
      }
    }
    

    if (status == true) { 
      this.setState({
        uploadingStu: false,
        stuList:[]
      });

    }
  };

  handleUploadClass = () => {
    const { classList } = this.state;
    const formData = new FormData();
    let status = false;
    classList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploadingClass: true,
    });

    var ajax = new XMLHttpRequest()
    ajax.open("post", "http://120.79.207.60:8089/admin/file", true)
    ajax.onload = function () { 
    console.log(ajax.responseText)
    }
    ajax.send(formData);
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4){
        if(ajax.status == 200){
          message.success("上传成功");
          status = true;
          
        }


        
      }
      else{
        message.error("上传失败")
      }
    }
    
    if (status == true) { 
      this.setState({
        uploadingClass: false,
        classList:[]

      });
    }
    

  };

  
  render() {
    const { uploadingStu,uploadingClass, stuList,classList } = this.state;
    const stuprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.stuList.indexOf(file);
          const newstuList = state.stuList.slice();
          newstuList.splice(index, 1);
          return {
            stuList: newstuList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          stuList: [...state.stuList, file],
        }));
        return false;
      },
      stuList,
    };
    const classprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.classList.indexOf(file);
          const newclassList = state.classList.slice();
          newclassList.splice(index, 1);
          return {
            classsList: newclassList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          classList: [...state.classList, file],
        }));
        return false;
      },
      classList,
    };
    return (
      <>
        <div id="div">
          <div className="StuInfo">
              <Upload {...stuprops}>
                  <Button icon={<UploadOutlined />} className="button">导入学生信息</Button>
              </Upload>
              <Button
                    onClick={this.handleUploadStu}
                    disabled={stuList.length === 0  || stuList.length>1}
                    loading={uploadingStu}
                    style={{ marginTop: 16 }}
                  >
                    {uploadingStu ? '上传中' : '开始上传'}
              </Button>
          </div>
          <div className="StuInfo">
              <Upload {...classprops}>

                  <Button icon={<UploadOutlined />} className="button">导入教学班信息</Button>
              </Upload>
              <Button
                    onClick={this.handleUploadClass}
                    disabled={classList.length === 0  || classList.length>1}
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
