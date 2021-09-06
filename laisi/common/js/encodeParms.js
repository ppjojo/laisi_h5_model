
var parms={
    urlencodeParms:function (search) {
        var arrsign = search.substr(1).split("&");
        var searchobj=new Object({});
        for(var i=0;i<arrsign.length;i++){
            searchobj[arrsign[i].split("=")[0]]=encodeURI(arrsign[i].split("=")[1]);
        }
        return searchobj
    }
};