;
(function() {
    // 1.轮播图
    $('.xtx_banner ul').slick({
        prevArrow: '.prev', // 上一页按钮
        nextArrow: '.next',
        autoplay: true,
        dots: true, // 是否显示指示器(底部的小圆点)
        appendDots: '.indicator', // 修改指示器的位置
    })

    // 2.图片懒加载
    $('.lazyload').lazyload()
})()