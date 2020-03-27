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
    })   
}
var n = 0
var size = allbuttons.length
allbuttons.eq(n%size).trigger('click')
    .addClass('red')
    .siblings('.red').removeClass('red')
setInterval( () => {
    n += 1
    allbuttons.eq(n % size).trigger('click')
        .addClass('red')
        .siblings('.red').removeClass('red')    
},1000)