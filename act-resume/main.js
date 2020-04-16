var result = `/**面试官你好，我是XXX

*只用文字作做我介绍太单调了

*我就用代码来介绍吧

*首先准备一些样式

*/
html{
    background-color: rgb(45,45,45);
    color: white;
}

*{
    transition: all 1s;
}

#words{
    height: 100vh;
    overflow: auto;
    font-size: 16px;
    font-family: 'Times New Roman';
    line-height: 1.5em;
    padding: 30px;
    position: fixed;
    left: 0px;
    width: 50%;
    border: 1px solid white;
}

/*我需要高亮一些代码*/
.token.selector{
    color: #cc99cd;
}
.token.property{
    color: #f8c555;
}

/*添加一点3D效果*/
#words{
    transform: rotateY(-360deg);
}

/*现在开始介绍一下自己*/

/*首先需要一个桌面,请看右边*/
`

var result2 = `
#paper{
    background-color: darkgrey;
    position: fixed;
    right: 0px;
    width: 50%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/*再来一张白纸*/
#content{
    background-color: white;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'KaiTi';
    overflow: auto;
    width: 100%;
    height: 100%;
    padding-left: 16px;
    color: black;
}

/*开始*/
`

var result3 = `
# 自我介绍
大家好！
我叫 zp
1997 年 6 月 1 日出生
河南师范大学毕业
自学前端小半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JS CSS HTML

# 项目介绍
1. 无缝轮播
2. 个人简历
3. 自制画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

var result4 = `
/*把markdown变成html格式*/

/*调整一下简历的样式*/

p,ol,ul{
    margin-left: 1em;
}
p{
    line-height: 1.5em;
}

/*谢谢观看！*/
`




function writeleft(preview,text,fn){
    let n = 0
    let timer = setInterval( () => {
        n += 1
        words.innerHTML = Prism.highlight( preview + text.substring(0,n), Prism.languages.css, 'css')
        style.innerHTML = preview + text.substring(0,n)
        words.scrollTop = words.scrollHeight
        if (n>=text.length) {
            window.clearInterval(timer)
            fn&&fn.call()
        }
    },15) 
}


function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.id = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn&&fn.call()
}


function writeright(text,fn){
    let n = 0
    let timer = setInterval( () => {
        n += 1
        content.innerHTML = result3.substring(0,n)
        content.scrollTop = content.scrollHeight
        if (n>=text.length) {
            window.clearInterval(timer)
            fn&&fn.call()
        }
    },20) 
}

function markdownToHtml(text,fn){
    setTimeout( ()=>{
        content.innerHTML = marked(text)
        content.scrollTop = content.scrollHeight
        fn&&fn.call()
    },20)
}

writeleft('', result, ()=>{
    createPaper( () => {
        writeleft(result, result2, ()=>{
            writeright(result3, ()=>{
                markdownToHtml(result3, ()=>{
                    writeleft(result+result2,result4)
                })
            })
        })   
    })   
})

