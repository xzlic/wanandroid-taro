import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './architecture.scss'
import api from '../../utils/api'
import { getWindowHeight } from '../../utils/style'

export default class architecture extends Component {

  config = {
    navigationBarTitleText: '体系'
  }

  constructor(props){
    super(props)
    this.state = {
      currentIndex: 0,
    }

  }

  //获取体系数据
  loadTreeList() {
    Taro.showLoading({
      title: '加载中...'
    })
    api.get('tree/json').then((response) => {
      this.setState({
        treeList: response.data
      })
      Taro.hideLoading()
    }).catch((error) => {
      Taro.hideLoading()
    })
  }

  //生成随机颜色
  getRandomColor(){
			let color="#";
			for(let i=0; i<6; i++){
				color += (Math.random()*16 | 0).toString(16);
			}
			return color;
  }

  componentDidMount () {
    this.loadTreeList()
  }

  handleItemCheck = (index) =>{
    if (index !== this.state.currentIndex){
      this.setState({
        currentIndex: index,
      })
    }
  }

  handleClick = (id, name) => {
    Taro.navigateTo({
      url: `/pages/acticleList/acticleList?id=${id}&name=${name}&type=0`
    })
  }
  render () {
    const windowHeight = getWindowHeight()
    let { currentIndex, treeList } = this.state
    return (
      <View className='arch_content'>
        <ScrollView scrollY className='arch_content_left' style={{height: windowHeight}}>
          {
            (treeList && treeList.length > 0) &&
            treeList.map((item, index) => 
              <View key={item.id} style={{borderTopWidth: index === 0 ? '0px' : '1px'}} className={currentIndex === index ? 'arch_listitem_select' : 'arch_listitem'} onClick={this.handleItemCheck.bind(this, index)}>
                <Text className={currentIndex === index ? 'arch_listtext_select' : 'arch_listtext'}>{item.name}</Text>
              </View>
            )
          }
        </ScrollView>
        <ScrollView scrollY className='arch_content_right' style={{height: windowHeight}}>
          <View className='arch_content_right_view'>
            <Text className='arch_right_title'>{treeList[currentIndex].name}</Text>
            <View className='arch_right_item_view'>
              {
                treeList && treeList.length > 0 && treeList[currentIndex].children ?
                  treeList[currentIndex].children.map((item, index) => 
                      <View key={item.id} className='arch_right_view' onClick={this.handleClick.bind(this, item.id, item.name)}>
                        <Text className='arch_right_text' style={{color: this.getRandomColor()}}>{item.name}</Text>
                      </View>
                    ) : null
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
