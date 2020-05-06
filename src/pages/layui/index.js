import './index.styl'  //引入样式
import data from './data-form'



class MyClient {
    constructor() {
        this.laydate = layui.laydate //日期
        this.layer = layui.layer //弹层
        this.table = layui.table //表格
        this.element = layui.element //元素操作
        this.laytpl = layui.laytpl; //模板引擎
        this.form = layui.form;

        this.urlArr = ['/demo/list1', '/demo/list2', '/demo/list3']
        this.formArr = ['staySearchFormData', 'sallSearchFormData', 'allocationSearchFormData']
        this.list = null

        this.init()
    }

    init() {
        this.searchFormRende(data[this.formArr[0]])
        this.renderList(this.urlArr[0])
        this.dateFormInit()
        this.onAllOperation()

    }


    //监听layui内部的事件
    onAllOperation() {
        const _this = this
        this.element.on('tab(tabDem)', function () {
            let layIndex = parseInt(this.getAttribute('lay-id'))
            _this.renderList(_this.urlArr[layIndex - 1])
            _this.searchFormRende(data[_this.formArr[layIndex - 1]])
            _this.dateFormInit()

        });

        this.form.on('submit(formDemo)', function (data) {
            const d = Object.assign({}, data.field)
            _this.list.reload({
                where: d,
                page: { curr: 1 }
            });
            return false;
        });
    }

    // 日期的初始化
    dateFormInit() {
        this.laydate.render({
            elem: '#dateId'
        });
        this.laydate.render({
            elem: '#newId'
        });
    }

    // 渲染头部搜索表单
    searchFormRende(data) {
        var getTpl = $('#demo')[0].innerHTML
        this.laytpl(getTpl).render(data, (html) => {
            $('.search-form').html(html);
            this.form.render();
        });
    }

    // 渲染表格
    renderList(url) {
        //执行一个 table 实例
        this.list = this.table.render({
            elem: '#tabledemo'
            , height: 420
            , url: url //数据接口
            , title: '用户表'
            , page: true //开启分页
            , totalRow: true //开启合计行
            , cols: [[ //表头
                { type: 'checkbox', fixed: 'left' }
                , { field: 'id', title: 'ID', width: 200, sort: true, fixed: 'left' }
                , { field: 'username', title: '用户名', width: 200 }
                , { field: 'experience', title: '积分', width: 200, sort: true }
                , { field: 'sex', title: '性别', width: 200, sort: true }
                , { field: 'score', title: '评分', width: 200, sort: true }
                , { field: 'city', title: '城市', width: 200 }
                , { field: 'sign', title: '签名', width: 200 }
                , { field: 'classify', title: '职业', width: 200 }
                , { field: 'wealth', title: '财富', width: 200 }

            ]]
        });
    }
}

$(function () {

    new MyClient()

})









