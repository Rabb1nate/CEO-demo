import Service from "../Service"
const StudentApi = {
    ShowAllCompany : (payload) => {
        return Service.post('/student/showCompany',{
                ...payload
        })
    },
    RunCeo : (payload) => {
        return Service.post('/student/runForCeo',{
            ...payload
        })
    },
    VoteCeo : (payload) => {
        return Service.post('/student/voteForCeo',{
                ...payload
        })
    },

    ShowCeo : (payload) => {    
        return Service.post('/student/showCeoVote',{
                ...payload
        })
    },

    AddApplication : (payload) => {
        return Service.post('/application/addApplication',
               payload
            )
    },
    ShowApplication : (payload) => {
            //CEO和学生均可以调用，返回不同的数据
        return Service.post('/application/showApplication',{
                ...payload
        })
    },

    VoteCompany : (payload) => {
        return Service.post('/student/voteForCompany',{
                ...payload
        })
    },
    DownloadFile : (payload) => {
        return Service.get('/upload/download',{
            params:{
                ...payload
            }
        })
    },
    UploadFile : (payload) => {
        return Service.post('/upload/up',{
                ...payload
        })
    },
    ShowFile : (payload) => {
        return Service.post('/upload/showAll',{
                ...payload
        })
    },
    DeleteFile : (payload) => {
        return Service.post('/upload/delete',{
                ...payload
        })
    },
    ShowCompanyMember : (payload) => {
        return Service.post('/student/showCompanyMember',{
                ...payload
        })
    },
}
export default StudentApi