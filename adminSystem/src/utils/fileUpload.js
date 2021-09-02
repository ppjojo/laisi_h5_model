import request from '@/utils/request'

var uurl='oss/upload/file'
if (process.env.VUE_APP_INTERFACEADDRESS == 'production') {
    //生产环境
    uurl='oss/upload/file'
  }else if (process.env.VUE_APP_INTERFACEADDRESS == 'usa') {
    //海外环境
    uurl='oss/s3/upload/file'
  }else if (process.env.VUE_APP_INTERFACEADDRESS == 'eur') {
    //海外环境--德国
    uurl='oss/s3/upload/file'
  }else if (process.env.VUE_APP_INTERFACEADDRESS == 'usa_dev') {
    //海外测试环境
    uurl='oss/s3/upload/file'
  }else {
    //测试环境(开发环境)
    uurl='oss/upload/file'
  }

  export function fileUpload(data) {
    return request({
        url: uurl,
        headers:{
            "Content-Type":"multipart/form-data",
        },
        method: 'post',
        data
    })
}

export function fileUploadOrigin(data) {
  return request({
      url: "/oss/upload/file/origin",
      headers:{
          "Content-Type":"multipart/form-data",
      },
      method: 'post',
      data
  })
}