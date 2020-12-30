import Service from "../Service";
import {message} from 'antd'
import Axios from "axios";

async function agreeApplication(ceoId, studentId, companyName) {
  try {
    let res = await Service.post('/application/agreeApplication', {
      ceoId,
      studentId,
      companyName
    })
    return res.data
  } catch (e) {
    message.info('网络错误')
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
    message.info('网络错误')
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
    message.info('网络错误')
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
    message.info('网络错误')
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

async function downloadFile(id, fileName) {
  try {
    const res = await Service.get('/upload/download?id=' + id, {
      responseType: 'blob'
    })

    const blob = new Blob([res.data])
    const elink = document.createElement("a");
    elink.download = fileName
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);

    return res.data
  } catch (e) {
    message.info('网络错误')
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
    message.info('网络错误')
    throw e
  }
}

async function voteForCompany(id, ceoId) {
  try {
    const res = await Service.post('/student/voteForCompany', {
      studentId: id,
      ceoId
    })
    return res.data
  } catch (e) {
    message.info('网络异常')
  }
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

async function fetchFileList(teachclass, currentPage) {
  return Service.post('/upload/showAll', {
    teachclass,
    currentPage
  }).then(
    res => JSON.parse(res.data),/*不知道为什么后端的data是个字符串*/
    e => '网络错误'
  )
}

async function companyInfo(studentId) {
  const res = await Service.post('/student/showCompanySelf', {
    studentId
  }).catch(e => {
    message.info('网络异常')
  })
  return res.data
}

async function uploadPPT(fd) {
  const res = await Axios.post('http://localhost:3000/api/upload/up', fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(e => {
    message.info('网络异常')
  })

  return res?.data
}

async function deleteFile(id) {
  try {
    const res = await Service.post('/upload/delete', {
      id
    })
    return res.data
  } catch (e) {
    message.info("网络异常")
  }
}

async function companyScore(scorer, score, scored) {
  try {
    const res = await Service.post('/score/companyScore', {
      scorer,
      score,
      scored
    })
    return res.data
  } catch (e) {
    message.info("网络错误")
  }
}

async function studentScore(score, scored, scorer) {
  try {
    const res = Service.post('/score/stuScore', {
      score,
      scored,
      scorer
    })
    return res.data
  } catch (e) {
    message.info('网络错误')
  }
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
  changeCompanyName,
  companyInfo,
  uploadPPT,
  deleteFile,
  companyScore,
  studentScore
}



