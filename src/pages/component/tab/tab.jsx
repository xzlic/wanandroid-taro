import Taro, { Component } from '@tarojs/taro'
import './tab.scss'
import { ScrollView } from '@tarojs/components';

export default class Tab extends Component{
    defaultProps = {
        list: [],
        current: 0,
        onChange: () => {}
    }

    constructor(props){
        super(props)
        this.state = {
            toView: 'a'
        }
    }

    handleClick = (index) => {
        const { list } = this.props;
        this.props.onChange(index)
        if (index > 2){
            this.setState({
                toView: 'a' + list[index - 2].id
            })
        }
    }

    render(){
        const { list, current } = this.props;
        return(
            <ScrollView
                scrollX
                scrollIntoView={this.state.toView}
                className='tab_view' >
                {
                    list && list.length > 0 ?
                        list.map((item, index) => 
                            <View id={'a' + item.id} key={item.id} className={index === current ? 'tab_itemView_select' : 'tab_itemView'} onClick={this.handleClick.bind(this, index)}>
                                <Text className={index === current ? 'tab_itemtext_select' : 'tab_itemtext'} decode='true'>{item.name}</Text>
                            </View>
                        ) : null
                }
            </ScrollView>
        )
    }
}