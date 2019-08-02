import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './WxarticleView.scss'

const colorList = ['#ec407a', '#ab47bc', '#29b6f6', '#ee8360', '#26a69a', '#ef5350', '#2baf2b', '#ffa726'];
export default class WxarticleView extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (id, name) => {
    Taro.navigateTo({
      url: `/pages/acticleList/acticleList?id=${id}&name=${name}&type=1`
    })
  }

  render () {
    const { list } = this.props;
    return (
      <ScrollView className='wx_scrollView' scrollX>
        {
          list.map((item, index) => {
            let subname = item.name.length > 0 ? item.name.substr(0, 1) : ''
            return (
              <View key={item.id} className='wx_itemView' onClick={this.handleClick.bind(this, item.id, item.name)}>
                <View className='wx_itemContentView'>
                  <View className='wx_authorHead' style={{backgroundColor: colorList[index % colorList.length]}}>
                      <Text className='wx_authorHeadText'>{subname}</Text>
                  </View>
                  <Text className='wx_authorName'>{item.name}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}
