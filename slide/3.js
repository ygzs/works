$('.images > img:nth-child(1)').addClass('current')
$('.images > img:nth-child(2)').addClass('enter')
$('.images > img:nth-child(3)').addClass('enter')
$('.images > img:nth-child(4)').addClass('enter')
$('.images > img:nth-child(5)').addClass('enter')

let n = 1


/*setInterval( ()=>{
    $(`img:nth-child(${x(n)})`).removeClass('current enter').addClass('leave')
     .one('transitionend',(a)=>{
         $(a.currentTarget).removeClass('current leave').addClass('enter')
     })
     $(`img:nth-child(${x(n+1)})`).removeClass('leave enter').addClass('current')
     n=n+1
},3000)*/


setInterval( () =>{
    makeLeave(getn(n))
     .one('transitionend',(e) => {
            makeEnter($(e.currentTarget))
        })
        makeCurrent(getn(n+1))
    n += 1
},3000)




function getn(n){
    return $(`img:nth-child(${x(n)})`)
}

function x(a){
    if(a>5){
        a=a%5
        if(a===0){
            a=5
        }
    }
    return a
}

function makeCurrent($node){
    $node.removeClass('leave enter').addClass('current')
}
function makeEnter($node){
    $node.removeClass('leave current').addClass('enter')
}
function makeLeave($node){
    $node.removeClass('current enter').addClass('leave')
    return $node
}