import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './HomeList.scss'

export default class HomeList extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (link) => {
    Taro.setClipboardData({data: link})
  }

  render () {
    const { list } = this.props;
    return (
      <View className='index'>
        {
          list.map((item, index) => {
            let title = item.title
            //替换掉html标签
            title = title.replace(/<[^>]+>/g, "")
            //替换汉字符号
            title = title.replace(/&amp;/g, "、")
            title = title.replace(/&mdash;/g, "-")
            title = title.replace(/&ldquo;/g, "“")
            title = title.replace(/&rdquo;/g, "”")
            return (
              <View key={item.id} className='contentView' onClick={this.handleClick.bind(this, item.link)}>
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
                <Text className='homelist_title' decode='true'>{title}</Text>
                <View className='homelist_bottom'>
                  {
                    item.chapterName && item.chapterName !== '' ?
                    <View className='homelist_bottom_chapterNameView'>
                      <Text className='homelist_bottom_chapterNameText'>{item.chapterName}</Text>
                    </View> : null
                  }
                  {
                    item.superChapterName && item.superChapterName !== '' ?
                    <View className='homelist_bottom_chapterNameView' style={{marginLeft: '5px'}}>
                      <Text className='homelist_bottom_chapterNameText'>{item.superChapterName}</Text>
                    </View> : null
                  }
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
