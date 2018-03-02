import React from 'react';
import { Card, Row, Col, Button, Icon } from 'antd';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import styles from './Navigation.css';

const p = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
const ease = TweenOne.easing.path(p)
const animation = {
      repeatDelay: 500,
      appearTo: 0,
      scaleX: 0,
      scaleY: 2,
      repeat: -1,
      yoyo: true,
      ease: ease,
      duration: 1000,
    };

function Navigation({data, removedItems, closable, paused}) {
  return (
    <div className={styles.normal}>
      {
        data.map((tag,i) => <Card key={i} title={tag.tagName} extra={<a href="#">More</a>} className={styles.card}>

          <Row type="flex" align="top">
            {tag.tagItem.map((item,i) =>
              <TweenOne
               key={i}
                    animation={animation}
                    paused={paused}
                  ><Col className={styles.col}>
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
                    >
                      {item.itemName}
                      <Icon type="close" />
                    </Button>
                }
              </Col></TweenOne>)}
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
  paused: PropTypes.bool,
};

export default Navigation;
