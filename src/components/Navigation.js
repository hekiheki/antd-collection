import React from 'react';
import { List, Card, Tag, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styles from './Navigation.css';

function Navigation({data, removedTags, closable}) {
  return (
    <div className={styles.normal}>
      {
        data.map((item,i) => <Card key={i} title={item.tagName} extra={<a href="#">More</a>} className={styles.card}>
          <Row type="flex">
            {item.tagItem.map((item,i) => <Tag key={i} closable={closable} onClose={removedTags}><a href={item.itemUrl} target='_blank'>{item.itemName}</a></Tag>)}
          </Row>
        </Card>)
      }
    </div>
  );
}

Navigation.propTypes = {
  data: PropTypes.array,
  removedTags: PropTypes.func,
  closable: PropTypes.bool,
};

export default Navigation;
