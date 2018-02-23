import React from 'react';
import { Card, Row, Col, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './Navigation.css';

function Navigation({data, removedItems, closable}) {
  return (
    <div className={styles.normal}>
      {
        data.map((tag,i) => <Card key={i} title={tag.tagName} extra={<a href="#">More</a>} className={styles.card}>

          <Row type="flex" align="top">
            {tag.tagItem.map((item,i) =>
              <Col key={i} className={styles.col}>
                { !closable &&
                  <Button
                    size="small"
                    value={item.itemName}
                    href={item.itemUrl}
                    target='_blank'
                  >
                    {item.itemName}
                  </Button>
                }
                { closable && <Button
                  size="small"
                  value={item.itemName}
                  onClick={() => removedItems(tag.tagName,i)}
                  className="tada animated infinite"
                >
                  {item.itemName}
                  <Icon type="close" />
                </Button>
                }
              </Col>)}
          </Row>
        </Card>)
      }
    </div>
  );
}

Navigation.propTypes = {
  data: PropTypes.array,
  removedItems: PropTypes.func,
  closable: PropTypes.bool,
};

export default Navigation;
