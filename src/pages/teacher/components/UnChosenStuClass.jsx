import React, { Component } from "react";
import { Table } from 'antd'; 
import {unSelectedClassTeacher} from '../../../until/api/teacherApi.js';


const columns = [
  {
    title: 'teachclass',
    dataIndex: 'teachclass',
    key: 'teachclass',
  },
  {
    title: 'age',
    dataIndex: 'age',
    key: 'age',
  },
];

const dataSource = [
  {
    key: '1',
    teachclass: 42342,
    age: 32,
  },
  {
    key: '2',
    teachclass: 12445,
    age: 42,
  },
  {
    key: '3',
    teachclass: 15432445,
    age: 42,
  },
  {
    key: '4',
    teachclass: 12434245,
    age: 42,
  },
  {
    key: '5',
    teachclass: 11232445,
    age: 42,
  },
];

class UnChosenStuClass extends Component{
    constructor(prop){
      super(prop);
      this.state = {
        contentList : ''
      }
    }
    render() {
        return (
        <div>
            <Table dataSource={this.state.contentList} columns={columns} rowKey={this.state.contentList.teachclass}/>
        </div>
        );
    };

    componentWillMount(){
        let repro = unSelectedClassTeacher("1","79")
        console.log(repro.then((res)=>{
          this.setState(
            this.state.contentList = res.data.data
          )
          console.log(res.data.data);
        },(err) => {
          console.log(err);
        }));
    }
}

export default UnChosenStuClass;