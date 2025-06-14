window.c = c;
window.res = "";
window.flag = false;
window.moduleList = []
c = function(r){
    if(flag){
        // 先判断 模块 是否已经存在，如果不存在才加入保存
        // 否则因为会有模块被重复调用，导致重复代码
        if (!moduleList.includes(`${r.toString()}`)) {
            moduleList.push(`${r.toString()}`)
            window.res = window.res + "'" + `${r.toString()}` + "'" + ":" + (e[r]+"") + ",";
        }
    }
    return window.c(r)
}