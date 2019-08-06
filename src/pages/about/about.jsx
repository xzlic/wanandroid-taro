import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './about.scss'
import appIcon from '../../assets/app_icon.jpg';

export default class about extends Component {

  config = {
    navigationBarTitleText: '关于'
  }

  render(){
    return(
        <View className='about_view'>
            <Image className='appicon_img' src={appIcon}/>
            <Text className='about_text'>· 使用鸿洋大神wanandroid网站的开放api</Text>
            <Text className='about_text'>· 项目地址：https://github.com/xzlic/wanandroid-taro</Text>
            <Text className='about_text'>· 由于个人小程序不支持webview的使用，故文章只能复制链接到浏览器打开</Text>
        </View>
    )
  }
}