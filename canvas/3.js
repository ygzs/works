var keys = {
    0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',length:10
}
var hash = {
    '0' : 'black' ,
    '1' : 'grey' ,
    '2' : 'red' ,
    '3' : 'yellow' ,
    '4' : 'green' ,
    '5' : 'blue' ,
    '6' : 'orange' ,
    '7' : 'brown' ,
    '8' : 'pink' ,
    '9' : 'purple' ,
}
var zzz
for(var index=0;index<10;index++){
    var row = keys[index]
    var button = document.createElement('button')
    button.id = row
    button.className = 'yanse'
    button.style.backgroundColor = hash[index]
    colour.appendChild(button) 
    button.onclick = function(abc){
        var xxx = abc['target']
        var yyy = xxx.id
        zzz = hash[yyy]
        console.log(abc)
        xxx.classList.add('active')
        var ppp = xxx.previousSibling
        ppp.classList.remove('active')
        //console.log(zzz)
    } 
}

//开始
var mm = document.getElementById('canvas')
var context = mm.getContext('2d')
var lineWidth = 3
var lastpoint = {x:undefined,y:undefined}

//调整canvas大小
page ()
window.onresize = function(){
    page()
}

//是否点击橡皮，铅笔
var flag = false
var useEraser = false
eraser.onclick = function(){
    useEraser = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    useEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

//线条
thin.onclick = function(){
    lineWidth = 3
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function(){
    lineWidth = 7
    thick.classList.add('active')
    thin.classList.remove('active')
}

//清除
clear.onclick = function(){
    context.clearRect(0,0,mm.width,mm.height)
}

//保存
save.onclick = function(){
    var url = mm.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = "我的图片"
    a.target = '_blank'
    a.click()
}


//判断设备
if ( document.body.ontouchstart !== undefined ) {           //手机
    mm.ontouchstart = function(a){
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        flag = true
        if(useEraser){
        context.clearRect(x-10,y-10,20,20)
        }
        else{
        lastpoint = {'x':x,'y':y} }
    }
    mm.ontouchmove = function(b){
        var x = b.touches[0].clientX
        var y = b.touches[0].clientY 
        if(flag){
            if(useEraser){
            context.clearRect(x-10,y-10,20,20)
            }
            else{       
            var newpoint = {'x':x,'y':y}
            line(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
            lastpoint = newpoint
        }
        }
    }
    mm.ontouchend = function(c){
        flag = false
    }
}
else{                   //电脑
    //按下鼠标
    mm.onmousedown = function(a){
    var x = a.clientX
    var y = a.clientY
    flag = true
    if(useEraser){
        context.clearRect(x-10,y-10,20,20)
    }
    else{
        lastpoint = {'x':x,'y':y}}
    }

    //移动鼠标
    mm.onmousemove = function(b){
    var x = b.clientX
    var y = b.clientY
    var i 
    if(flag){
        if(useEraser){
            context.clearRect(x-10,y-10,20,20)
        }
        else{       
        var newpoint = {'x':x,'y':y}
        line(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
        lastpoint = newpoint
        }
    }
    }

//离开鼠标
mm.onmouseup = function(c){
    flag = false
}
}




//函数
function page() {
    var pageheight = document.documentElement.clientHeight
    var pagewidth = document.documentElement.clientWidth
    mm.height = pageheight
    mm.width = pagewidth    
}
function line(x1,y1,x2,y2) {
    context.beginPath()
    context.strokeStyle = zzz
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}
