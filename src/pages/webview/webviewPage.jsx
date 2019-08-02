import Taro, { Component } from '@tarojs/taro'
import { View, Text, WebView } from '@tarojs/components'
import './webviewPage.scss'

export default class webviewPage extends Component {

  config = {
    navigationBarTitleText: '详情'
  }

  constructor(props){
    super(props)
  }
  componentWillMount () { 
    this.url = decodeURIComponent(this.$router.params.url || '')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log(this.url)
    return (
      <View className='webview'>
        <WebView src={this.url}/>
      </View>
    )
  }
}
