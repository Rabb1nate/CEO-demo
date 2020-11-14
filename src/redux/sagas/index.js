import {takeEvery, select,throttle,call, put} from 'redux-saga/effects'
import Service from '../../until/Service'
import actions from '../actionCreators/creators'
export default function* defSaga(){
    yield throttle(2000,'login',function*(){
                const action = yield select();
                const res = yield call(Service.post,'/login/user', action.payload)
            if (res.status==200){
                yield put(actions.Login_Success(res.message,res.data))
                localStorage.setItem("name",res.data.userName)
                localStorage.setItem("userId",res.data.userId)
            }
            else {
                yield put(actions.Login_Fail());
            }
        
    })
    yield takeEvery('Login_Check',function*(){
        const action = yield select()
        const res = yield call(Service.post,'/login/keepLogin', action.payload)
        if (res.status==200){
            yield put(actions.Login_Check_OK())
        }
        else {
            yield put(actions.Login_Check_NO())
        }
    })
}