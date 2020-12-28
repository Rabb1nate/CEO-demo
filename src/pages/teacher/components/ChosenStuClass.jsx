import React, { Component } from "react";
import { Table } from 'antd'; 
import {selectedClassTeacher} from "../../../until/api/teacherApi";

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
  {
    title: 'age',
    dataIndex: 'age',
    key: 'ag',
  },{
    title: 'age',
    dataIndex: 'age',
    key: 'ae',
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
];

class ChosenStuClass extends Component{
    constructor(prop){
      super(prop);
      this.state = {
        contentList:""
      }
    }
    render() {
        return (
        <div>
            <Table dataSource={this.state.contentList} columns={columns} rowkey={this.state.contentList.teachclass}/>
        </div>
  );
};

    componentDidMount(){
      let repro = selectedClassTeacher("1","1");
      repro.then((res) => {
        this.setState(
          this.state.contentList = res.data.data
        )
        console.log(res.data.data);
      },(err) => {
        console.log(err);
      })

      console.log(repro);
    }
}

export default ChosenStuClass;