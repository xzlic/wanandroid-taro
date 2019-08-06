import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './project.scss'
import Tab from '../component/tab/tab.jsx'
import api from '../../utils/api'
import ProjectList from '../component/ProjectList'

export default class project extends Component {

  config = {
    navigationBarTitleText: '项目',
    onReachBottomDistance: 50,
  }

  constructor(props){
    super(props)
    this.page = 1
    this.currentid = ''
    this.state = {
      treeList: [],
      current: 0,
      dataList: [],
    }
  }

  onReachBottom(){
    this.page ++ 
    if(this.currentid !== ''){
      this.loadProjectList(this.currentid)
    }
  }

  //获取项目类型
  loadTreeList() {
    Taro.showLoading({
      title: '加载中...'
    })
    api.get('project/tree/json').then((response) => {
      this.setState({
        treeList: response.data
      })
      if (response && response.data && response.data.length > 0){
        this.currentid = response.data[0].id
        this.loadProjectList(this.currentid)
      }
    }).catch((error) => {
      Taro.hideLoading()
    })
  }

  //获取项目列表
  loadProjectList(cid) {
    api.get(`project/list/${this.page}/json?cid=${cid}`).then((response) => {
      console.log(response.data.datas)
      this.setState( prevState => ({
        dataList: this.page == 1 ? response.data.datas : prevState.dataList.concat(response.data.datas)
      }))
      Taro.hideLoading()
    }).catch((error) => {
      Taro.hideLoading()
    })
  }

  //切换tab
  changeTab = (index) => {
    this.setState({
      current: index
    })
    this.page = 1
    this.currentid = this.state.treeList[index].id
    this.loadProjectList(this.currentid)
  }

  componentDidMount () {
    this.loadTreeList()
  }

  render () {
    return (
      <View className='index'>
        <Tab list={this.state.treeList} current={this.state.current} onChange={this.changeTab}></Tab>
        <ProjectList list={this.state.dataList}/>
      </View>
    )
  }
}
