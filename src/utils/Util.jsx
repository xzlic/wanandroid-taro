import Taro from '@tarojs/taro'

export default {
    showToast(msg){
        Taro.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
        })
    }
}