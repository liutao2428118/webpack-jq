const staySearchFormData = {
    "list": [
        { label: "姓名", type: "input", key: "name", required: "required" },
        { label: "日期", type: "date", key: "date", required: "required", elemid: "dateId" },
        { label: "现在日期", type: "date", key: "new_date", required: "required", elemid: "newId" },
        { label: "顾问", type: "input", key: "gname", required: "required" },
        { label: "客服", type: "input", key: "kname", required: "required" },
        {
            label: "年龄", type: "select", key: "age", required: "required", options: [
                {
                    key: '北京',
                    value: '1'
                },
                {
                    key: '上海',
                    value: '2'
                },
                {
                    key: '广州',
                    value: '3'
                },
                {
                    key: '深圳',
                    value: '4'
                },
                {
                    key: '杭州',
                    value: '5'
                },
            ]
        },
        { label: "电话", type: "input", key: "phone", required: "required" },
        { label: "城市", type: "checkbox", key: "cs", required: "required" },
        { label: "签订合同", type: "input", key: "ht", required: "required" },
    ]
}

const sallSearchFormData = {
    "list": [
        { label: "合同号", type: "input", key: "name", required: "required" },
        { label: "日期", type: "date", key: "name", required: "required", elemid: "dateId" },

    ]
}

const allocationSearchFormData = {
    "list": [
        { label: "顾问姓名", type: "input", key: "name", required: "required" },
        { label: "日期", type: "date", key: "name", required: "required", elemid: "dateId" },
        { label: "添加", type: "date", key: "name", required: "required", elemid: "newId" },
        { label: "顾问", type: "input", key: "name", required: "required" }
    ]
}

export default {
    staySearchFormData,
    sallSearchFormData,
    allocationSearchFormData
}