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
          if(res2.code!=0){
            Toast("图片审核未通过，请重新上传！");
			return;
          }
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
    if(res.code!=0){
      Toast("小组名称或口号包含不合法词汇!");
      return;
    }
    cb(res);
  })
}
//获取url后面的参数 仅在request里面使用
var getQueryString=(name)=> {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.href.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export { isAndroid, isIOS, isWechat, pictureReview,textReview ,getQueryString};
