!function(){
    let result = `
/*
*准备一张黄颜色的画板
*/

.wapper-pikachu{
    flex: 1;
    width: 50vw;
    height: 100vh;
    border: 1px solid rgb(255,230,0);
    background: rgb(255, 230, 0);
    display: flex;
    justify-content: center;
    align-items: center;
}
.Pikachu{
    width: 422px;
    height: 240px;
    position: relative;
}

/*
*画皮卡丘的鼻子
*/

.nose{
    border: 14px solid;
    border-color: black transparent transparent;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 35px;
}

/*
*画皮卡丘的眼睛
*/

.eyes{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(46,46,46);
    border: 2px solid black;
    position: absolute;
}
.eyes::before{
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid;
    background-color: white;
    position: absolute;
    left: 5px;
}
.eyes.left{
    right: 50%;
    margin-right: 76px;
}
.eyes.right{
    left: 50%;
    margin-left: 76px;
}

/*
*画皮卡丘的腮红
*/

.face{
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background-color: rgb(255,0,0);
    border: 3px solid black;
    position: absolute;
    top: 112px;
}
.face.left{
    left: 0px;
}
.face.right{
    right: 0px;
}

/*
*画皮卡丘的嘴巴
*/

.lip{
    width: 88px;
    height: 35px;
    background: #FFE600;
    border: 3px solid black;
    position: absolute;
    top: 60px;
}
.lip.left{
    border-bottom-left-radius: 40px 30px;
    right: 50%;
    border-right: none;
    border-top: none;
    transform:rotate(-25deg);
}
.lip.right{
    border-bottom-right-radius: 40px 30px;
    left: 50%;
    border-top: none;
    border-left: none;
    transform:rotate(25deg);
}

/*
*画皮卡丘的舌头
*/

.wapper{
    position: absolute;
    overflow: hidden;
    width: 250px;
    height: 164px;
    bottom: 0px;
    left: 50%;
    margin-left: -125px;
}
.lowerLip{
    height: 2000px;
    width: 200px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -100px;
    border: 3px solid black;
    border-radius: 100px/500px;
    background-color: rgb(155, 0, 10);
    overflow: hidden;
}
.lowerLip::after{
    content: '';
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: absolute;
    bottom: -18px;
    left: 50%;
    margin-left: -75px;
    background-color: rgb(255,72,95);
}
`
let control = 15
function writeleft(preview,text,fn){
    let n = 0
    let timer
    timer = setTimeout( function run(){
        n += 1
        words.innerHTML = text.substring(0,n)
        style.innerHTML = text.substring(0,n)
        words.scrollTop = words.scrollHeight
        if (n<=text.length) {
            timer = setTimeout(run,control)
            fn&&fn.call()
        }
    },control) 
}

$('.buttons').on('click','button',(x)=>{
    let $button = $(x.currentTarget)
    let speed = $button.attr('data-speed')
    $button.addClass('active')
            .siblings('.active').removeClass('active')
    switch (speed) {
        case 'slow':
            control = 100
            break;
        case 'normal':
            control = 15
            break;
        case 'fast':
            control = 5
        break;
        default:
            break;
    }
})

writeleft('',result)
}.call()
