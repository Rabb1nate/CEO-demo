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
        userId: localStorage.getItem("userId")
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
        userId: localStorage.getItem("userId")
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
        studentId:localStorage.getItem("userId")
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
        studentId:localStorage.getItem("userId"),
        teachClass:localStorage.getItem("class")
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
  Exist : () => {
    return {
      type:"Exist",
    }
  },
}
export default actions