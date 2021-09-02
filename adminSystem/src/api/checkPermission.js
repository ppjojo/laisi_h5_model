
export function checkPermission(request){
    var permission=request.replace(/\//g,":").substring(1)
    var menuList=JSON.parse(sessionStorage.getItem("Laisi_menu"))||[]
    var hasPermission=false;
    // console.log(request)
    menuList.forEach(item=>{
      if(item.permission==permission){
        
        hasPermission=true
      }
    })
    return hasPermission
  }