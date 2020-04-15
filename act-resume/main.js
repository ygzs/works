var result = `/*

*面试官你好，我是XXX

*只用文字作做我介绍太单调了

*我就用代码来介绍吧

*首先准备一些样式

*/

*{
    transition: all 1s;
}

html{
    background-color: #eee;
}

#words{
    border: 1px solid red;
    padding: 20px;
}

/*我需要一点代码高亮*/
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}

/*添加一点3D效果*/
#words{
    transform: rotate(360deg);
}

/*现在开始介绍一下自己*/
/*我需要一张白纸*/

*/`

var n = 0
var timer = setInterval( () => {
    n += 1
    words.innerHTML = result.substring(0,n)
    words.innerHTML = Prism.highlight( words.innerHTML, Prism.languages.css, 'css')
    style.innerHTML = result.substring(0,n)
    if (n>=result.length) {
        window.clearInterval(timer)
        fn2()
        fn3(result)
    }
},10)

function fn2(){
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
}

function fn3(){
    var result2 = `
#paper{
    width: 100px;
    height: 100px;
    background: red;
}
    `
    var n = 0
    var timer = setInterval( () => {
    n += 1
    words.innerHTML = result + result2.substring(0,n)
    words.innerHTML = Prism.highlight( words.innerHTML, Prism.languages.css, 'css')
    style.innerHTML = result + result2.substring(0,n)
    if (n>=result.length) {
        window.clearInterval(timer)
    }
    },10)
}