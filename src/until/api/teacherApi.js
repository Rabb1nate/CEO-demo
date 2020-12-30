import Service from "../Service";

/*展示所有老师已经选择过的班级*/
function selectedClassTeacher(teacherId, currentPage,pageSize1) {
  return Service.get('/teacher/exitclass', {
    params: {
      teacherId,
      currentPage,
      pageSize1
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
// 展示竞选ceo同学及投票数
function showCeo(currentPage,teachclass){
  return Service.post('/student/showCeoVote',{
      currentPage,
      teachclass
  })
}

// 展示所有学生信息
function showAll(teachclass,currentPage){
  return Service.post('/teacher/showall',{
      teachclass,currentPage
  })
}
/*开启ceo投票*/
function runCeo(teachclass) {
  return Service.post('/teacher/runceo', {
    teachclass
  })
}

/*关闭ceo投票*/
function closeCeo(teachclass) {
  return Service.post('/teacher/closeceo', {
    teachclass
  })
}

function isRunVote(teachclass) {
  return Service.post('/teacher/checkceo', {
      teachclass
  })
}

/*老师展示ceo发起的公司改名字申请*/
function changeCompanyName(teachclass, currentPage, studentId) {
  return Service.post('/teacher/changeName', {
      teachclass,
      currentPage,
      studentId
  })
}

/*同意修改公司名*/
function agreeChange(ceo,companyName,teachclass) {
  return Service.post('/teacher/agree', {
    ceo,companyName,teachclass
  })
}

/*拒绝修改公司名*/
function rejectChange(ceo,companyName) {
  return Service.post('/teacher/refuse', {
      ceo,companyName
  })
}
/*删除公司*/
function deleteCompany(ceo,companyName,teachclass) {
  return Service.post('/teacher/deletecompany', {
    ceo,companyName,teachclass
  })
}

/*撤销ceo*/
function deleteCeo(studentId) {
  return Service.post('/teacher/deleteceo', {
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
function putScore(ceo,scoreTeacher) {
  return Service.post('/teacher/companyscore', {
    ceo,
    scoreTeacher,
    
  })
}
/*老师修改宣讲状态*/
function voteStatus(flag, teacherId,teachclass) {
  return Service.post('/teacher/speakvote', {
    flag, teacherId,teachclass
  })
}
// 返回宣讲投票状态
function isRunSpeakVot(teachclass,teacherId) { 
  return Service.post('/teacher/checkSpeak', {
    teachclass,teacherId
  })
}
/*给学生打分*/
function setScore(teacherId, studentId, teacherScore) {
  return Service.post('/teacher/setstuscore', {
    teacherId, studentId, teacherScore
  })
}

// 导出
function exportExc(teachclass){
  return Service.post('/upload/export',{
    teachclass
  })
}

//展示未签到学生
function noSign(teachclass){
  return Service.post('/teacher/noSign',{
    teachclass
  })
}

//设置为未签到
function setNosign(teachclass,studentId,scoreSign,sign,addtime){
  return Service.post('teacher/sign',{
    teachclass,studentId,scoreSign,sign,addtime
  })
}

//展示配置
function showConfig(teachclass){
  return Service.post('/admin/showConfig',{
    teachclass
  })
}
//
function ShowComInfo(teachclass) {
  return Service.post('/student/showCompany', {
    teachclass})
  }

//个人配置
function updateConfigMember(ceoScore,memberScore,signScore,teachclass){
  return Service.post('/admin/updateConfigMember',{
    ceoScore,memberScore,signScore,teachclass
  })
}

//公司配置
function updateConfigCompany(companyScore,newsScore,bankScore,accountScore,tradeScore,revenueScore,agencyScore,fromCompanyScore,teachclass){
  return Service.post('/admin/updateConfigCompany',{
    companyScore,newsScore,bankScore,accountScore,tradeScore,revenueScore,agencyScore,fromCompanyScore,teachclass
  })
}
function updateConfigOther(late,absence,sameClassMember,companyNum,teachclass){
  return Service.post('/admin/updateConfigOther',{
    late,absence,sameClassMember,companyNum,teachclass
  })
}
function ShowComMember(stuid) { 
  return Service.post('/student/showCompanyMember', {
    "studentId":stuid
  })
}
//给学生选择公司
function ChoseCompany(ceoId, studentId, companyName) { 
  return Service.post('/teacher/selectStu', {
    "ceoId": ceoId,
    "studentId": studentId,
    "companyName":companyName
  })
}

// 展示PPT
function showFile(teachclass, currentPage) { 
  return Service.post('/upload/showAll', {
    teachclass,
    currentPage
  })
}
// 删除上传的文件
function DeleteUpload(id) { 
  return Service.post('/upload/delete', {
    "id":id
  })
}
// 下载
function download(id) { 
  return Service.post('/upload/download', {
    "id":id
  })
}

// 查看是否能够生成公司等级
function ShowComLevel(teachclass) { 
  return Service.post('/teacher/companyLevel', {
    teachclass
  })
}

export{
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
  isRunSpeakVot,
  setScore,
  showCeo,
  showAll,
  exportExc,
  ShowComMember,
  noSign,
  isRunVote,
  setNosign,
  showConfig,
  ShowComInfo,
  showFile,
  updateConfigMember,
  updateConfigCompany,
  updateConfigOther,
  ChoseCompany,
  DeleteUpload,
  download,
  ShowComLevel
}
