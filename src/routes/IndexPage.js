import React from 'react';
import { connect } from 'dva';
import { Row, Col, Switch, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import styles from './IndexPage.css';
import MySearch from '../components/MySearch.js';
import MyModal from '../components/MyModal.js';
import TagList from '../components/TagList.js';
import Navigation from '../components/Navigation.js';

function IndexPage({mysearch,navigation,mymodal,dispatch}) {
  const { buttonValue, optionValue, selectValue } = mysearch;
  const { modalVisible, selectedTags,inputValue,inputVisible,tags,itemName,itemUrl } = mymodal;
  const { list, closable } = navigation;
  const confirm = Modal.confirm;

  const searchProps = {
    buttonValue: buttonValue,
    optionValue: optionValue,
    selectValue: selectValue,
    onChange(e){
      const value = e;
      dispatch({
        type: 'mysearch/select',
        payload: {selectValue: value}
      })
    },
    onClick(e){
      const value = e.target.value;
      dispatch({
        type: 'mysearch/select',
        payload: {selectValue: value}
      })
    },
    onSearch(value){
      switch(selectValue){
        case 'baidu':
          location.href = 'https://www.baidu.com/s?wd='+value;
          break;
        case 'google':
          location.href = 'https://www.google.com/search?q='+value;
          break;
        case 'zhihu':
          location.href = 'https://www.zhihu.com/search?q='+value;
          break;
        case 'github':
          location.href = 'https://github.com/search?q='+value;
          break;
        case 'bing':
          location.href = 'https://cn.bing.com/search?q='+value;
          break;
        case 'stackoverflow':
          location.href = 'https://stackoverflow.com/search?q='+value;
          break;
        case 'sougou':
          location.href = 'https://weixin.sougou.com/weixin?type=2&query='+value;
          break;
      }
    },
  }

  const modalProps = {
    modalVisible: modalVisible,
    tags: tags,
    selectedTags: selectedTags,
    inputValue: inputValue,
    inputVisible: inputVisible,
    onOk(){
      if(selectedTags.length && itemName && itemUrl){
        dispatch({
          type: 'navigation/add',
          payload: {selectedTags,itemName,itemUrl,list}
        })
        dispatch({
          type: 'mymodal/hideModal',
        })
      }else{
        if(!itemName){
          message.warning('名称不能为空');
        }
        else if(!itemUrl){
          message.warning('网址不能为空');
        }else if(!selectedTags.length){
          message.warning('你还未选择分组');
        }else{
          message.warning('信息不完整');
        }
      }

    },
    onCancel(){
      dispatch({
        type: 'mymodal/hideModal',
      })
    },
    onItemNameChange(e){
      dispatch({
        type: 'mymodal/update',
        payload: { itemName: e.target.value }
      })
    },
    onItemUrlChange(e){
      dispatch({
        type: 'mymodal/update',
        payload: { itemUrl: e.target.value }
      })
    },
    onCheckChange(tag,checked){
      const nextSelectedTags = checked ?
        [...selectedTags, tag] :
        selectedTags.filter(t => t !== tag);
      dispatch({
        type: 'mymodal/update',
        payload: { selectedTags: nextSelectedTags }
      })
    },
    handleInputChange(e){
      dispatch({
        type: 'mymodal/update',
        payload: { inputValue: e.target.value }
      })
    },
    handleInputConfirm(){
      if(inputValue && tags.indexOf(inputValue) === -1){
        let newtags = [...tags, inputValue];
        dispatch({
          type: 'mymodal/update',
          payload: { tags: newtags, inputVisible: false, inputValue: ''}
        })
      }

    },
    showInput(){
      dispatch({
        type: 'mymodal/showInput',
      })
    },
  }

  const navigationProps = {
    data: list,
    closable: closable,
    removedItems(tagName,i){
      confirm({
        title: '删除',
        content: '确定要删除这个标签吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'navigation/deleteItems',
            payload:{ tagName: tagName, list: list, itemIndex: i }
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }

  function showDeleteIcon(closable){
    dispatch({
      type: 'navigation/showDeleteIcon',
      payload:{ closable: closable }
    })
  }
  const tagListProps = {
    tagName: list,
    closable: closable,
    showModal(){
      dispatch({
        type: 'mymodal/showModal',
        payload:{ tags: list.map( tag => tag.tagName),selectedTags: [] }
      })
    },
    removedTags(i){
      confirm({
        title: '删除',
        content: '确定要整个分组吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'navigation/deleteTags',
            payload:{ list: list, tagIndex: i }
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
  return (
    <div className={styles.normal}>
      <Row type="flex" justify="center" align="top">
        <Col span={24}><MySearch {...searchProps} /></Col>
      </Row>
      <Row type="flex" justify="end" align="middle">编辑：<Switch checkedChildren="开" unCheckedChildren="关" onChange={showDeleteIcon} /></Row>
      <Row type="flex" justify="space-around" align="top">
        <Col span={4}><TagList {...tagListProps} /></Col>
        <Col span={19}><Navigation {...navigationProps} /></Col>
      </Row>
      { modalVisible && <MyModal {...modalProps} /> }
    </div>
  );
}

IndexPage.propTypes = {
  dispatch: PropTypes.func,
  mysearch: PropTypes.object,
  navigation: PropTypes.object,
  mymodal: PropTypes.object,
};

export default connect(({ mysearch,navigation,mymodal }) => ({
  mysearch,navigation,mymodal
}))(IndexPage);
