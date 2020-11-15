import Service from "../Service";

/*展示所有老师已经选择过的班级*/
function selectedClassTeacher(teacherId, currentPage) {
  return Service.get('/teacher/exitclass', {
    params: {
      teacherId,
      currentPage
    }
  })
}

/*老师选择班级时展示的没有选择的班级，选择了的不会出现在这里面*/
function unSelectedClassTeacher(teacherId, currentPage) {
  return Service.get('/teacher/allclass', {
    params: {
      teacherId,
      currentPage
    }
  })
}

/*
老师批量选择的班级
可以传集合，类似于这种格式
{
    "list": [
        {
            "teacherId":"1",
            "cls":"0311203"
        },
        {
            "teacherId":"1",
            "cls":"0311201"
        }
    ]
}
* */
function addClass(list) {
  /*teacherId为集合
  * [
        {
            "teacherId":"1",
            "cls":"0311203"
        },
        {
            "teacherId":"1",
            "cls":"0311201"
        }
    ]
  * */
  const queryData = {
    list
  }
  return Service.post('/teacher/addclass', queryData)
}

/*老师批量删除班级*/
function deleteClass(teacherId, cls) {
  return Service.get('/teacher/deleteclass', {
    params: {
      teacherId,
      cls
    }
  })
}

/*开启ceo投票*/
function runCeo(teacherId) {
  return Service.get('/teacher/runceo', {
    params: {
      teacherId
    }
  })
}

/*关闭ceo投票*/
function closeCeo(teacherId) {
  return Service.post('/teacher/closeceo', {
    params: {
      teacherId
    }
  })
}

/*老师展示ceo发起的公司改名字申请*/
function changeCompanyName(teacherId, currentPage, studentId) {
  return Service.get('/teacher/changeName', {
    params: {
      teacherId,
      currentPage,
      studentId
    }
  })
}

/*同意修改公司名*/
function agreeChange(teacherId, ceo, companyName) {
  return Service.get('/teacher/agree', {
    params: {teacherId, ceo, companyName}
  })
}

/*拒绝修改公司名*/
function rejectChange(teacherId, ceo) {
  return Service.get('/teacher/refuse', {
    params: {
      teacherId, ceo
    }
  })
}
/*删除公司*/
function deleteCompany(ceo) {
  return Service.post('/teacher/deletecompany', {
    ceo
  })
}

/*撤销ceo*/
function deleteCeo(studentId) {
  return Service.post('/teacher/deletecompany', {
    studentId
  })
}
/*选择ceo*/
function decideCeo(studentId) {
  return Service.post('/teacher/decideceo', {
    studentId
  })
}
/*给公司打分*/
function putScore(teacherId,scoreTeacher,companyName) {
  return Service.post('/teacher/companyscore', {
    teacherId,scoreTeacher,companyName
  })
}
/*老师修改宣讲状态*/
function voteStatus(flag, teacherId) {
  return Service.post('/teacher/speakvote', {
    flag, teacherId
  })
}
/*给学生打分*/
function setScore(teacherId, studentId, teacherScore) {
  return  Service.post('/teacher/setstuscore', {
    teacherId, studentId, teacherScore
  })
}
export {
  selectedClassTeacher,
  unSelectedClassTeacher,
  addClass,
  deleteClass,
  runCeo,
  closeCeo,
  changeCompanyName,
  agreeChange,
  rejectChange,
  deleteCompany,
  decideCeo,
  deleteCeo,
  putScore,
  voteStatus,
  setScore
}
