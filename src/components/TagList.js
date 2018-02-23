import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './TagList.css';

function TagList({tagName, showModal, closable, removedTags}) {
  return (
    <div className={styles.normal}>
      {
        !closable && tagName.map((item,i) =>
          <Button key={i}>
            {item.tagName}
          </Button>
        )
      }
      {
        closable && tagName.map((item,i) =>
          <Button className="tada animated infinite" key={i} onClick={() => removedTags(i)}>
            {item.tagName}
            <Icon type="close-circle" />
          </Button>
        )
      }
      <Button type="dashed" onClick={showModal}><Icon type="plus" /> 添加</Button>
    </div>
  );
}
TagList.propTypes = {
  tagName: PropTypes.array,
  showModal: PropTypes.func,
  closable: PropTypes.bool,
  removedTags: PropTypes.func,
};

export default TagList;
