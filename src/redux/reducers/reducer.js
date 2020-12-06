const newstate = {
  payload:{
    data:{
      object:[]
    }
  }
}
export default (state = newstate, action) => {
  switch (action.type) {
    case "getAllCompanies":
      return { isLogin:state.isLogin,   ...action}
    case "getAllCompanies_OK":
      return { isgetAllCompanies:true, isLogin:state.isLogin,  ...action.payload}
    case "login":
      return {   isLogin:state.isLogin,  ...action}
    case "Login_Success":
      return {isLogin: true, ...action.payload.data, };
    case "Login_Fail":
      return {isLogin: false, ...action.payload, };
    case "Login_Check_OK":
      return {isLogin: true, ...action.payload, };
    case "Login_Check_NO":
      return {isLogin: false, ...action.payload, };
    case "Exit_OK":
      return {isLogin: false, ...action.payload, }
    case "VoteForCompany":
      return {isLogin:state.isLogin, ...action}
    case "VoteForCompany_OK":
      return {isVoteForCompany:true, isLogin:state.isLogin, ...action.payload}
    case "VoteForCompany_NO":
      return {isVoteForCompany:false, isLogin:state.isLogin, ...action.payload}
    case "ShowCeo_OK":
      return {isShowCeo:true, isLogin:state.isLogin, ...action.payload}
    case "ShowCeo_NO":
      return {isShowCeo:false, isLogin:state.isLogin, ...action.payload}
    /* CEO */
    case "VoteForCeo":
      return {isLogin:state.isLogin,...action}
    case "VoteForCeo_OK":
        return {isVoteForCeo:true, isLogin:state.isLogin, ...action.payload}
    case "VoteForCeo_NO":
        return {isVoteForCeo:false, isLogin:state.isLogin, ...action.payload}
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
      return {...action,isLogin:state.isLogin};
  }
}
