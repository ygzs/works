let $firstimg = $('#images > img').eq(0).clone(true)
let $lastimg = $('#images > img').eq(4).clone(true)

$('#images').css({
    transform: 'translateX(-400px)'
})

$('#images').append($firstimg)
$('#images').prepend($lastimg)

let current = 0

$('#buttons>button').on('click',function(x){
    let index = $(x.currentTarget).index()
    goto(index)
})

$('.previous').on('click',function(){
    goto(current-1)
})
$('.next').on('click',function(){
    goto(current+1)
})

setInterval(function(){
    goto(current+1)
},2000)

//
function goto(index){
    if(index > $('#buttons>button').length-1){
        index = 0
    }
    else if(index < 0){
        index = $('#buttons>button').length-1
    }
    if(current === $('#buttons>button').length-1 && index === 0){
        $('#images').css({
            transform: 'translateX( ' +(current+2) * -400+ 'px)'
        })
        .one('transitionend',function(){
            $('#images').hide()
                .offset()
            $('#images').css({
                transform: 'translateX( ' +(index+1) * -400+ 'px)'
            })
            .show()   
        })
    }
    else if(current === 0 && index === $('#buttons>button').length-1){
        $('#images').css({
            transform: 'translateX(0px)'
        })
        .one('transitionend',function(){
            $('#images').hide()
                .offset()
            $('#images').css({
                transform: 'translateX( ' +(index+1) * -400+ 'px)'
            })
            .show()   
        })
    }
    else{
        $('#images').css({
            transform: 'translateX( ' +(index+1) * -400+ 'px)'
        })
    }
    current = index
}








