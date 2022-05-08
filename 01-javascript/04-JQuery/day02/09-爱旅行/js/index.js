;
(function() {
    // 0.默认隐藏返回顶部
    $('.gotop').hide()

    // 返回顶部功能
    // 1.注册滚动事件
    $(window).scroll(function() {
        // console.log('scroll')
        let top = $('html').scrollTop()

        // console.log('top:', top)
        if (top > 200) {
            $('.gotop')
                .stop() // 为了把之前的动画停掉
                .fadeIn()
        } else {
            $('.gotop')
                .stop() // 为了把之前的动画停掉
                .fadeOut()
        }
    })

    // 2.点击返回顶部
    $('.gotop').click(function() {
        $('html').animate({
            scrollTop: 0
        })
    })

    // 意见反馈功能
    // 3.点击展开
    $('.suggest').click(function() {
        $('.sugform').slideDown()
    })

    // 4.点击收起
    $('.close').click(function() {
        $('.sugform').slideUp()
    })

    // 自动轮播
    function autoPlay() {
        let $last = $('.wblist').last()
        let $wbdesc = $('.wbdesc')
        $wbdesc.prepend($last) // 把最后的元素放到第一个（因为下一个轮播的就是它）
        let height = $last.outerHeight(true)
        console.log(height)
        $wbdesc.css('top', -height) // 修改定位为负值，准备下一个轮播的就是它
        $wbdesc.delay(2000).animate({ top: 0 }, function() {
            autoPlay()
        })
    }
    autoPlay()
})()