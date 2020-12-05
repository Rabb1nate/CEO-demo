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
  getAllCompanies: (userId, page) => {
    return {
      type: "getAllCompanies",
      payload: {
        studentId: userId,
        currentPage: page,
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
}
export default actions