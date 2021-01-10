const actions = {
  loginAction: (userId, password, type) => {
    return {
      type: "login",
      chooseType: type,
      payload: {
        [type === '学生'? 'studentId': 'teacherId']: userId,
        password: password
      }
    }
  },
  Login_Success: (message, data) => {
    return {
      type: "Login_Success",
      payload: {
        message: message,
        data: data,
      }
    }
  },
  Login_Fail: () => {
    return {
      type: "Login_Fail",
      payload:{
      }
    }
  },
  Login_Check: () => {
    return {
      type: "Login_Check",
      payload: {
        userId: sessionStorage.getItem("userId")
      }
    }
  },
  Login_Check_OK: () => {
    return {
      type: "Login_Check_OK",
    }
  },
  Login_Check_NO: () => {
    return {
      type: "Login_Check_NO",
    }
  },
  getAllCompanies: (userId) => {
    return {
      type: "getAllCompanies",
      payload: {
        studentId: userId,
      }
    }
  },
  getAllCompanies_OK: (data) => {
    return {
      type: "getAllCompanies_OK",
      payload: {
        ...data
      }
    }
  },
  getAllCompanies_NO: () => {
    return {
      type: "getAllCompanies_NO",
    }
  },
  Exit: () => {
    return {
      type: "Exit",
      payload:{
        userId: sessionStorage.getItem("userId")
      }
    }
  },
  Exit_OK: () => {
    return {
      type: "Exit_OK",
    }
  },
  Exit_NO: () => {
    return {
      type: "Exit_NO",
    }
  },
  VoteForCompany: (studentId,ceoId) => {
    return {
      type:"VoteForCompany",
      payload: {
        studentId:studentId,
        ceoId:ceoId
      }
    }
  },
  VoteForCompany_OK: (message) => {
    return {
      type:"VoteForCompany_OK",
      payload:{
        message:message
      }
    }
  },
  VoteForCompany_NO: (message) => {
    return {
      type:"VoteForCompany_NO",
      payload:{
        message:message
      }
    }
  },
  ShowCeo : (page,studentId) => {
    return {
      type:"ShowCeo",
      payload:{
        currentPage:page,
        studentId:studentId
      }
    }
  },
  ShowCeo_OK : (data) => {
    return {
      type:"ShowCeo_OK",
      payload:{
        ...data
      }
    }
  },
  ShowCeo_NO : () => {
    return {
      type:"ShowCeo_NO",
    }
  },
  VoteForCeo : (ceoId,studentId) => {
    return {
      type:"VoteForCeo",
      payload:{
        ceoId:ceoId,
        studentId:studentId
      }
    }
  },
  VoteForCeo_OK : (message) => {
    return {
      type:"VoteForCeo_OK",
      payload:{
        message:message
      }
    }
  },
  VoteForCeo_NO : (message) => {
    return {
      type:"VoteForCeo_NO",
      payload:{
        message:message
      }
    }
  },
  RunCeo : () => {
    return {
      type:"RunCeo",
      payload:{
        studentId:sessionStorage.getItem("userId")
      }
    }
  },
  RunCeo_OK : (message) => {
    return {
      type:"RunCeo_OK",
      payload:{
        message:message
      }
    }
  },  
  RunCeo_NO : (message) => {
    return {
      type:"RunCeo_NO",
      payload:{
        message:message
      }
    }
  },
  ShowApplication : (page,studentId) => {
    return {
      type:"ShowApplication",
      payload:{
        currentPage:page,
        studentId:studentId
      }
    }
  },
  ShowApplication_OK : (data) => {
    return {
      type:"ShowApplication_OK",
      payload:{
        ...data
      }
    }
  },
  ShowApplication_NO : () => {
    return {
      type:"ShowApplication_NO",
    }
  },
  AddApplication : (applications) => {
    return {
      type:"AddApplication",
      payload:applications
    }
  },
  AddApplication_OK : (message) => {
    return {
      type:"AddApplication_OK",
      payload:{
        message:message
      }
    }
  },
  AddApplication_NO : (message) => {
    return {
      type:"AddApplication_NO",
      payload:{
        message:message
      }
    }
  },
  ShowFile : (teachclass,currentPage) => {
    return {
      type:"ShowFlie",
      payload:{
        teachclass:teachclass,
        currentPage:currentPage
      }
    }
  },
  ShowFile_OK : (data) => {
    return {
      type:"ShowFile_OK",
      payload:{
        data
      }
    }
  },
  ShowFile_NO : () => {
    return {
      type:"ShowFile_NO",
    }
  },
  UploadFile : (file) => {
    return {
      type:"UploadFile",
      payload:{
        file:file,
        studentId:sessionStorage.getItem("userId"),
        teachClass:sessionStorage.getItem("class")
      }
    }
  },
  UploadFile_OK : (message) => {
    return {
      type:"UploadFile_OK",
      payload:{
        message:message
      }
    }
  },
  UploadFile_NO : (message) => {
    return {
      type:"UploadFile_NO",
      payload:{
        message:message
      }
    }
  },
  DownloadFile : (id) => {
    return {
      type:"DownloadFile",
      payload:{
        id:id
      }
    }
  },
  DownloadFile_OK : (message) => {
    return {
      type:"DownloadFile_OK",
      payload:{
        message:message
      }
    }
  },
  DownloadFile_NO : (message) => {
    return {
      type:"DownloadFile_NO",
      payload:{
        message:message
      }
    }
  },
  DeleteFile : (id) => {
    return {
      type:"DeleteFile",
      payload:{
        id:id
      }
    }
  },
  DeleteFile_OK : (message) => {
    return {
      type:"DeleteFile_OK",
      payload:{
        message:message
      }
    }
  },
  DeleteFile_NO : (message) => {
    return {
      type:"DeleteFile_NO",
      payload:{
        message:message
      }
    }
  },
  ShowCompanyMember : (studentId) => {
    return {
      type:"ShowCompanyMember",
      payload:{
        studentId:studentId
      }
    }
  },
  ShowCompanyMember_OK : (data) => {
    return {
      type:"ShowCompanyMember_OK",
      payload:{
        data
      }
    }
  },
  ShowCompanyMember_NO : () => {
    return {
      type:"ShowCompanyMember_NO",
    }
  },
  RunScore : (score,scored) => {
    return {
      type:"RunScore",
      payload:{
        scorer:sessionStorage.getItem("userId"),
        scored:scored,
        score:score
      }
    }
  },
  RunScore_OK : (message) => {
    return {
      type:"RunScore_OK",
      payload:{
        message:message
      }
    }
  },  
  RunScore_NO : (message) => {
    return {
      type:"RunScore_NO",
      payload:{
        message:message
      }
    }
  },
  ShowNumber : (studentId) => {
    return {
      type:"ShowNumber",
      payload:{
        studentId:studentId
      }
    }
  },
  ShowNumber_OK : (data) => {
    return {
      type:"ShowNumber_OK",
      payload:{
        data
      }
    }
  },
  ShowNumber_NO : () => {
    return {
      type:"ShowNumber_NO",
    }
  },
  ShowScore : (studentId) => {
    return {
      type:"ShowScore",
      payload:{
        studentId:studentId
      }
    }
  },
  ShowScore_OK : (data) => {
    return {
      type:"ShowScore_OK",
      payload:{
        data
      }
    }
  },
  ShowScore_NO : () => {
    return {
      type:"ShowScore_NO",
    }
  },
  ShowCompany : (studentId) => {
    return {
      type:"ShowCompany",
      payload:{
        studentId:studentId
      }
    }
  },
  ShowCompany_OK : (data) => {
    return {
      type:"ShowCompany_OK",
      payload:{
        data
      }
    }
  },
  ShowCompany_NO : () => {
    return {
      type:"ShowCompany_NO",
    }
  },
  Exist : () => {
    return {
      type:"Exist",
    }
  },
  CancelVoteCeo  : (studentId,ceoId) => {
    return {
      type:"CancelVoteCeo",
      payload:{
        studentId:studentId,
        ceoId:ceoId,
      }
    }
  },
  CancelVoteCeo_OK : (message) => {
    return {
      type:"CancelVoteCeo_OK",
      payload:{
        message:message
      }
    }
  },
  CancelVoteCeo_NO : (message) => {
    return {
      type:"CancelVoteCeo_NO",
      payload:{
        message:message
      }
    }
  },
}
export default actions