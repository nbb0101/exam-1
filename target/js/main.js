var tabSwiper = new Swiper('.tab', {
    onSlideChangeStart: function(e) {
        var index = e.activeIndex;
        $('nav span').eq(index).addClass('active').siblings().removeClass('active');
    }
})

for (let i = 0; i < $('nav span').length; i++) {
    $('nav span').eq(i).on('click', function() {
        tabSwiper.slideTo(i);
    })
};

var swiper = new Swiper('.banner', {
    autoplay: 1000,
    loop: true,
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction: false
});

$('footer').on('click', '.btn', function() {
    $(this).addClass('on').siblings().removeClass('on');
    var index = $(this).index();
    $('.btn-items .item').eq(index).show().siblings().hide();
})