var pageOption = {
        firstBtnText: '首页',
        lastBtnText: '末页',
        showInfo: true,
        infoFormat: '共{total}条',
        pageElementSort: ['$page', '$info'],
        pageBtnCount: 9,
        showJump: false,
        showPageSizes: false,
        pageSize: 10,
        total: 0
    };

/**
 * [ajaxQuery ajax请求]
 * @param  {Function} callback [请求成功时回调函数]
 * @param  {string}   url      [请求url]
 * @param  {string}   data      [请求参数]
 * @param  {string}   type      [请求类型，默认为get]
 */
function ajaxQuery(callback, url, data, type) {
    var dataInput = data || {},
        typeInput = type || 'GET';

    if (typeInput.toLowerCase() === 'post') {
        dataInput = JSON.stringify(dataInput);
    }

    $.ajax({
        url: url,
        type: typeInput,
        contentType: 'application/json;charset=utf-8',
        data: dataInput,
        success: function(data) {
            callback(data);
        }
    });
}

function getNavBar() {
    function callback(msg) {
        msg = {
            result: [
                {id: '1', name: '交通出行', count : 300},
                {id: '2', name: '脱贫攻坚', count : 300},
                {id: '3', name: '交通出行', count : 300},
                {id: '4', name: '交通出行', count : 300},
                {id: '5', name: '交通出行', count : 300},
                {id: '6', name: '交通出行', count : 300},
                {id: '7', name: '交通出行', count : 300}
            ]
        };
        var stringHtml = '',
            i = 0,
            eachData,
            len = msg.result.length;

        for (; i < len; i++) {
            eachData = msg.result[i];
            stringHtml += '<li data-id="'+eachData.id + '">' + eachData.name +'(' + eachData.count +')</li>';
        }

        $('#navBarParent').html(stringHtml).find('li').eq(0).click();
    }
    // ajaxQuery(callback, '/api/special/getSpecialList');
    callback();
}

function getContent(typeId, pageSize, pageNo) {
    var dataInput = {
        pageSize: pageSize || 10,
        pageNo: pageNo || 1,
        typeId: typeId
    };
    function callback(msg) {
    msg = {
            result: [
                {content: '015年11月27日至28日，中国中央扶贫开发工作会议在北京召开。中共中央总书记、国家主席、中央军委主席习近平强调，消除贫困、改善民生、逐步实现共同富裕，是社会主义的本质要求，是中国共产党的重要使命。全面建成小康社会，是中国共产党对中国人民的庄严承诺。脱贫攻坚战的冲锋号已经吹响。立下愚公移山志，咬定目标、苦干实干，坚决打赢脱贫攻坚战，确保到2020年所有贫困地区和贫困人口一道迈入全面小康社会', type: '交通出行', phone : '1565555555', address: '新华网'},
                {content: '015年11月27日至28日，中国中央扶贫开发工作会议在北京召开。中共中央总书记、国家主席、中央军委主席习近平强调，消除贫困、改善民生、逐步实现共同富裕，是社会主义的本质要求，是中国共产党的重要使命。全面建成小康社会，是中国共产党对中国人民的庄严承诺。脱贫攻坚战的冲锋号已经吹响。立下愚公移山志，咬定目标、苦干实干，坚决打赢脱贫攻坚战，确保到2020年所有贫困地区和贫困人口一道迈入全面小康社会', type: '交通出行', phone : '1565555555', address: '新华网'},
                {content: '015年11月27日至28日，中国中央扶贫开发工作会议在北京召开。中共中央总书记、国家主席、中央军委主席习近平强调，消除贫困、改善民生、逐步实现共同富裕，是社会主义的本质要求，是中国共产党的重要使命。全面建成小康社会，是中国共产党对中国人民的庄严承诺。脱贫攻坚战的冲锋号已经吹响。立下愚公移山志，咬定目标、苦干实干，坚决打赢脱贫攻坚战，确保到2020年所有贫困地区和贫困人口一道迈入全面小康社会', type: '交通出行', phone : '1565555555', address: '新华网'},
                {content: '015年11月27日至28日，中国中央扶贫开发工作会议在北京召开。中共中央总书记、国家主席、中央军委主席习近平强调，消除贫困、改善民生、逐步实现共同富裕，是社会主义的本质要求，是中国共产党的重要使命。全面建成小康社会，是中国共产党对中国人民的庄严承诺。脱贫攻坚战的冲锋号已经吹响。立下愚公移山志，咬定目标、苦干实干，坚决打赢脱贫攻坚战，确保到2020年所有贫困地区和贫困人口一道迈入全面小康社会', type: '交通出行', phone : '1565555555', address: '新华网'},
                {content: '015年11月27日至28日，中国中央扶贫开发工作会议在北京召开。中共中央总书记、国家主席、中央军委主席习近平强调，消除贫困、改善民生、逐步实现共同富裕，是社会主义的本质要求，是中国共产党的重要使命。全面建成小康社会，是中国共产党对中国人民的庄严承诺。脱贫攻坚战的冲锋号已经吹响。立下愚公移山志，咬定目标、苦干实干，坚决打赢脱贫攻坚战，确保到2020年所有贫困地区和贫困人口一道迈入全面小康社会', type: '交通出行', phone : '1565555555', address: '新华网'}
            ],
            total: 300
        };
        var stringHtml = '',
            i = 0,
            eachData,
            len = msg.result.length;

        for (; i < len; i++) {
            eachData = msg.result[i];
            stringHtml += '<li><p>' + eachData.content +'</p><div class="gray-color"><span class = "col-3"><i class="iconfont icon-bianji2"></i>' + eachData.type +'</span><span class = "col-3"><i class="iconfont icon-tubiao"></i>' + eachData.phone +'</span><span class = "col-6"><i class="iconfont icon-dingwei"></i>' + eachData.address + '</span><div class="clear-fix"></div> </div></li>';
        }

        $('#contentParent').html(stringHtml);

        pageOption.total = msg.total;

        if (!$('#app-store-pagination').pagination()) {
            $('#app-store-pagination').pagination(pageOption).on('pageClicked  jumpClicked', function(event, data) {
                    self.getContent(typeId, data.pageSize, data.pageIndex + 1);
                });
        } else {
            if (pageNoI === 1) {
                $('#app-store-pagination').pagination('setPageIndex', 0);
            }

            $('#app-store-pagination').pagination('render', [msg.total]);
        }
    }
    // ajaxQuery(callback, '/api/special/getSpecialList');
    callback();
}

$(document).ready(function(){
    $('#navBarParent').on('click', 'li', function() {
        var $this = $(this);
        $this.parent().find('li').removeClass('selected');
        $this.addClass('selected');
        getContent($this.data('id'));
    });
    getNavBar();
});
