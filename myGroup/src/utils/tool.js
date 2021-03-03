import request from "@u/request";
import { Toast } from "vant";
//android终端
var isAndroid =
  navigator.userAgent.indexOf("Android") > -1 ||
  navigator.userAgent.indexOf("Adr") > -1;
//iOS终端
var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//是否微信
var isWechat =
  navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
//图片上传并审核
var pictureReview = (fileObject, cb) => {
  var formdata = new FormData();
  formdata.append("file", fileObject.file);
  request({
    url: "oss/upload/file",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formdata,
  })
    .then((res) => {
      console.log(res);
      request({
        url: "contentSecurity/aliyun/imageScan",
        method: "post",
        data: {
          content: res.data.url,
        },
      })
        .then((res2) => {
          res2.url = res.data.url;
          cb(res2);
        })
        .catch((err) => {
          console.log(err);
          Toast(err.msg);
        });
    })
    .catch((err) => {
      console.log(err);
      Toast("系统异常");
    });
};
var textReview=(str,cb)=>{
  request({
    url: "contentSecurity/aliyun/textScan",
    method: "post",
    data: {
      content: str
    },
  }).then(res=>{
    cb(res);
  })
}

export { isAndroid, isIOS, isWechat, pictureReview,textReview };
