import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class ProjectList extends Component {

  static defaultProps = {
    list: []
  }

  render () {
    const { list } = this.props;
    return (
      <View className='index_listItem'>
        {
          list.map((item, index) => {
            return (
              <View key={item.id} className={index === 0 ? 'contentViewFirst' : 'contentView'}>
                <View className='content_img'>
                    <Image className='project_img' src={item.envelopePic}/>
                </View>
                <View className='project_content'>
                    <Text className='project_title' decode='true'>{item.title}</Text>
                    <Text className='project_desc' decode='true'>{item.desc}</Text>
                    <View className='project_author_data'>
                        <Text className='project_authortext'>{item.author}</Text>
                        <Text className='project_authortext'>{item.niceDate}</Text>
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
