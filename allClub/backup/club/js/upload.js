// js进行图片裁剪以及压缩2019/11/19
/*
       三个参数
       file：一个是文件(类型是图片格式)，
       w：一个是文件压缩的后宽度，宽度越小，字节越小
       objDiv：一个是容器或者回调函数
       photoCompress()
        */
	   
function photoCompress(file, w, objDiv) {
	var ready = new FileReader();
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file);
	ready.onload = function() {
		var re = this.result;
		canvasDataURL(re, w, objDiv)
	}
}

function canvasDataURL(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.7; // 默认图片质量为0.7
		var  orient = getPhotoOrientation(that);
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width=w;
		canvas.height=h;
		 console.log(w+'--------'+h)
		 if (orient == 6) {
			canvas.width = this.height;
			canvas.height = this.width;
		     ctx.save();
		     ctx.translate(canvas.width / 2, canvas.height / 2);
		     ctx.rotate(90 * Math.PI / 180);
		     ctx.drawImage(img, -this.width / 2, -this.height / 2);
		     ctx.restore();
		   } else {
		      ctx.drawImage(that, 0, 0, w, h);
		   }
		// 图像质量
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
	var arr = urlData.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}


var xhr;
//上传文件方法

function UpladFile(fileItem, callback, bl) {
	var fileItem = fileItem;
	var fileObj = fileItem.file; // js 获取文件对象
	//if (fileObj.size / 1024 > 256) { //大于0.25M，进行压缩上传
	if (fileObj.size / 1024 > 256) {
		photoCompress(fileObj, {
			quality: 0.2
		}, function(base64Codes) {

			// var bl = convertBase64UrlToBlob(base64Codes);
			// Cropper有限制 第一个参数必须是imgdom元素或者canvas
			dataURLtoFile(base64Codes, fileItem.file.name, function(dataURLtoFileData) {
				callback({
					content: base64Codes,
					file: dataURLtoFileData
				});
			})

		});
	} else { //小于等于1M 原图上传
		photoCompress(fileObj, {
			quality: 0.5
		}, function(base64Codes) {
		
			// var bl = convertBase64UrlToBlob(base64Codes);
			// Cropper有限制 第一个参数必须是imgdom元素或者canvas
			dataURLtoFile(base64Codes, fileItem.file.name, function(dataURLtoFileData) {
				callback({
					content: base64Codes,
					file: dataURLtoFileData
				});
			})
		
		});
	}
}

//将base64文件转为file
// function dataURLtoFile(dataurl, filename, callback) {
// 	var arr = dataurl.split(','),
// 		mime = arr[0].match(/:(.*?);/)[1],
// 		bstr = atob(arr[1]),
// 		n = bstr.length,
// 		u8arr = new Uint8Array(n);
// 	while (n--) {
// 		u8arr[n] = bstr.charCodeAt(n);
// 	}
// 	callback(new File([u8arr], filename, {
// 		type: mime
// 	}));
// }
function dataURLtoFile(dataurl, filename, callback) {
	//转成blob
	function dataURLtoBlob(toDataURL) {
		var arr = toDataURL.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		var blob = null;

		// 解决低版本浏览器没有new Blob()问题
		try {
			blob = new Blob([u8arr], {
				type: mime
			});
		} catch (e) {
			var BlobBuilder = window.BlobBuilder = (
				window.BlobBuilder ||
				window.WebKitBlobBuilder ||
				window.MozBlobBuilder ||
				window.MSBlobBuilder
			);

			if (e.name === "TypeError" && BlobBuilder) {
				var builder = new BlobBuilder();
				builder.append(u8arr);
				blob = builder.getBlob(mime);
			}
		}

		return blob;
	}

	//转成file
	function blobToFile(Blob, fileName) {
		Blob.lastModifiedDate = new Date();
		Blob.name = fileName;
		return Blob;
	}

	// 调用如下
	let bold = dataURLtoBlob(dataurl);
	let file = blobToFile(bold, "fileName");

	// 上传file就可以了
	//return file;
	callback(file);
}

function getPhotoOrientation(img) {
   var orient;
   EXIF.getData(img, function () {
      orient = EXIF.getTag(this, 'Orientation');
   });
   return orient;
}
