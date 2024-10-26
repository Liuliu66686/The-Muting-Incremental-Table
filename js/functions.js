//快捷调用+提高运算速度
var zero = new Decimal(0)
var one = new Decimal(1)
var two = new Decimal(2)
var three = new Decimal(3)
var four = new Decimal(4)
var five = new Decimal(5)
var six = new Decimal(6)
var seven = new Decimal(7)
var eight = new Decimal(8)
var nine = new Decimal(9)
var ten = new Decimal(10)
var three_thousand_eight_hundred_and_sixty_four = new Decimal(3864)//Liue308特供版
var thirty_eight_million_six_hundred_and_forty_two_thousand_one_hundred_and_eighty = new Decimal(38642180)//cutefu~特供版
//快捷定义
function n(num){
    return new Decimal(num)
}
//检测旁边的升级是否被购买
function checkAroundUpg(UPGlayer,place){
    place = Number(place)
    return hasUpgrade(UPGlayer,place-1)||hasUpgrade(UPGlayer,place+1)||hasUpgrade(UPGlayer,place-10)||hasUpgrade(UPGlayer,place+10)
}
//检测旁边的grid是否被点击 #Liuliu66686 提供
function checkAroundGrid(layer,id){
    return getGridData(layer, id-1)>0||getGridData(layer, id+1)>0||getGridData(layer, id-100)>0||getGridData(layer, id+100)>0
}
//指数软上限
function powsoftcap(num,start,power){
	if(num.gt(start)){
		num = num.root(power).mul(start.pow(one.sub(one.div(power))))
	}
    return num
}
//对数软上限
function logsoftcap(num,start,floor){
	if(num.gt(start)){
		num = num.div(start).log(floor).add(start)
	}
    return num
}
//指数软上限逆运算 #Banana3864提供
function anti_powsoftcap(result,start,power){
    if(result.gt(start)){
        result = result.div(start).pow(power).mul(start)
    }
    return result
}
//e后数字开根
function expRoot(num,root){
    return ten.pow(num.log10().root(root))
}
//e后数字乘方
function expPow(num,pow){
    return ten.pow(num.log10().pow(pow))
}
//e后数字指数软上限
function expRootSoftcap(num,start,power){
    if(num.lte(start)) return num;
    num = num.log10();start = start.log10()
    return ten.pow(num.root(power).mul(start.pow(one.sub(one.div(power)))))
}
//修改class属性
function setClass(id,toClass = []){
    var classes = ""
    for(i in toClass) classes += " "+toClass[i]
    if(classes != "") classes = classes.substr(1)
    document.getElementById(id).className = classes
}
//快速创建sub元素
function quickSUB(str){
    return `<sub>${str}</sub>`
}
//快速创建sup元素
function quickSUP(str){
    return `<sup>${str}</sup>`
}
//快速给文字上色
function quickColor(str,color){
    return `<text style='color:${color}'>${str}</text>`
}
//适配有双效果的升级 #Liuliu66686提供
function upgradeEffect2(layer, id) {
	return (tmp[layer].upgrades[id].effect2)
}
//快速购买或售出升级 #Liuliu66686提供
function quickUpgBuyorSell(layer, IDs ,bos) {
    if(bos){
        for (id in IDs){
            if(!hasUpgrade(layer,IDs[id])){
                player[layer].upgrades.push(IDs[id])
            }
        }
    }
    else{
        for (id in IDs){
            if(hasUpgrade(layer,IDs[id])){
                player[layer].upgrades.splice(player[layer].upgrades.indexOf(IDs[id]),1)
            }
        }
    }
}
//同时自动购买多个升级 #Liuliu66686提供
function quickUpgBuy(layer, IDs) {
    for (id in IDs){
        buyUpgrade(layer,IDs[id])
    }
}
//快速设置多个可购买数量 #Liuliu66686提供
function quickSetBuyableAmount(layer, IDs, amount){
    for(id in IDs){
        player[layer].buyables[IDs[id]] = n(amount)
    }
}
//快速生成行列数组 #QqQe308提供
function quickSpawnConst(r,c,grid=false) {
    let a=[]
    let x=grid?100:10
    for(i=1;i<=r;i++) {
      for(j=1;j<=c;j++)  a.push(i*x+j)
     }
    return a
    }