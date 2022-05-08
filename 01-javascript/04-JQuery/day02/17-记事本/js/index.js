;
(function() {
    // 3.计数
    function count() {
        // console.log($('#todoList li'))
        $('.todo-count strong').text($('#todoList li').length)
    }

    // 1.新增
    $('#addTodo').keyup(function(e) {
        if (e.keyCode === 13) {
            // console.log('回车')
            let value = $(this).val()
            if (value !== '') {
                console.log('输入了内容')
                $('#todoList').append(`
        <li style="display:none">
            <div class="view">
              <label>${value}</label>
              <button class="destroy"></button>
            </div>
          </li>`)

                // 先display：none，再通过动画展开
                $('#todoList li')
                    .last() // 最后一个li
                    .slideDown(function() {
                        count() // 动画播放完毕后计数
                    })

                // 清空输入框的值
                $(this).val('')
            }
        }
    })

    // 2.删除：因为是动态添加元素，所以要用事件委托
    $('#todoList').on('click', '.destroy', function() {
        let $li = $(this)
            .parent()
            .parent()
        $li.fadeOut(function() {
            $(this).remove()

            // $('.todo-count strong').text($('#todoList li').length)
            count() // 动画播放完毕后计数
        })
    })
})()