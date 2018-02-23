import React from 'react';
import { Modal, Input, Tag, Icon, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import styles from './MyModal.css';

const CheckableTag = Tag.CheckableTag;
const Option = Select.Option;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);

function MyModal({
                   modalVisible,
                   onOk,
                   onCancel,
                   onItemNameChange,
                   onItemUrlChange,
                   tags,
                   selectedTags,
                   onCheckChange,
                   inputValue,
                   inputVisible,
                   handleInputChange,
                   handleInputConfirm,
                   showInput,
                }) {
  const modalOpts = {
    title: '添加',
    visible: modalVisible,
    okText: "确认",
    cancelText: "取消",
    onOk,
    onCancel
  }

  return (
    <div className={styles.normal}>
      <Modal {...modalOpts} >
        <Row type="flex" align="middle" className={styles.row}>
          <Col>名称：</Col>
          <Col span={16}><Input placeholder="默认" onChange={onItemNameChange} /></Col>
        </Row>
        <Row type="flex" align="middle" className={styles.row}>
          <Col>网址：</Col>
          <Col span={16}><Input placeholder="http://www.example.com" onChange={onItemUrlChange} /></Col>
        </Row>
        <Row type="flex" align="middle" className={styles.row}>
          <span>选择分组：</span>
          { tags.map( (tag,i) => (
            <CheckableTag
              key={i}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={ checked => onCheckChange(tag,checked)}
            >
              {tag}
            </CheckableTag>
          ))}
          { !inputVisible &&
            <Tag
              style={{ background: '#fff', borderStyle: 'dashed' }}
              onClick={showInput}
            >
              <Icon type="plus" /> 新的分组
            </Tag>
          }
          { inputVisible &&
            <Input
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          }
        </Row>
      </Modal>
    </div>
  );
}
MyModal.propTypes = {
  modalVisible: PropTypes.bool,
  onItemNameChange: PropTypes.func,
  onItemUrlChange: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  tags: PropTypes.array,
  selectedTags: PropTypes.array,
  onCheckChange: PropTypes.func,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleInputConfirm: PropTypes.func,
  inputVisible: PropTypes.bool,
  showInput: PropTypes.func,
};

export default MyModal;
