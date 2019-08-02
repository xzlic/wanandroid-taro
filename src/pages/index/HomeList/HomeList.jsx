import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './HomeList.scss'

export default class HomeList extends Component {
  static defaultProps = {
    list: []
  }

  render () {
    const { list } = this.props;
    return (
      <View className='index'>
        {
          list.map((item, index) => {
            return (
              <View key={item.id} className='contentView'>
                <View className='homelist_top'>
                  <View className='homelist_topchapter'>
                    {
                      item.type === 1 &&
                      <View className='homelist_bottom_chapterNameView' style={{borderColor: '#ff0000'}}>
                        <Text className='homelist_bottom_chapterNameText' style={{color: '#ff0000'}}>置顶</Text>
                      </View>
                    }
                    {
                      item.fresh &&
                      <View className='homelist_bottom_chapterNameView' style={{borderColor: '#ff0000', marginLeft: item.type === 1 ? '5px' : '0px'}}>
                        <Text className='homelist_bottom_chapterNameText' style={{color: '#ff0000'}}>新</Text>
                      </View>
                    }
                    <Text className='homelist_top_author' style={{marginLeft: item.type === 1 || item.fresh ? '5px' : '0px'}}>{item.author}</Text>
                  </View>
                  <Text className='homelist_top_niceDate'>{item.niceDate}</Text>
                </View>
                <Text className='homelist_title' decode='true'>{item.title}</Text>
                <View className='homelist_bottom'>
                  <View className='homelist_bottom_chapterNameView'>
                    <Text className='homelist_bottom_chapterNameText'>{item.chapterName}</Text>
                  </View>
                  <View className='homelist_bottom_chapterNameView' style={{marginLeft: '5px'}}>
                    <Text className='homelist_bottom_chapterNameText'>{item.superChapterName}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
