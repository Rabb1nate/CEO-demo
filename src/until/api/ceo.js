import Service from "../Service";
import {message} from 'antd'

async function agreeApplication(ceoId, studentId, companyName) {
  try {
    let res = await Service.post('/application/agreeApplication', {
      ceoId,
      studentId,
      companyName
    })
    if (res.data.flag) {
      message.success('已同意')
    } else {
      message.warn('未知错误')
    }
    return res.data
  } catch (e) {
    message.warn('网络错误')
    throw e
  }
}

async function getMember(studentId) {
  try {
    let res = await Service.post('/student/showCompanyMember', {
      studentId
    })
    return res.data
  } catch (e) {
    message.warn('网络错误')
    throw e
  }
}

async function setPosition(ceoId, studentId, position) {
  try {
    let res
    res = await Service.post('/student/setPosition', {
      ceoId,
      studentId,
      position
    })
    return res.data
  } catch (e) {
    message.warn('网络错误')
    throw e
  }
}

async function showApplication(currentPage, studentId) {
  try {
    let res = await Service.post('/application/showApplication', {
      currentPage,
      studentId
    })
    return res.data
  } catch (e) {
    message.warn('网络错误')
    throw e
  }
}

async function changeCompanyName(ceo, companyName) {
  try {
    return Service.post('/student/changeCompanyName', {
      ceo,
      companyName
    })
  } catch (e) {
    message.info('网络错误', e.message || e.msg)
    return null
  }
}

async function downloadFile(id) {
  try {
    const res = await Service.get('/upload/download?id=' + id)
    return res.data
  } catch (e) {
    message.warn('网络错误')
    throw e
  }
}

async function showAllCompany(id, currentPage = 1) {
  try {
    const res = await Service.post('/student/showCompany', {
      studentId: id,
      currentPage
    })
    return res.data
  } catch (e) {
    message.warn('网络错误')
    throw e
  }
}

async function voteForCompany(id, ceoId) {
  const res = await Service.post('/student/voteForCompany', {
    studentId: id,
    ceoId
  })
  return res.data
}

async function createCompany(studentId, companyName, type) {
  return Service.post('/student/createCompany', {
    studentId,
    companyName,
    type
  }).then(
    res => res.data
  )
}

async function fetchFileList(teacherClass, currentPage) {
  return Service.post('/upload/showAll', {
    teacherClass,
    currentPage
  }).then(
    res => JSON.parse(res.data),/*不知道为什么后端的data是个字符串*/
    e => '网络错误'
  )
}

export {
  agreeApplication,
  getMember,
  setPosition,
  showApplication,
  downloadFile,
  showAllCompany,
  voteForCompany,
  createCompany,
  fetchFileList,
  changeCompanyName
}



