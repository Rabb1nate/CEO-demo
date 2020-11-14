const actions = {
    loginAction : (userId,password,type) => {
        if(type==="学生"){
            return {
                type:"login",
                payload:{        
                    studentId:userId,
                    password:password
                }
            }
        }
        else {
            return {
                type:"login",
                payload:{
                    teacherId:userId,
                    password:password
                }
            }
        }
    },
    getAllCompanies : (userId,page,rows) => {
        return {
            type:"getAllCompanies",
            payload:{        
                userId:userId,
                page:page,
                rows:rows
            }
        }
    },
    Login_Success : (message,data) => {
        return {
            type:"Login_Success",
            payload:{        
                message:message,
                data:data,
            }
        }
    },
    Login_Fail : () => {
        return {
            type:"Login_Fail",
        }
    },
    Login_Check: () => {
        return {
            type:"Login_Check",
            payload:{
                userId:localStorage.getItem("userId")
            }
        }
    },
    Login_Check_OK: () => {
        return {
            type:"Login_Check_OK",
        }
    },
    Login_Check_NO: () => {
        return {
            type:"Login_Check_NO",
        }
    }
}
export default actions