import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './mine.scss'
import arrowIcon from '../../assets/arrow.png';

export default class mine extends Component {

  config = {
    navigationBarTitleText: '我的'
  }
  constructor(props){
    super(props)
    this.state = {
      userInfo: {}
    }
  }

  componentDidMount () {
    this.getUserInfo()
  }

  //获取用户信息
  getUserInfo(){
    Taro.getUserInfo().then((response) => {
      this.setState({
        userInfo: response.userInfo
      })
      console.log(response.userInfo.avatarUrl)
    })
  }

  //关于
  about = () =>{
    Taro.navigateTo({
      url: '/pages/about/about'
    })
  }

  render () {
    return (
      <View className='mineContent'>
        <View className='mineContent_top'>
          {
            JSON.stringify(this.state.userInfo) === '{}' ?
            <Button className='mine_button' plain={true} open-type="getUserInfo" onGetUserInfo={this.getUserInfo}> 获取头像昵称 </Button>
            :
            <View className='mineContent_userinfo'>
              <Image className='mine_headimg' src={this.state.userInfo.avatarUrl}/>
              <Text className='mine_nickName'>{this.state.userInfo.nickName}</Text>
            </View>
          }
        </View>
        <View className='mine_menuview'>
          <View className='mine_menuitem' onClick={this.about.bind(this)}>
              <Text className='mine_menuitem_text'>关于</Text>
              <Image className='arrow_img' src={arrowIcon}/>
          </View>
        </View>
      </View>
    )
  }
}
