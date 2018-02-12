import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './TagList.css';

function TagList({tagName, showModal}) {
  return (
    <div className={styles.normal}>
      {
        tagName.map((item,i) => <Button key={i}>{item.tagName}</Button>)
      }
      <Button type="dashed" onClick={showModal}><Icon type="plus" /> 添加</Button>
    </div>
  );
}
TagList.propTypes = {
  tagName: PropTypes.array,
  showModal: PropTypes.func,
};

export default TagList;
