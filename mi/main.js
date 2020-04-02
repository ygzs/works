$('#logo').on('mouseenter',function(){
    $('#logo>img').css({
        transform: 'translateX(55px)'
    })
    $('#logo>a').css({
        transform: 'translateX(55px)'
    })
})
$('#logo').on('mouseleave',function(){
    $('#logo>img').css({
        transform: 'translateX(0px)'
    })
    $('#logo>a').css({
        transform: 'translateX(0px)'
    })
})


let current =0
$('.main .allbuttons .previous').on('click',function(){
    current--
    goto(current)
})
$('.main .allbuttons .next').on('click',function(){
    current++
    goto(current)
})
function goto(index){
    if(index>4){
        index = 0
    }
    else if(index<0){
        index = 4
    }
    let s = index*-1226
    $('.picture').css({
        transform: 'translateX(' +s+ 'px)'
    })
    current = index
}