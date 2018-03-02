import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import styles from './TagList.css';

const animation = { blur: '1px', yoyo: true, repeat: -1, duration: 1000 }

function TagList({tagName, showModal, closable, removedTags, paused}) {
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
         <Button key={i} onClick={() => removedTags(i)}>
            {item.tagName}
            <Icon type="close-circle" />
          </Button>
        )
      }
      { closable &&  <TweenOne
            animation={animation}
            paused={paused}
          ><Button type="dashed" onClick={showModal}><Icon type="plus" /> 添加</Button></TweenOne>}
    </div>
  );
}
TagList.propTypes = {
  tagName: PropTypes.array,
  showModal: PropTypes.func,
  closable: PropTypes.bool,
  removedTags: PropTypes.func,
  paused: PropTypes.bool,
};

export default TagList;
