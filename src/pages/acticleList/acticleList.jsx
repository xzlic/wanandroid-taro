import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
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
    this.type = this.$router.params.type  // type 0 体系文章  1 微信公众号文章 2 搜索文章
    this.name = this.$router.params.name
    this.id = this.$router.params.id
    this.page = this.type === '1' ? 1 : 0
    this.key = ''
    if (this.name){
      Taro.setNavigationBarTitle({ title: this.name })
    }
    this.state = {
      listData: [],
      loading: false,
      nomore: false,
    }
  }

  //获取文章
  loadArticleList(loading = true) {
    let url = ''
    if(this.type === '2'){
      url = `article/query/${this.page}/json`
      loading && this.setState({loading: true})
      api.post(url, {k: this.name}).then((response) => {
        if (response && response.data && response.data.datas){
          this.setState( prevState => ({
            listData: this.page == 0 ? response.data.datas : prevState.listData.concat(response.data.datas),
          }))
          if (response.data.datas.length === 0){
            this.setState({nomore: true})
          }else{
            this.setState({nomore: false})
          }
        }
        this.setState({loading: false})
        Taro.stopPullDownRefresh()
      }).catch((error) => {
        this.setState({loading: false})
      })
    } else {
      if (this.type === '1'){
        url = `wxarticle/list/${this.id}/${this.page}/json?k=${this.key}`
      } else if (this.type === '0'){
        url = `article/list/${this.page}/json?cid=${this.id}`
      }
      loading && this.setState({loading: true})
      api.get(url).then((response) => {
        if (response && response.data && response.data.datas){
          if (this.type === '1'){
            this.setState( prevState => ({
              listData: this.page == 1 ? response.data.datas : prevState.listData.concat(response.data.datas),
            }))
          } else {
            this.setState( prevState => ({
              listData: this.page == 0 ? response.data.datas : prevState.listData.concat(response.data.datas),
            }))
          }
          if (response.data.datas.length === 0){
            this.setState({nomore: true})
          }else{
            this.setState({nomore: false})
          }
        }
        this.setState({loading: false})
        Taro.stopPullDownRefresh()
      }).catch((error) => {
        this.setState({loading: false})
      })
    }
  }

  onPullDownRefresh(){
    this.page = this.type === '1' ? 1 : 0
    this.loadArticleList(false)
  }

  onReachBottom(){
    if(!this.state.nomore){
      this.page ++ 
      this.loadArticleList()
    }
  }

  componentDidMount () {
    this.loadArticleList()
  }

  //输入
  handleInput = (e) => {
    this.key = e.detail.value
  }

  //搜索
  handleSearch = () => {
    this.page = this.type === '1' ? 1 : 0
    this.loadArticleList(false)
  }

  render () {
    return (
      <View className='index'>
        {
          this.type === '1' &&
            <View className='top_search'>
              <Input className='top_searchinput' placeholder='请输入关键字' onInput={this.handleInput.bind(this)}></Input>
              <View className='top_searchbutton' onClick={this.handleSearch.bind(this)}>
                <Text className='top_searchtext'>搜索</Text>
              </View>
            </View>
        }
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
      </View>
    )
  }
}
