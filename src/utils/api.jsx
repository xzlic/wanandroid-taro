import Taro from '@tarojs/taro'

export const baseUrl = "https://www.wanandroid.com/"

const token = ''
export default {
    baseOptions(params, method = 'GET') {
        let { url, data } = params
        console.log('params', params)
        let contentType = 'application/x-www-form-urlencoded'
        contentType = params.contentType || contentType
        return new Promise((resolve, reject) => { 
            Taro.request({
                isShowLoading: false,
                loadingText: '正在加载',
                url: baseUrl + url,
                data: data,
                method: method,
                header: { 'content-type': contentType, 'token': token },
                success(res) {
                    resolve(res.data)
                },
                error(e) {
                    reject(e)
                    console.log('api', '请求接口出现问题')
                }
            })
        })
    },

    get(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option)
    },
    post(url, data, contentType) {
        let params = { url, data, contentType }
        return this.baseOptions(params, 'POST')
    }
}