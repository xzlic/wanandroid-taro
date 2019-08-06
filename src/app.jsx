import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/project/project',
      'pages/architecture/architecture',
      'pages/mine/mine',
      'pages/webview/webviewPage',
      'pages/acticleList/acticleList',
      'pages/search/search',
      'pages/about/about'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#4596fe',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#666',
      selectedColor: '#4596fe',
      backgroundColor: '#fafafa',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/index/index',
        iconPath: './assets/tab-bar/home.png',
        selectedIconPath: './assets/tab-bar/home-active.png',
        text: '首页'
      },{
        pagePath: 'pages/project/project',
        iconPath: './assets/tab-bar/project.png',
        selectedIconPath: './assets/tab-bar/project-active.png',
        text: '项目'
      },{
        pagePath: 'pages/architecture/architecture',
        iconPath: './assets/tab-bar/tixi.png',
        selectedIconPath: './assets/tab-bar/tixi-active.png',
        text: '体系'
      },{
        pagePath: 'pages/mine/mine',
        iconPath: './assets/tab-bar/mine.png',
        selectedIconPath: './assets/tab-bar/mine-active.png',
        text: '我的'
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
