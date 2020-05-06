import './index.styl'

import data from './data'
import Lucky from './lucky'

if (document.attachEvent) {
    alert("这个例子不支持 Old IE 哦")
}


const lucky = new Lucky()

lucky.init(data);

