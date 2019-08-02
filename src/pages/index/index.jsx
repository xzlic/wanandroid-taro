import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import api from '../../utils/api'
import './index.scss'
import HomeList from './HomeList/HomeList'
import WxarticleView from './WxarticleView/WxarticleView'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  }

  constructor(props){
    super(props)
    this.page = 0
    this.state = {
      data: [],
      listData: [],
      wxArticleList: [],
      loading: false,
    }
  }

  loadBannerData(){
    api.get('banner/json').then((response) => {
      this.setState({
        data: response.data
      })
    })
  }

  //置顶文章
  loadTopList(){
    let url = 'article/top/json'
    api.get(url).then((response) => {
      this.setState( {
        listData: response.data
      }, () => {
        this.loadList()
      })
    }).catch((error) => {
      this.loadList()
    })
  }

  loadWXData(){
    api.get('wxarticle/chapters/json').then((response) => {
      this.setState({
        wxArticleList: response.data
      })
    })
  }

  loadList(){
    this.setState({loading: true})
    let url = `article/list/${this.page}/json`
    api.get(url).then((response) => {
      this.setState( prevState => ({
        loading: false,
        listData: prevState.listData.concat(response.data.datas)
      }))
      Taro.stopPullDownRefresh()
    }).catch((error) => {
      this.setState({loading: false})
      Taro.stopPullDownRefresh()
    })
  }

  onPullDownRefresh(){
    this.setState({
      listData: []
    })
    this.loadBannerData()
    this.loadWXData()
    this.page = 0
    this.loadTopList()
  }

  onReachBottom(){
    this.page ++ 
    this.loadList()
  }

  componentWillMount () { }

  componentDidMount () {
    this.loadBannerData()
    this.loadWXData()
    this.loadTopList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  swiperItemClick = (url) => {
    Taro.navigateTo({
      url: `/pages/webview/webviewPage?url=${url}`
    })
  }

  render () {
    return (
      <View className='index'>
        <Swiper className='banner'
          autoplay
          circular
          indicatorDots
          indicatorColor='#999'
          indicatorActiveColor='#333'>
          {
            this.state.data.map((item,index) => {
              return <SwiperItem key={item.id} className='banner_swiperitem' onClick={this.swiperItemClick.bind(this, item.url)}>
                <Image className='banner_img' src={item.imagePath} mode='aspectFill'/>
              </SwiperItem>
            })
          }
        </Swiper>
        <WxarticleView list={this.state.wxArticleList}/>
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
