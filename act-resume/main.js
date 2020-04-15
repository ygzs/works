function writeleft(preview,text,fn){
    let n = 0
    let timer = setInterval( () => {
        n += 1
        words.innerHTML = Prism.highlight( preview + text.substring(0,n), Prism.languages.css, 'css')
        style.innerHTML = preview + text.substring(0,n)
        words.scrollTop = words.scrollHeight
        if (n>=text.length) {
            window.clearInterval(timer)
            fn.call()
        }
    },10) 
}

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
    padding: 40px;
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

`

var result2 = `
#words{
    position: fixed;
    left: 0px;
    width: 50%;
    height: 100%;
}
#paper{
    position: fixed;
    right: 0px;
    width: 50%;
    height: 100%;
    padding: 20px;
    background-color: darkgrey;
    display: flex;
    justify-content: center;
    align-items: center;
}
#content{
    width: 100%;
    height: 100%;
    background-color: white;
    padding-left: 16px;
}
`
var result3 = `
#   我是zp
    只见远处有一座迷蒙的巨峰突起，周围还有几十座小石峰。
    仔细一看，那巨峰像手握金箍棒的孙悟空，那些小峰就像抓耳腮的小猴。
    瞧瞧，孙悟空正领着它的孩子们向南天门杀去呢。
    微白的天空下，群山苍黑似铁，庄严、肃穆。
    红日初升，一座座山峰呈墨蓝色。
    紧接着，雾霭泛起，乳白的纱把重山间隔起来，
    只剩下青色的峰尖，真像一幅笔墨清爽、疏密有致的山水画。
    过了一阵儿，雾又散了，那裸露的岩壁，峭石，被霞光染得赤红，
    渐渐地又变成古铜色，与绿的树、绿的田互为映衬，显得分外壮美。
`


writeleft('', result, ()=>{
    createPaper( () => {
        writeleft(result, result2, ()=>{
            writeright(result3)
        })   
    })   
})

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.id = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeright(text,fn){
    let n = 0
    let timer = setInterval( () => {
        n += 1
        content.innerHTML = result3.substring(0,n)
        content.scrollTop = content.scrollHeight
        if (n>=text.length) {
            window.clearInterval(timer)
            fn.call()
        }
    },10) 
}