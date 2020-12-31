const newstate = {
  payload:{
    data:{
      object:[]
    }
  }
}
export default (state = newstate, action) => {
  var data = {
    CompanyData:state.CompanyData,
    CeoData:state.CeoData,
    ApplicationData:state.ApplicationData,
    FileData:state.FileData,
    MemberData:state.MemberData,
    NumberData:state.NumberData,
    ScoreData:state.ScoreData,
    MyCompanyData:state.MyCompanyData
  }
  switch (action.type) {
    case "getAllCompanies":
      return { isLogin:state.isLogin, ...data,  ...action}
    case "getAllCompanies_OK":
      return { isgetAllCompanies:true, isLogin:state.isLogin,  ...data,CompanyData:action.payload.data,}
    case "getAllCompanies_NO":
      return { isgetAllCompanies:false, isLogin:state.isLogin,  ...data,CompanyData:action.payload.data,}
    case "login":
      return {   isLogin:state.isLogin,  ...action}
    case "Login_Success":
      return {isLogin: true, ...action.payload.data, };
    case "Login_Fail":
      return {isLoginFail: true,isLogin: false, ...action, };
    case "Login_Check_OK":
      return {isLogin: true, ...data,...action.payload, };
    case "Login_Check_NO":
      return {isLogin: false, ...action.payload, };
    case "Exit_OK":
      return {isLogin: false, ...action.payload, }
    case "VoteForCompany":
      return {isLogin:state.isLogin,...data, ...action}
    case "VoteForCompany_OK":
      return {isVoteForCompany:true,...data, isLogin:state.isLogin, ...action.payload}
    case "VoteForCompany_NO":
      return {isVoteForCompany:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "ShowCeo_OK":
      return {isShowCeo:true, isLogin:state.isLogin,...data, CeoData:action.payload.data,}
    case "ShowCeo_NO":
      return {isShowCeo:false,...data, isLogin:state.isLogin, ...action.payload}
    /* CEO */
    case "VoteForCeo":
      return {isLogin:state.isLogin,...data, ...action}
    case "VoteForCeo_OK":
      return {isVoteForCeo:true, isLogin:state.isLogin,...data,  ...action.payload}
    case "VoteForCeo_NO":
      return {isVoteForCeo:false, isLogin:state.isLogin, ...data, ...action.payload}
    case "RunCeo":
      return {isLogin:state.isLogin,...data, ...action}
    case "RunCeo_OK":
      return {isRunCeo:true, isLogin:state.isLogin,...data,  ...action.payload}
    case "RunCeo_NO":
      return {isRunCeo:false, isLogin:state.isLogin,...data,  ...action.payload}
    case "ShowApplication":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowApplication_OK":
      return {isShowApplication:true, isLogin:state.isLogin,...data, ApplicationData:action.payload.data}
    case "ShowApplication_NO":
      return {isShowApplication:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "AddApplication":
      return {isLogin:state.isLogin,...data,...action}
    case "AddApplication_OK":
      return {isAddApplication:true, isLogin:state.isLogin,...data, ...action.payload}
    case "AddApplication_NO":
      return {isAddApplication:false, isLogin:state.isLogin,...data, ...action.payload}
    case "ShowFile":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowFile_OK":
      return {isShowFile:true, isLogin:state.isLogin,...data, FileData:action.payload.data}
    case "ShowFile_NO":
      return {isShowFile:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "UploadFile":
      return {isLogin:state.isLogin,...data,...action}
    case "UploadFile_OK":
      return {isUploadFile:true, isLogin:state.isLogin,...data, ...action.payload}
    case "UploadFile_NO":
      return {isUploadFile:false, isLogin:state.isLogin,...data, ...action.payload}
    case "DownloadFile":
      return {isLogin:state.isLogin,...data,...action}
    case "DownloadFile_OK":
      return {isDownloadFile:true, isLogin:state.isLogin,...data, ...action.payload}
    case "DownloadFile_NO":
      return {isDownloadFile:false, isLogin:state.isLogin,...data, ...action.payload}
    case "DeleteFile":
      return {isLogin:state.isLogin,...data,...action}
    case "DeleteFile_OK":
      return {isDeleteFile:true, isLogin:state.isLogin,...data, ...action.payload}
    case "DeleteFile_NO":
      return {isDeleteFile:false, isLogin:state.isLogin,...data, ...action.payload}
    case "ShowCompanyMember":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowCompanyMember_OK":
      return {isShowCompanyMember:true, isLogin:state.isLogin,...data, MemberData:action.payload.data}
    case "ShowCompanyMember_NO":
      return {isShowCompanyMember:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "RunScore":
      return {isLogin:state.isLogin,...data, ...action}
    case "RunScore_OK":
      return {isRunScore:true, isLogin:state.isLogin,...data, ...action.payload}
    case "RunScore_NO":
      return {isRunScore:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "ShowNumber":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowNumber_OK":
      return {isShowNumber:true, isLogin:state.isLogin,...data, NumberData:action.payload.data}
    case "ShowNumber_NO":
      return {isShowNumber:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "ShowScore":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowScore_OK":
      return {isShowScore:true, isLogin:state.isLogin,...data, ScoreData:action.payload.data}
    case "ShowScore_NO":
      return {isShowScore:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "ShowCompany":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowCompany_OK":
      return {isShowCompany:true, isLogin:state.isLogin,...data, MyCompanyData:action.payload.data}
    case "ShowCompany_NO":
      return {isShowCompany:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "Exist" :
      return {...data,...action,isLogin:state.isLogin,Exist:true}
    case "CEO_SET_MEMBER":
      return {
        ...state,
        // member: action.payload.member
        member: [
          {
            "id": 1,
            "ceoId": 0,
            "studentId": "1",
            "companyName": "qwqw",
            "position": "副总裁",
            "teacherId": "tiansh"
          },
          {
            "id": 2,
            "ceoId": 0,
            "studentId": "2",
            "companyName": "hhhh",
            "position": "副总裁",
            "teacherId": "tiansh"
          },
          {
            "id": 3,
            "ceoId": 0,
            "studentId": "2010211506",
            "companyName": "hhhh",
            "position": "ceo",
            "teacherId": "tiansh"
          },
          {
            "id": 4,
            "ceoId": 0,
            "studentId": "3",
            "companyName": "hhhh",
            "position": null,
            "teacherId": "tiansh"
          }
          ,
        ]
      }
    default:
      return {...action,isLogin:state.isLogin,...data,};
  }
}
