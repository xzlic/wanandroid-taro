import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import api from '../../utils/api'
import './index.scss'
import HomeList from './HomeList/HomeList'
import WxarticleView from './WxarticleView/WxarticleView'
import searchIcon from '../../assets/search_icon.png';
import shareIcon from '../../assets/share.png';

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
      nomore: false,
    }
  }

  //获取banner
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

  //获取微信公众号
  loadWXData(){
    api.get('wxarticle/chapters/json').then((response) => {
      this.setState({
        wxArticleList: response.data
      })
    })
  }

  //首页文章列表
  loadList(){
    this.setState({loading: true})
    let url = `article/list/${this.page}/json`
    api.get(url).then((response) => {
      if (response && response.data && response.data.datas){
        this.setState( prevState => ({
          listData: prevState.listData.concat(response.data.datas)
        }))
        if (response.data.datas.length === 0){
          this.setState({nomore: true})
        }else{
          this.setState({nomore: false})
        }
      }
      this.setState({loading: false})
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    }).catch((error) => {
      this.setState({loading: false})
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
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

  componentDidMount () {
    Taro.showLoading({
      title: '加载中...'
    })
    this.loadBannerData()
    this.loadWXData()
    this.loadTopList()
  }

  swiperItemClick = (url) => {
    // Taro.navigateTo({
    //   url: `/pages/webview/webviewPage?url=${url}`
    // })
    Taro.setClipboardData({data: url})
  }

  handleSearch = () => {
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='top_search'>
          <View className='top_searchinput' onClick={this.handleSearch.bind(this)}>
            <Image className='top_searchIcon' src={searchIcon}/>
            <Text className='top_searchinput_text'>请输入关键字</Text>
          </View>
        </View>
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
              {
                this.state.nomore &&
                <Text className='home_loading_text'>加载完毕</Text>
              }
            </View>
        }
        <Button className='share_button' open-type='share' >
          <Image className='share_image' src={shareIcon}/>
        </Button>
      </View>
    )
  }
}
