import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../utils/api'
import './search.scss'
import Util from '../../utils/Util';
const colorList = ['#ec407a', '#ab47bc', '#29b6f6', '#ee8360', '#26a69a', '#ef5350', '#2baf2b', '#ffa726'];

export default class search extends Component{
  config = {
    navigationBarTitleText: '搜索'
  }

  constructor(props){
      super(props)
      this.state = {
          hotkey: {},
          inputValue: '',
      }
  }

  //搜索热词
  loadHotKey(){
    api.get('hotkey/json').then((response) => {
        this.setState({
            hotkey: response.data
        })
    })
  }

  componentDidMount(){
    this.loadHotKey()
  }

  //输入
  handleInput = (e) => {
    this.setState({
        inputValue: e.detail.value
    })
  }

  //搜索
  handleSearch = () => {
    if(this.state.inputValue !== ''){
        Taro.navigateTo({
            url: `/pages/acticleList/acticleList?id=0&name=${this.state.inputValue}&type=2`
        })
    }else{
        Util.showToast('请输入关键字')
    }
  }

  //点击搜索热词
  handleClick = (name) => {
    this.setState({
        inputValue: name
    }, () => {
        this.handleSearch()
    })
  }

  render(){
      let { hotkey, inputValue } = this.state;
      return(
          <View>
            <View className='top_search'>
                <Input className='top_searchinput' value={inputValue} placeholder='请输入关键字' focus={true} onInput={this.handleInput.bind(this)}></Input>
                <View className='top_searchbutton' onClick={this.handleSearch.bind(this)}>
                    <Text className='top_searchtext'>搜索</Text>
                </View>
            </View>
            <View className='hotkey_view'>
                <Text className='hotkey_title'>搜索热词</Text>
                <View className='hotkey_item_view'>
                {
                    hotkey && hotkey.length > 0 ?
                        hotkey.map((item, index) => 
                            <View key={item.id} className='hotkey_content' onClick={this.handleClick.bind(this, item.name)}>
                                <Text className='hotkey_text' style={{color: colorList[index % 8]}}>{item.name}</Text>
                            </View>
                        ) : null
                }
                </View>
            </View>
          </View>
      )
  }
}
