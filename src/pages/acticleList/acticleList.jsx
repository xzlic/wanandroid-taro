import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './acticleList.scss'
import api from '../../utils/api'
import HomeList from '../index/HomeList/HomeList'

export default class acticleList extends Component {

  config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  }

  constructor(props){
    super(props)
    this.page = 0
    this.type = this.$router.params.type  // type=1 微信公众号文章
    this.name = this.$router.params.name
    this.id = this.$router.params.id
    if (this.name){
      Taro.setNavigationBarTitle({ title: this.name })
    }
    this.state = {
      listData: [],
      loading: false,
    }
  }


  loadArticleList(loading = true) {
    let url = ''
    if (this.type === 1){
      url = `wxarticle/list/${this.page}/${this.id}/json`
    } else {
      url = `article/list/${this.page}/json?cid=${this.id}`
    }
    loading && this.setState({loading: true})
    api.get(url).then((response) => {
      this.setState( prevState => ({
        listData: this.page == 0 ? response.data.datas : prevState.listData.concat(response.data.datas),
        loading: false,
      }))
      Taro.stopPullDownRefresh()
    }).catch((error) => {
      this.setState({loading: false})
    })
  }

  onPullDownRefresh(){
    this.page = 0
    this.loadArticleList(false)
  }

  onReachBottom(){
    this.page ++ 
    this.loadArticleList()
  }

  componentWillMount () { }

  componentDidMount () {
    this.loadArticleList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <HomeList list={this.state.listData} />
        {
          this.state.loading ?
            <View className='home_loading'>
              <AtActivityIndicator mode='center' content='加载中...' color='#4596fe'></AtActivityIndicator>
            </View>
            : 
            <View className='home_loading'>
            </View>
        }
      </View>
    )
  }
}
