/* $(b1).on('click',function () {
    $(images).css({
        transform:'translateX(0)'
    })
})
$(b2).on('click',function () {
    $(images).css({
        transform:'translateX(-720px)'
    })
})
$(b3).on('click',function () {
    $(images).css({
        transform:'translateX(-1440px)'
    })
})
$(b4).on('click',function () {
    $(images).css({
        transform:'translateX(-2160px)'
    })
})
$(b5).on('click',function () {
    $(images).css({
        transform:'translateX(-2880px)'
    })
}) */
var allbuttons = $('#buttons > button')
for (let i = 0; i < allbuttons.length; i++) {
    $(allbuttons[i]).on('click',function (x) {
        var index = $(x.currentTarget).index()
        var s = index * -720
        $(images).css({
            transform:'translateX(' + s + 'px)'
        })
        n = index
        activebutton(allbuttons.eq(n))
    })   
}

var n = 0
var size = allbuttons.length

play(n%size)

var timer = setTimer()

$('.windows').on('mouseenter',function(){
    window.clearInterval(timer)
})

$('.windows').on('mouseleave',function(){
    timer = setTimer()
})


//函数
function activebutton($button){
    $button
    .addClass('red')
    .siblings('.red').removeClass('red')
}
function play(index){
    allbuttons.eq(index).trigger('click')  
}
function setTimer(){
    return setInterval( () => {
        n += 1
        play(n%size)   
    },1000)    
}