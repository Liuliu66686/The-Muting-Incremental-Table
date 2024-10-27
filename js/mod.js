let modInfo = {
	name: "禁言增量页",
	nameEN: "The Mute Table",// When you open the otherLanguageMod, this is the second language
	id: "bannedspeakingtableeeeeeeeeeeeee",
	author: "Liuliu66686与禁言增量频道的成员们",
	pointsName: "禁言点",
	modFiles: ["layers.js", "tree.js","functions.js"],

	otherLanguageMod: false,// When on, it will ask the player to choose a language at the beginning of the game
	languageMod: false,// Use when otherLanguageMod is off, default are true -> English, false -> Chinese
	//It offers a portable way to translate, but it is not recommended

	forceOneTab: false,// Enable Single-Tab Mode ( This feature doen't work fluently as you'd imagine, it's made for expert )
	showTab: 'tree-node',// if you open forceOneTab, it will show this page everytime you refresh the page

	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

var colors = {
	button: {
		width: '253px',//UI Button
		height: '40px',//UI Button
		font: '30px',//UI Button
		border: '3px'//UI Button
	},
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
}

// Set your version in num and name
let VERSION = {
	num: "0.1.2",
	name: "禁言石上时长现,领域解锁挑战come;_ _ _ _ _ _ _,_ _ _ _ _ _ _.",
}

function changelog(){
	return (options.ch || modInfo.languageMod==false)?`
		<br><br><br><h1>更新日志:</h1><br>(<span style='color: red'><s>懒得写</s></span>)<br>v0.1.2:`+VERSION.name+`<br>
		
		<span style="font-size: 17px;">
			<h3><s>不,你应该自己写这个</s></h3><br><br>
			<h3>v3.0 - 史无前例的改动</h3><br>
				- 开发了 The Modding Table, 这何尝不是一种TMT<br>
			<br><br>
		`:`
		<br><br><br><h1>ChangeLog:</h1><br>(No<span style='color: red'><s> Spoiler Warning!</s></span>)<br><br>
		<span style="font-size: 17px;">
			<h3><s>NO, YOU SHOULD WRITE THIS YOURSELF</s></h3><br><br>
			<h3>v3.0 - Unprecedented changes</h3><br>
				- Developed The Modding Table, Which, you could say, is another form of TMT<br>
			<br><br>
	`
} 

function winText(){
	return (options.ch || modInfo.languageMod==false)?`你暂时完成了游戏!`:`Congratulations! You have reached the end and beaten this game, but for now...`
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.m.mutingT.gt(0)||hasUpgrade("s",21)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	let gainpower = one
	if(hasUpgrade("m",31)) gain = gain.mul(upgradeEffect("m",31))
	if(hasUpgrade("m",41)) gain = gain.mul(upgradeEffect("m",41))
	if(hasUpgrade("s",12)) gain = gain.mul(upgradeEffect("s",12))
	if(hasUpgrade("s",25)) gain = gain.mul(upgradeEffect("s",25))
	if(hasUpgrade("s",33)) gain = gain.mul(upgradeEffect("s",33))
	if(hasUpgrade("s",35)) gain = gain.mul(upgradeEffect("s",35))
	if(getBuyableAmount("s",11).gt(0)) gain = gain.mul(buyableEffect("s",11))
	if(!player.m.mutingT.gt(0)&&hasUpgrade("s",21)) gain = gain.mul(upgradeEffect("s",21))
	if(player.m.mutingT.gt(0)&&hasUpgrade("s",22)) gain = gain.mul(upgradeEffect("s",22))
	
	if(inChallenge("s",11)) gainpower = gainpower.mul(0.25)

	gain = gain.pow(gainpower)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {

}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if(options.ch==undefined && modInfo.otherLanguageMod==true){return '<big><br>You should choose your language first<br>你需要先选择语言</big>'}
		return '<div class="res">'+displayThingsRes()+'</div><br><div class="vl2"></div></span>'
	}
]

// You can write stuff here to display them on top-left corner easily
function displayThingsRes(){
	let text = '禁言点: '+format(player.points)+' | 信息: '+format(player.m.points,0)+ " | "
	if(player.s.unlocked) text += "禁言石: " +format(player.s.points,0)+ " | "
	return text
}

// Determines when the game "ends"
function isEndgame() {
	return hasChallenge("s",11)
}

// 
function getPointsDisplay(){
	let a = ''
	if(player.devSpeed && player.devSpeed!=1){
		a += options.ch ? '<br>时间加速: '+format(player.devSpeed)+'x' : '<br>Dev Speed: '+format(player.devSpeed)+'x'
	}
	if(player.offTime!==undefined){
		a += options.ch ? '<br>离线加速剩余时间: '+formatTime(player.offTime.remain) : '<br>Offline Time: '+formatTime(player.offTime.remain)
	}
	a += '<br>'
	if(!(options.ch==undefined && modInfo.otherLanguageMod==true)){
		a += `<span class="overlayThing">${((options.ch || modInfo.languageMod==false)?"你有":"You have")} <h2  class="overlayThing" id="points"> ${format(player.points)}</h2> ${modInfo.pointsName}</span>`
		if(canGenPoints()){
			a += `<br><span class="overlayThing">(`+(tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OOM" + (tmp.other.oompsMag < 0 ? "^OOM" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen()))+`/sec)</span>`
		}
		a += `<div style="margin-top: 3px"></div>`
	}
	a += tmp.displayThings
	a += '<br><br>'
	return a
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
