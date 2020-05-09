import './index.styl'

// const R = require('ramda')

import * as R from 'ramda'
import { getUrlParam } from '../../assets/js/uit'

// 状态对应的要显示的数组
const statusMap = new Map([
    [200, [5]],
    [300, [0, 1, 5]],
    [400, [0, 1, 2, 3, 5]],
    [500, [1, 0, 2, 3, 4, 5]]
]);


class Detail {
    constructor() {
        this.init()
    }


    async init() {

        // 获取url上的状态
        let status = getUrlParam('status')
        //获取需要的dom元素
        const dom = await this.getCommoDom()

        R.compose(
            R.map(i => $(dom.tabTitleArr[i]).css({ 'display': 'inline-block' })),
            i => {
                $(dom.tabTitleArr[i[0]]).addClass('layui-this')
                $(dom.tabContentArr[i[0]]).addClass('layui-show')
                return i
            },
            i => statusMap.get(parseInt(status))
        )()
    }

    getCommoDom() {
        return new Promise((resolve, reject) => {
            let tabTitleArr = $('.layui-tab-title').children()
            let tabContentArr = $('.layui-tab-content').children()

            resolve({
                tabTitleArr,
                tabContentArr
            })
        })

    }
}

$(function () {
    new Detail()
})