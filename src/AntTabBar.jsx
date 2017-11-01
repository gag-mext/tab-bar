import '../style';
import React from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import Tab from './Tab';
import TabContent from 'rc-tabs/lib/TabContent';
import TabBar from 'rc-tabs/lib/TabBar';
import getDataAttr from '@gag/util/getDataAttr';

export class Item extends React.Component{
  render() {
    return null;
  }
}
Item.propTypes = {
  badge:React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
  ]),
  onPress: React.PropTypes.func,
  selected: React.PropTypes.bool,
  icon: React.PropTypes.any,
  selectedIcon: React.PropTypes.any,
  title: React.PropTypes.string,
};
class AntTabBar extends React.Component{

static Item = Item;

  onChange = key => {
    React.Children.forEach(this.props.children, (c: any) => {
      if (c.key === key && c.props.onPress) {
        c.props.onPress();
      }
    });
  }

  renderTabBar = () => {
    const { barTintColor, hidden, prefixCls } = this.props;
    const barCls = hidden ? `${prefixCls}-bar-hidden` : '';
    return <TabBar className={barCls} style={{ backgroundColor: barTintColor }}/>;
  }

  renderTabContent = () => {
    return <TabContent animated={false} />;
  }

  render() {
    let activeKey;
    const children: any[] = [];
    React.Children.forEach(this.props.children, (c: any) => {
      if (c.props.selected) {
        activeKey = c.key;
      }
      children.push(c);
    });
    const {tintColor, unselectedTintColor} = this.props;
    const panels = children.map((c: any) => {
      const cProps = c.props;
      const tab = (<Tab
        prefixCls={`${this.props.prefixCls}-tab`}
        badge={cProps.badge}
        dot={cProps.dot}
        selected={cProps.selected}
        icon={cProps.icon}
        selectedIcon={cProps.selectedIcon}
        title={cProps.title}
        tintColor={tintColor}
        unselectedTintColor={unselectedTintColor}
        dataAttrs={getDataAttr(cProps)}
      />);
      return (
        <TabPane
          placeholder={this.props.placeholder}
          tab={tab}
          key={c.key}
        >
          {cProps.children}
        </TabPane>);
    });
    return (
      <Tabs
        renderTabBar={this.renderTabBar}
        renderTabContent={this.renderTabContent}
        tabBarPosition="bottom"
        prefixCls={this.props.prefixCls}
        activeKey={activeKey}
        onChange={this.onChange}
      >
        {panels}
      </Tabs>
    );
  }
}


AntTabBar.defaultProps = {
      prefixCls: 'am-tab-bar',
      barTintColor: 'white',
      tintColor: '#108ee9',
      hidden: false,
      unselectedTintColor: '#888',
      placeholder: '正在加载',
};
AntTabBar.propTypes = {

  barTintColor: React.PropTypes.string,
  tintColor: React.PropTypes.string,
  unselectedTintColor: React.PropTypes.string,
  children: React.PropTypes.any,
  /*web only*/
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  hidden: React.PropTypes.bool,
  placeholder: React.PropTypes.node,
};
AntTabBar.displayName = "AntTabBar";
module.exports=AntTabBar;
