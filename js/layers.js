addLayer("1layer", {// Add a * small* to generate a slightly different layer
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 主禁言 ↓' : '↓ layer 0 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 主禁言 ↓' : '↓ layer 0 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    small: true,
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['m'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})
addLayer("2layer", {// Add a * small* to generate a slightly different layer
    name: "sideLayer1",
    position: -1,
    row: 2,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 禁言宇宙 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 禁言宇宙 ↓' : '↓ layer 1 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    small: true,
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['s'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})
addLayer("m", {
    name: "mute",
    symbol: "禁言",
    symbolEN: "Mute", 
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        muteP: zero,
        sendT: zero,
        mutingT: zero,
        angryTimes: zero,
        autoBuyU: true,
        autoSend: true,
    }},
    color: "#FFFFFF",
    type: "none",
    resource: "信息",
    row: 1,
    layerShown(){return true},
    gainMult(){
        mult = one
        if(hasUpgrade("m",24)) mult = mult.mul(upgradeEffect("m",24))
        if(hasUpgrade("m",12)) mult = mult.mul(upgradeEffect("m",12))
        if(hasUpgrade("m",32)) mult = mult.mul(upgradeEffect("m",32))
        if(hasUpgrade("m",34)) mult = mult.mul(upgradeEffect("m",34))
        if(hasUpgrade("m",35)) mult = mult.mul(upgradeEffect("m",35))  
        mult = mult.mul(this.gainMultR())
        return mult
    },
    gainMultR(){
        mult = one
        if(hasUpgrade("s",11)) mult = mult.mul(upgradeEffect("s",11)) 
        if(hasUpgrade("s",31)) mult = mult.mul(upgradeEffect("s",31))      
        if(hasUpgrade("b",15)) mult = mult.mul(upgradeEffect("b",15))       
        if(inChallenge("s",11)) mult = mult.div(25000)    
        if(inChallenge("s",12)) mult = mult.div(30)   
        return mult
    },
    hotkeys: [
        {key: "p", description: "P: 暂停游戏", onPress(){
            if(player.devSpeed==1) player.devSpeed = -1
            else player.devSpeed = 1
        }},
    ],
    doReset(resettingLayer){
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["autoBuyU","autoSend"]
            layerDataReset(this.layer, kept)
        }
    },
    upgrades: {
        11: {
            title: "开启禁言之旅",
            description: "解锁刷屏",
            cost: new Decimal(0),
            unlocked(){return true},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "加速禁言",
            description: "基于禁言点倍增消息获取",
            effect(){
                let eff = player.points.root(2).max(1)
                eff = powsoftcap(eff,n(1000),five)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(10),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "降压药",
            description: "无效升级'增压药'的效果,管理的怒火/4",
            effect(){
                let eff = four
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(30),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "消消气吧~",
            description: "管理消气速度x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        15: {
            title: "求求你啦~",
            description: "在发消息按钮旁边解锁求情",
            cost: new Decimal(500),
            unlocked(){return hasUpgrade("m",31)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "练习打字",
            description: "发信息冷却时间-1s",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "-"+format(this.effect(),0)+"s"},
            cost: new Decimal(3),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "反复练习",
            description: "发信息冷却时间基于信息降低(上限3.9s)",
            effect(){
                let eff = player.m.points.root(3).sub(1).max(0)
                if(hasUpgrade("m",23)) eff = eff.add(upgradeEffect("m",23))
                eff = eff.min(n(3.9).add(hasUpgrade("s",23)?upgradeEffect("s",23):0))
                return eff
            },
            effectDisplay(){return "-"+format(this.effect())+"s"},
            cost: new Decimal(6),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "加强练习",
            description: "升级'反复练习'效果+0.5",
            effect(){
                let eff = one.div(2)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(20),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "信息加倍",
            description: "双倍信息获取,以及...某人的怒火(tips:倍增信息获取也会倍增管理的怒火!)",
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(40),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        25: {
            title: "增压药",
            description: "管理的怒火再x2",
            effect(){
                let eff = two
                if(hasUpgrade("m",13)) return one
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(80),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        31: {
            title: "强化禁言",
            description: "禁言点获取x2",
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(1000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        32: {
            title: "信息自增",
            description: "信息获取基于信息倍增",
            effect(){
                let eff = player.m.points.root(5).max(1)
                eff = powsoftcap(eff,n("e10"),ten)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(2000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        }, 
        33: {
            title: "高效降压药",
            description: "管理的怒火/10",
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(3000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        34: {
            title: "禁言后的怒火",
            description: "基于被禁言次数倍增信息获取",
            effect(){
                let eff = player.m.angryTimes.root(2).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(5000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        35: {
            title: "禁言后的无奈",
            description: "基于被禁言次数降低管理的怒气和倍增信息获取",
            effect(){
                let eff = player.m.angryTimes.root(2).max(1)
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())+",x"+format(this.effect())},
            cost: new Decimal(15000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        41: {
            title: "超强化禁言",
            description: "基于信息倍增禁言点获取",
            effect(){
                let power = two
                if(hasUpgrade("s",42)) power = power.add(upgradeEffect("s",42))
                let eff = player.m.points.max(10).log(10).pow(power)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(50000),
            unlocked(){return hasUpgrade("m",35)||player.s.unlocked},
            style() { return {'border-radius': "0px",height: "120px", width: "600px"}},
        },
    },
    clickables:{
        11:{
            title() {return "发一次消息<h5>在群里发一次信息<h6>+"+format(layers.m.gainMult())+"信息/次"},
            canClick(){
                let a = hasUpgrade("s",15)&&!inChallenge("s",12)
                a = a||player.m.mutingT.lte(0)
                return a&&player.m.sendT.eq(0)},
            onClick() {          
                player.m.points = player.m.points.add(layers.m.gainMult())
                player.m.muteP = player.m.muteP.add(layers.m.angryMult())
                player.m.sendT = layers.m.sendSpeed()
            },
            onHold(){
                if(!hasUpgrade("m",100)) return
                player.m.points = player.m.points.add(layers.m.gainMult())
                player.m.muteP = player.m.muteP.add(layers.m.gainMult())
            },
            style() { return { 'background-color': this.canClick()?"#88FFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "150px", width: "200px"}},
        },
        12:{
            title() {return "向管理求情<h5>向管理求情...前提是你没把管理惹急<h6>当然,这也需要打字<br>(求情有多种效果,请自己尝试!)"},
            canClick(){return player.m.sendT.eq(0)},
            onClick() {          
                player.m.sendT = layers.m.sendSpeed()
                if(player.m.muteP.gt(0)) player.m.muteP = player.m.muteP.div(layers.m.angryMax().div(2)).pow(2).mul(layers.m.angryMax().div(2)).min(layers.m.angryMax())
                if(player.m.mutingT.gt(layers.m.muteTmaX().div(2))) player.m.mutingT = player.m.mutingT.add(2).min(layers.m.muteTmaX())
                else player.m.mutingT = player.m.mutingT.sub(2).max(0)
            },
            style() { return { 'background-color': this.canClick()?"#FFFFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "150px", width: "200px"}},
            unlocked(){return hasUpgrade("m",15)},
        },
        13:{
            title() {return "<h5>游戏卡死了?点击这个按钮清空一些负面的升级"},
            canClick(){return true},
            onClick() {          
                const U = [13,14,33]
                for (id in U){
                    if(hasUpgrade("m",U[id])){player.m.upgrades.splice(player.m.upgrades.indexOf(U[id]),1)}
                }
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "120px"}},
            unlocked(){return true},
        },
        21:{
            title() {
                let a = player.m.autoBuyU&&hasUpgrade("s",43)?"开":"关"
                return "开关自动购买升级<br>当前:"+ a},
            canClick(){return hasUpgrade("s",43)},
            onClick() {          
                player.m.autoBuyU=!player.m.autoBuyU
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",43)},
        },
        22:{
            title() {
                let a = player.m.autoSend&&hasUpgrade("s",53)?"开":"关"
                return "开关自动'发一次消息'<br>当前:"+ a},
            canClick(){return hasUpgrade("s",53)},
            onClick() {          
                player.m.autoSend=!player.m.autoSend
            },
            run(){
                if(!hasUpgrade("s",53)||!player.m.autoSend) return
                clickClickable("m",11)
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",53)},
        },
    },
    bars:{
        sendL:{
            direction: RIGHT,
            width: 600,
            height: 40,
            req(){
                let req = player.m.sendT.div(layers.m.sendSpeed())
                return req
            },
            fillStyle: {'background-color' : "#FF0000"},
            progress() { return this.req() },
            display(){return "你的打字速度有限,发送信息需要冷却("+format(player.m.sendT,2)+"s/"+format(layers.m.sendSpeed(),1)+"s)"},
        },
        muteP:{
            direction: RIGHT,
            width: 600,
            height: 40,
            req(){
                let req = player.m.muteP.div(layers.m.angryMax())
                return req
            },
            fillStyle: {'background-color' : "#FF8800"},
            progress() { return this.req() },
            display(){return "群管理想要禁言的怒火("+format(this.req().mul(100))+"%)"},
        },
        muteT:{
            direction: RIGHT,
            width: 600,
            height: 40,
            req(){
                if(layers.m.muteTmaX().eq(0)) return zero
                let req = player.m.mutingT.div(layers.m.muteTmaX())
                return req
            },
            fillStyle: {'background-color' : "#888888"},
            progress() { return this.req() },
            display(){return "禁言时间("+format(player.m.mutingT,2)+"s/"+format(layers.m.muteTmaX(),1)+"s)"},
        },
    },
    sendSpeed(){
        let v = five
        if(hasUpgrade("m",21)) v = v.sub(upgradeEffect("m",21))
        if(hasUpgrade("m",22)) v = v.sub(upgradeEffect("m",22))
        if(hasUpgrade("b",11)) v = v.div(upgradeEffect("b",11))
        if(player.m.mutingT.gt(0)) v = v.mul(10)
        return v
    },
    muteTmaX(){
        let max = n(60)
        if(hasUpgrade("s",14)) max = max.div(upgradeEffect("s",14))
        if(hasUpgrade("b",21)&&!inChallenge("s",11)) max = zero
        return max
    },
    angryMult(){
        let mult = one
        mult = mult.mul(layers.m.gainMult())
        if(hasUpgrade("m",25)) mult = mult.mul(upgradeEffect("m",25))
        if(hasUpgrade("m",13)) mult = mult.div(upgradeEffect("m",13))     
        if(hasUpgrade("m",33)) mult = mult.div(upgradeEffect("m",33))     
        if(hasUpgrade("m",35)) mult = mult.div(upgradeEffect("m",35))
        if(inChallenge("m",11)) mult = mult.div(1000)   
        mult = mult.div(this.gainMultR())
        if(player.m.mutingT.gt(0)&&hasUpgrade("s",15)) mult = mult.pow(0.5)
        return mult
    },
    angryDownMult(){
        let mult = one
        if(hasUpgrade("m",14)) mult = mult.mul(upgradeEffect("m",14))
        return mult
    },
    angryMax(){
        let max = n(100)
        if(hasUpgrade("s",13)) max = max.mul(upgradeEffect("s",13))
        return max
    },
    getMutingTimes(){
        let get = one
        if(hasUpgrade("s",32)) get = get.mul(upgradeEffect("s",32))
        return get
    },
    update(diff){
        player.m.mutingT = player.m.mutingT.sub(diff).max(0)
        player.m.muteP = player.m.muteP.sub(n(diff).mul(layers.m.angryDownMult())).max(0)
        player.m.sendT = player.m.sendT.sub(diff).max(0).min(layers.m.sendSpeed())
        if(player.m.muteP.gte(layers.m.angryMax())){
            player.m.muteP = zero;player.m.mutingT = player.m.mutingT.add(layers.m.muteTmaX()).min(layers.m.muteTmaX());player.m.angryTimes = player.m.angryTimes.add(this.getMutingTimes())
        }
        if(hasUpgrade("s",34)) player.m.points = player.m.points.add(this.gainMult().mul(upgradeEffect("s",34)).mul(diff))
        if(hasUpgrade("s",41)) player.m.angryTimes = player.m.angryTimes.add(upgradeEffect("s",41).mul(diff))
        if(hasUpgrade("s",43)&&player.m.autoBuyU) quickUpgBuy("m", quickSpawnConst(4,5))
    },
    microtabs:{
        mute1:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank","upgrades",["display-text", function() {return "到达 10000 禁言点 解锁 "+quickColor("禁言石","#444444")}],
                ],
            },
            "刷屏":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["row",[["clickable",11],["clickable",12]]],"blank",["bar","sendL"],["bar","muteP"],["bar","muteT"],["display-text", function() {return "你被禁言了 "+format(player.m.angryTimes,0) + " 次<br>被禁言期间,打字速度/10!"}],"blank",["clickable",13]
                ],
                unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            },
            "自动化":{
                buttonStyle: {
                    "border-color": "#444444","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["clickable",21],["clickable",22]
                ],
                unlocked(){return hasUpgrade("s",43)||player.b.unlocked},
            },
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],"main-display",["microtabs","mute1"]
    ],
})
addLayer("s", {
    name: "stone",
    symbol: "禁言石",
    position: 0,
    startData() { return {
        unlocked: false,
		points: zero,
        bestTime: n(86400),
        u13a: true,
        rPoints: zero,
        reRB: false,
        onFill: false,
        fillStone: zero,
        outTime: zero,
        outEffBase: zero,
    }},
    color: "#444444",
    requires: new Decimal(10000),
    resource: "禁言石",
    baseResource: "禁言点",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = one
        if(hasUpgrade("s",61)) mult = mult.mul(upgradeEffect("s",61))
        if(hasUpgrade("s",71)) mult = mult.mul(upgradeEffect("s",71))
        if(hasUpgrade("s",63)) mult = mult.mul(upgradeEffect("s",63))
        if(hasUpgrade("s",73)) mult = mult.mul(upgradeEffect("s",73))
        if(hasUpgrade("b",13)) mult = mult.mul(upgradeEffect("b",13))
        if(hasUpgrade("b",15)) mult = mult.mul(upgradeEffect("b",15))
        if(hasUpgrade("b",22)) mult = mult.mul(upgradeEffect("b",22))
        if(player.s.outTime.gt(0)) mult = mult.mul(layers.s.outEffect(2))            
        return mult
    },
    gainExp() {
        exp = one
        return exp
    },
    passiveGeneration() { 
        let a = zero
        if(hasUpgrade("b",24)) a = a.max(upgradeEffect("b",24))
        return a
    },
    row: 2,
    doReset(resettingLayer){
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            if(resettingLayer=="b"){
                if(hasChallenge("s",13)) kept.push("challenges")
            }
            layerDataReset(this.layer, kept)
        }
        player.s.bestTime=player.s.bestTime.min(player.s.resetTime)
        if(player.s.reRB) {quickUpgBuyorSell("s",[61,62,63,71,72,73]);player.s.rPoints=layers.s.rPointMax();player.s.reRB=false}
    },
    hotkeys: [
        {key: "s", description: "S: 进行固化重置(禁言石)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades:{
        11: {
            title: "信息强化",
            description: "仅对信息获取倍增x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(1),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "禁言强化",
            description: "禁言点获取x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(1),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "滑动变阻器.jpg",
            description: "管理的怒火上限x10,可开关",
            effect(){
                let eff = ten
                if(player.s.u13a) return eff  
                return one
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(2),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "禁言盾牌",
            description: "禁言时间上限/10",
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(2),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        15: {
            title: "下载破解版",
            description: "禁言期间也可以发送消息,且禁言期间管理的怒火获取^0.5",
            effect(){
                let eff = one.div(2)
                return eff
            },
            effectDisplay(){return "^"+format(this.effect())},
            cost: new Decimal(4),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "外部禁言",
            description: "不在禁言期间自动获取10%/s的禁言点",
            effect(){
                let eff = one.div(10)
                if(hasUpgrade("s",24)) eff = eff.mul(upgradeEffect("s",24))
                if(inChallenge("s",11)) eff = zero
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"%/s"},
            cost(){return new Decimal(hasUpgrade("b",21)?0:3)},
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "禁言再强化",
            description: "禁言期间禁言点获取再x10",
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(4),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "石化练习",
            description: "升级'反复练习'效果上限+0.09",
            effect(){
                let eff = n(0.09)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(3),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "外部禁言?",
            description: "升级'外部禁言'效果x100",
            effect(){
                let eff = n(100)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost(){return new Decimal(hasUpgrade("b",21)?0:6)},
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        25: {
            title: "固化速度增益",
            description: "基于最快固化速度倍增禁言点获取(起始于60s,上限60x)",
            effect(){
                let eff = n(61).sub(player.s.bestTime)
                eff = eff.min(60).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(18),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        31: {
            title: "信息也强化",
            description: "禁言石层每有一个升级,仅对信息获取x1.5",
            effect(){
                let eff = n(1.5).pow(n(player.s.upgrades.length))
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        32: {
            title: "禁言激发",
            description: "基于总禁言石倍增禁言次数获取",
            effect(){
                let eff = player.s.total.max(2).log(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        33: {
            title: "重复禁言倍增",
            description: "基于禁言次数倍增禁言点获取",
            effect(){
                let eff = player.m.angryTimes.root(4).max(1).min(1e20)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        34: {
            title: "自助信息",
            description: "每秒自动获取300%点击获取的信息",
            effect(){
                let eff = three
                if(inChallenge("s",11)) eff = zero
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"%/s"},
            cost: new Decimal(300),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        35: {
            title: "新区域",
            description: "解锁禁言石领域,基于禁言点倍增禁言点获取",
            effect(){
                let eff = player.points.max(10).log(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(500),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        41: {
            title: "领域升级11",
            description: "你可以以50次/s的速度获得禁言次数",
            effect(){
                let eff = n(50)
                if(hasUpgrade("s",51)) eff = eff.mul(upgradeEffect("s",32))
                if(inChallenge("s",11)) eff = zero
                return eff
            },
            effectDisplay(){return "+"+format(this.effect(),0)+"/s"},
            cost: new Decimal(750),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        42: {
            title: "领域升级12",
            description: "升级'超强化禁言'的指数基于信息而增加(初始为2)",
            effect(){
                let eff = player.m.points.max(10).log(10).root(5).sub(1)
                eff = powsoftcap(eff,n(10),two)
                if(hasUpgrade("s",52)) eff = eff.add(upgradeEffect("s",52))
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(2000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        43: {
            title: "领域升级13",
            description: "自动购买禁言升级(在禁言页面里开关)",
            cost: new Decimal(3000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        51: {
            title: "领域升级21",
            description: "升级'领域升级11'同样受到升级'禁言激发'的效果",
            cost: new Decimal(10000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        52: {
            title: "领域升级22",
            description: "升级'领域升级12'的效果基于禁言石再次增加",
            effect(){
                let eff = player.s.points.max(10).log(10).root(5).sub(1)
                eff = powsoftcap(eff,n(15),two)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(20000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        53: {
            title: "领域升级23",
            description: "自动'发一次消息'(在禁言页面里开关)",
            cost: new Decimal(30000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        61: {
            title: "领域升级31",
            description: "基于信息倍增禁言石获取",
            cost(){return n(hasUpgrade("s",71)?3:1)},
            effect(){
                let eff = player.m.points.max(10).log(10).root(2.5)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        62: {
            title: "领域升级32",
            description: "基于禁言点的数量级正比例倍增自身获取(上限225x)",
            effect(){
                let eff = player.points.max(10).log(10).min(255).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost(){return n(hasUpgrade("s",72)?5:2)},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        63: {
            title: "领域升级33",
            description: "基于总领域石倍增禁言石获取",
            effect(){
                let eff = layers.s.rPointMax().mul(10).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(10),
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        71: {
            title: "领域升级41",
            description: "基于禁言次数倍增禁言石获取",
            cost(){return n(hasUpgrade("s",61)?3:1)},
            effect(){
                let eff = player.m.angryTimes.max(4).log(4).sub(4).max(1).min(225)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        72: {
            title: "领域升级42",
            description: "基于禁言点的数量级反比例倍增自身获取(下限1x)",
            effect(){
                let eff = n(225).div(player.points.max(10).log(10)).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost(){return n(hasUpgrade("s",62)?5:2)},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        73: {
            title: "领域升级43",
            description: "基于剩余领域石倍增禁言石获取",
            effect(){
                let eff = player.s.rPoints.pow(4).max(1)
                eff = powsoftcap(eff,n(1e3),2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(10),
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },    
        81: {
            title: "领域升级51",
            description: "解锁一个释放新效果",
            cost: new Decimal(1e21),
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"凝聚中的禁言石",
            currencyInternalName:"fillStone",
            currencyLayer:"s",   
        },
        82: {
            title: "领域升级52",
            description: "解锁一个释放新效果",
            cost: new Decimal(1e33),
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"凝聚中的禁言石",
            currencyInternalName:"fillStone",
            currencyLayer:"s",  
        },
        83: {
            title: "领域升级53",
            description: "解锁一个释放新效果",
            cost: new Decimal(1e45),
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"凝聚中的禁言石",
            currencyInternalName:"fillStone",
            currencyLayer:"s",
        },      
    },
    buyables:{
        11:{
            title: "禁言点倍增器",
            cost(x) {
                let a = ten.pow(x.add(3))
                return a
            },
            display() { 
                let base = format(this.base())
                if(this.base().eq(4)) base = "四"
                if(this.base().eq(5)) base = "五"
                return base + "倍禁言点获取<br>价格: " + format(this.cost()) + "禁言石<br>效果: "+format(this.effect())+"x<br>购买量上限: "+format(this.purchaseLimit())},
            canAfford() { return player.s.points.gte(this.cost())},
            buy() {
                player.s.points = player.s.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = this.base().pow(x)
                return eff
            },
            base(){
                let base = four
                if(hasUpgrade("b",14)) base = base.add(upgradeEffect("b",14))
                if(hasUpgrade("b",15)) base = base.add(upgradeEffect2("b",15))
                    return base
            },
            purchaseLimit(){
                let max = n(100)
                return max
            },
            unlocked(){return true},
            style() { return { 'background-color': this.canAfford()?"#444444":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "240px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:#444444;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a},
        },
        12:{
            title: "领域构筑器",
            cost(x) {
                let a = two.pow(x).mul(1e5)
                return a
            },
            display() { return "将禁言石转化为领域石<br>价格: " + format(this.cost()) + "禁言石<br>效果: +"+format(this.effect(),0)},
            canAfford() { return player.s.points.gte(this.cost())},
            buy() {
                player.s.points = player.s.points.sub(this.cost())
                player.s.rPoints = player.s.rPoints.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = x
                return eff
            },
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return { 'background-color': this.canAfford()?"#444444":"#BF8F8F", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:#444444;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a},
        },
    },
    challenges:{
        11: {
            name: "禁言石领域I",
            challengeDescription: "<h5>进入禁言石的第一领域,效果:<h6>仅对信息/25000,禁言点^0.25,管理怒火/1000,升级'外部禁言','自助信息','领域升级11'失效",
            canComplete() {return player.points.gte(1e4)},
            goalDescription: "10000禁言点",
            rewardDescription(){return "解锁第二层禁言石领域"},
            onEnter() {
                player.m.points = zero
            },
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return true},
        },
        12: {
            name: "禁言石领域II",
            challengeDescription: "<h5>进入禁言石的第二领域,效果:<h6>仅对信息获取/20,升级'下载破解版'失效,禁言石领域I同时生效<h6>",
            canComplete() {return player.m.points.gte(1e9)},
            goalDescription: "1e9信息",
            rewardDescription(){return "解锁第三层禁言石领域"},
            onEnter() {
                player.m.points = zero
            },
            countsAs:[11],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
        },
        13: {
            name: "禁言石领域III",
            challengeDescription: "<h5>进入禁言石的第三领域,效果:<h6>清空已有的禁言石和释放时长,禁言石领域I,II同时生效",
            canComplete() {return player.s.points.gte(2e23)},
            goalDescription: "2e23禁言石",
            rewardDescription(){return player.b.unlocked?"凝聚重置不再重置领域挑战,凝聚器中的禁言石获取x1e10":"???"},
            onEnter() {
                player.m.points = player.s.points = player.s.outTime = zero
            },
            countsAs:[11,12],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
    },
    clickables:{
        11:{
            title() {return player.s.u13a?"关闭u13效果":"开启u13效果"},
            canClick(){return true},
            onClick() {          
                player.s.u13a = !player.s.u13a
            },
            style() { return { 'background-color': this.canClick()?"#88FFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "120px"}},
            unlocked(){return hasUpgrade("s",13)},
        },
        21:{
            title() {
                let a = player.s.reRB?"开":"关"
                return "领域回收器-"+a},
            display(){return "在下次固化重置回收已花费的领域石<br><h3>剩余领域石: "+format(player.s.rPoints,0)+"<br>总领域石: "+format(layers.s.rPointMax(),0)},
            canClick(){return true},
            onClick() {          
                player.s.reRB=!player.s.reRB
            },
            style() { return { 'background-color': this.canClick()?"#88FFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
        },
        31:{
            title() {return "释放凝聚器中的禁言石"},
            display(){
                let text = "将凝聚器中压缩的禁言石释放,获得短时提升效果<br>释放后,效果持续时间 ="+formatTime(player.s.fillStone.max(10).log(10).floor())+"<br>效果基础 "+format(player.s.outEffBase)+" ➜ "+format(this.effectB())+"<br>剩余时间: "+formatTime(player.s.outTime)+"<br>效果:1.倍增禁言点获取 x"+format(layers.s.outEffect(1))
                if(hasUpgrade("s",81)) text += "<br>2.倍增禁言石获取 x" + format(layers.s.outEffect(2))
                if(hasUpgrade("s",82)) text += "<br>3.增加释放效果1的指数 +" + format(layers.s.outEffect(3))
                if(hasUpgrade("s",83)) text += "<br>4.倍增禁言砖获取 x" + format(layers.s.outEffect(4))
                return text},
            canClick(){return true},
            onClick() {          
                player.s.outTime = player.s.fillStone.max(10).log(10).floor()
                player.s.outEffBase = this.effectB()
                player.s.fillStone = zero
            },
            effectB(){
                let base = player.s.fillStone.max(1e16).log(10).sub(16)
                //base=base.max(player.s.outEffBase)
                return base
            },
            style() { return { 'background-color': "#DDDDDD", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
        32:{
            title() {
                let a = player.s.onFill?"开":"关"
                return "填充禁言石到凝聚器-"+a},
            display(){return "每秒填充2%当前的禁言石到凝聚器<br><h3>填充进度: "+format(tmp.s.bars["u9x"].req.mul(100))+"%<br>当前: -"+format(player.s.onFill?player.s.points.div(50):zero)+"禁言石/s"},
            canClick(){return true},
            onClick() {          
                player.s.onFill=!player.s.onFill
            },
            style() { return { 'background-color': player.s.onFill?"#777777":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
    },
    bars:{
        u9x:{
            direction: RIGHT,
            width: 356,
            height: 116,
            req(){
                let max = n(66)
                let req = player.s.fillStone.max(1e16).log(10).sub(16).div(max).min(1)
                return req
            },
            fillStyle: {'background-color' : "#444444"},
            progress() { return this.req() },
            display(){return "凝聚器中有 "+format(player.s.fillStone)+" 禁言石<br>由于凝聚器的不稳定,每秒损失其中的5%<br>填充进度: "+format(this.req().mul(100))+"%"},
            borderStyle: {'border-radius': "0px",},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
    },
    rPointMax(){
        let max = buyableEffect("s",12)
        return max
    },
    fillGet(){
        let get = player.s.points.mul(0.02)
        return get
    },
    fillMult(){
        let mult = one
        if(hasChallenge("s",13)) mult = mult.mul(1e10)
        return mult
    },
    outEffect(num){
        let eff = one
        if(num==1){
            let power = five
            if(hasUpgrade("s",82)) power = power.add(layers.s.outEffect(3))
            if(hasUpgrade("b",23)) power = power.add(upgradeEffect("b",23))
            eff = player.s.outEffBase.add(1).pow(power)
            eff = powsoftcap(eff,n(1e50),five)
        }if(num==2){
            if(hasUpgrade("s",81)) eff = player.s.outEffBase.add(1).pow(2)
        }if(num==3){
            if(hasUpgrade("s",82)) eff = player.s.outEffBase.root(3)
        }if(num==4){
            if(hasUpgrade("s",83)) eff = player.s.outEffBase.add(1).root(3)
        }
        return eff
    },
    update(diff){
        player.s.fillStone = player.s.fillStone.sub(player.s.fillStone.mul(0.05).mul(diff))
        player.s.outTime = player.s.outTime.sub(diff).max(0)
        if(player.s.outTime.eq(0)) player.s.outEffBase = zero
        if(player.s.onFill){
            player.s.fillStone = player.s.fillStone.add(layers.s.fillGet().mul(layers.s.fillMult()).mul(diff))
            player.s.points = player.s.points.sub(layers.s.fillGet().mul(diff))
        }
    },
    microtabs:{
        stones:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["upgrades",[1,2,3]],["clickable",11],["display-text", function() {return "到达 5e26 禁言石 解锁 "+quickColor("禁言砖","#ce723c")}],
                ],
            },
            "领域":{
                buttonStyle: {
                    "border-color": "#444444","background-color": "#0f0f0f"
                },
                content:[
                    "blank","blank",
                    ["row",[["buyable",11],["column",[["row",[["upgrade",41],["upgrade",42],["upgrade",43]]],["row",[["upgrade",51],["upgrade",52],["upgrade",53]]]]],["challenge",11]]],
                    ["row",[["column",[["buyable",12],["clickable",21]]],["column",[["row",[["upgrade",61],["upgrade",62],["upgrade",63]]],["row",[["upgrade",71],["upgrade",72],["upgrade",73]]]]],["challenge",12]]],
                    ["row",[["column",[["clickable",31],["clickable",32]]],["column",[["row",[["upgrade",81],["upgrade",82],["upgrade",83]]],["bar","u9x"]]],["challenge",13]]]
                ],
                unlocked(){return hasUpgrade("s",35)||player.b.unlocked}
            },
        },
    },
    tabFormat: [ 
        ["display-text", function() { return getPointsDisplay() }],
        ["row",[["column",["main-display","prestige-button"]],"blank",                             
        ["display-text",function(){return "你有 "+format(player.points)+" 禁言点<br>你最多同时拥有 "+format(player.s.best,0)+" 禁言石<br>你共有 "+format(player.s.total,0)+" 禁言石<br>你在新的固化中花费了 "+formatTime(player.s.resetTime)+"<br>最佳固化时间为 "+formatTime(player.s.bestTime)+""}]]],
        ["microtabs","stones"] 
    ], 
    layerShown(){return true},
})
addLayer("b", {
    name: "brick",
    symbol: "禁言砖",
    position: 0,
    startData() { return {
        unlocked: false,
		points: zero,
        bestTime: n(1e309)
    }},
    color: "#ce723c",
    requires: new Decimal(5e26),
    resource: "禁言砖",
    baseResource: "禁言石",
    baseAmount() {return player.s.points},
    type: "normal",
    exponent: 0.1,
    gainMult() {
        mult = one
        if(player.s.outTime.gt(0)) mult = mult.mul(layers.s.outEffect(4))            
        return mult
    },
    gainExp() {
        exp = one.div(10000)
        if(hasUpgrade("b",16)) exp = one
        return exp
    },
    row: 3,
    doReset(resettingLayer){
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            layerDataReset(this.layer, kept)
        }
        player.b.bestTime=player.b.bestTime.min(player.b.resetTime)
        player.s.bestTime=n(86400)
    },
    hotkeys: [
        {key: "b", description: "B: 进行凝聚重置(禁言砖)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.s.total.gt(1e20)||player.b.unlocked},
    upgrades:{
        11: {
            title: "砖化练习",
            description: "打字冷却时间在计算完减法后/5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "禁言点强化",
            description: "禁言点获取x20",
            effect(){
                let eff = five.mul(4)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "禁言石强化",
            description: "禁言石获取x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "禁言点倍率强化",
            description: "禁言点倍增器的效果底数+1",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        15: {
            title: "均衡强化",
            description: "仅对信息获取-禁言点获取-禁言石获取x3,禁言点倍增器的效果底数+0.5",
            effect(){
                let eff = three
                return eff
            },effect2(){
                let eff = one.div(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())+",+"+format(this.effect2())},
            cost: new Decimal(1),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        16: {
            title: "恢复增长",
            description: "将禁言砖的获取指数恢复正常(1/50000➜1/10)",
            cost: new Decimal(0),
            unlocked(){return hasUpgrade("b",11)&&hasUpgrade("b",12)&&hasUpgrade("b",13)&&hasUpgrade("b",14)&&hasUpgrade("b",15)},
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "禁言砖墙",
            description: "禁言时间上限变为0s,升级'外部禁言''外部禁言?'免费,但在禁言石领域挑战中失效",
            cost: new Decimal(10),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "领域解锁",
            description: "你不需要通过完成挑战来解锁禁言石的更高层领域,但每完成一个领域挑战,使禁言石获取x10",
            effect(){
                let eff = one
                if(hasChallenge("s",11)) eff = eff.mul(10)
                if(hasChallenge("s",12)) eff = eff.mul(10)
                if(hasChallenge("s",13)) eff = eff.mul(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(15),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "额外释放",
            description: "释放效果1指数额外+1",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(50),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "自动固化",
            description: "每秒自动获取固化时能获取的100%禁言石",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"/%"},
            cost: new Decimal(250),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        25: {
            title: "???",
            description: "通关游戏(你还得完成禁言石领域III)",
            cost: new Decimal(2000),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
    },
    microtabs:{
        bricks:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["upgrades",[1,2,3]],["display-text", function() {if(false)return "到达 5e26 禁言石 解锁 "+quickColor("禁言砖","#ce723c")}],
                ],
            },
        },
    },
    tabFormat: [ 
        ["display-text", function() { return getPointsDisplay() }],
        ["row",[["column",["main-display","prestige-button"]],"blank",                             
        ["display-text",function(){return "你有 "+format(player.s.points)+" 禁言石<br>你最多同时拥有 "+format(player.b.best,0)+" 禁言砖<br>你共有 "+format(player.b.total,0)+" 禁言砖<br>你在新的凝聚中花费了 "+formatTime(player.b.resetTime)}]]],
        ["microtabs","bricks"] 
    ], 
})