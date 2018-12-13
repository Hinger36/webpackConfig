import '@/common/reset.css'
import '@/common/common.scss'
import './index.scss'

import Typed from 'typed.js'

// import lottie from 'lottie-web'
// const element = document.querySelector('.container')
// lottie.loadAnimation({
//     container: element, // the dom element that will contain the animation
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: '../../../static/data.json' // the path to the animation json
//     // path: 'https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json'
//     // path: animateJsonPath
// });
const typedMen = new Typed('.customer.men', {
    strings: [`<div class="sex">性别：男</div>
        <div class="age">年龄：20~30</div>
        <div class="hobby">爱好品牌：爱马仕 古驰 CK</div>`],
    typeSpeed: 50,
    loop: true,
    backSpeed: 0,
    backDelay: 3000
})

const typedWomen = new Typed('.customer.women', {
    strings: [`
        <div class="sex">性别：<p>女</p></div>
        <div class="age">年龄：<p>20~25</p></div>
        <div class="hobby">爱好品牌：<p>古驰 CHANEL</p></div>`],
    typeSpeed: 30,
    loop: true,
    backSpeed: 0,
    backDelay: 3000
})
