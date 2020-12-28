import {takeEvery, select, throttle, call, put, takeLatest} from 'redux-saga/effects'
import actions from '../actionCreators/creators'
import LoginApi from '../../until/api/LoginApi.js'
import StudentApi from '../../until/api/StudentApi'
import {getMember, setPosition} from "../../until/api/ceo";
import { message } from 'antd';
function setLocalStorage(config) {
  Reflect.ownKeys(config).forEach(key => {
    localStorage.setItem(key, config[key])
  })
}

export default function* defSaga() {
  yield throttle(2000, 'login', function* () {
    const action = yield select();
    const res = yield call(LoginApi.Login, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag)
    {        
      if(action.payload.studentId!==undefined){
        setLocalStorage({
          userId: action.payload.studentId,
          type: res.data.data.type
        })
      }
      else{
        setLocalStorage({
          userId: action.payload.teacherId,
          type: res.data.data.type
        })
      }
      setLocalStorage({
        userName:res.data.data.userName,
        ceo:res.data.error,
        class:res.data.teachclass,
      })
      if(localStorage.getItem("type")==="student" && localStorage.getItem("ceo") !== '1'){
        window.location="/Student/AllCompanies/ChosenClasses"
      }
      sessionStorage.clear()
      yield put(actions.Login_Success(res.data.message, res.data))
    }
    else {
      yield put(actions.Login_Fail())
      if(res.data.message)
      message.error(res.data.message)
    }
  })
  yield takeEvery('Login_Check', function* () {
    if (localStorage.getItem("userId"))
     {
      yield put(actions.Login_Check_OK())
    }
    else {
      yield put(actions.Login_Check_NO())
      localStorage.clear()
    }
  })
  yield takeEvery('Exit', function* () {
    const res = yield call(LoginApi.Exit, localStorage.getItem("userId"))
    if (res.status === 200)
    {
      yield put(actions.Exit_OK())
      localStorage.clear()
      window.location="/Student/AllCompanies/ChosenClasses"
      sessionStorage.clear()
    } else {
      message.error('退出失败')
      yield put(actions.Exit_NO())
    }
  })

  yield takeEvery('getAllCompanies', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowAllCompany, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.getAllCompanies_OK(res.data))
    }
    else{
      yield put(actions.getAllCompanies_NO())
    }
  })
  yield takeEvery('VoteForCompany', function* () {
    const action = yield select()
    const res = yield call(StudentApi.VoteCompany, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.VoteForCompany_OK(res.data.message))
      yield put(actions.getAllCompanies(localStorage.getItem("userId")))
    }
    else{
      yield put(actions.VoteForCompany_NO(res.data.message))
    }
  })
  yield takeEvery('ShowCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowCeo, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowCeo_OK(res.data))
    }
    else{
      yield put(actions.ShowCeo_NO())
    }
  })
  yield takeEvery('VoteForCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.VoteCeo, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.VoteForCeo_OK(res.data.message))
      yield put(actions.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,localStorage.getItem("userId")))
    }
    else{
      yield put(actions.VoteForCeo_NO(res.data.message))
    }
  })
  yield takeEvery('RunCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.RunCeo, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.RunCeo_OK(res.data.message))
      yield put(actions.ShowCeo(parseInt(sessionStorage.getItem("Page2"))||1,localStorage.getItem("userId")))
    }
    else{
      yield put(actions.RunCeo_NO(res.data.message))
    }
  })
  yield takeEvery('ShowApplication', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowApplication, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowApplication_OK(res.data))
    }
    else{
      yield put(actions.ShowApplication_NO())
    }
  })
  yield takeEvery('AddApplication', function* () {
    const action = yield select()
    const res = yield call(StudentApi.AddApplication, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.AddApplication_OK(res.data.message))
      yield put(actions.ShowApplication(parseInt(sessionStorage.getItem("Page3"))||1,localStorage.getItem("userId")))
    }
    else{
      yield put(actions.AddApplication_NO(res.data.message))
    }
  })
  yield takeEvery('ShowFlie', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowFile, action.payload)
    if (res.status === 200 ) {
      yield put(actions.ShowFile_OK(JSON.parse(res.data)))
    }
    else{
      yield put(actions.ShowFile_NO())
    }
  })
  yield takeEvery('DownloadFile', function* () {
    const action = yield select()
    const res = yield call(StudentApi.DownloadFile,action.payload)
    if (res.status === 200 ) {
      yield put(actions.DownloadFile_OK(res.data.message))
      let download = document.createElement('a')
      download.href = "http://120.79.207.60:8089/upload/download?id="+action.payload.id
      download.click()
    }
    else{
      yield put(actions.DownloadFile_NO(res.data.message))
    }
  })
  yield takeEvery('DeleteFile', function* () {
    const action = yield select()
    const res = yield call(StudentApi.DeleteFile,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.DeleteFile_OK(res.data.message))
      yield put(actions.ShowFile(localStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||1))
    }
    else{
      yield put(actions.DeleteFile_NO(res.data.message))
    }
  })
  yield takeEvery('ShowCompanyMember', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowCompanyMember,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowCompanyMember_OK(res.data))
    }
    else{
      yield put(actions.ShowCompanyMember_NO())
    }
  })
  /* CEO */
  // yield takeLatest('CEO_MEMBER', function* ceoSetMember(action) {
  //   action.cb && action.cb()
  //   const res = yield getMember(action.payload)
  //   action.cb && action.cb()
  //   yield put({
  //     type: 'CEO_SET_MEMBER',
  //     payload: {
  //       member: res.data
  //     }
  //   })
  // })
}
