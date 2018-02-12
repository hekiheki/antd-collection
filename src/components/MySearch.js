import React from 'react';
import { Input, Select, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styles from './MySearch.css';

const Search = Input.Search;
const Option = Select.Option;

function MySearch({optionValue, buttonValue, selectValue, onChange, onClick, onSearch}) {

  const selectBefore = (
    <Select style={{ width: 90 }} value={selectValue} onChange={onChange} >
      {
        optionValue.map(item => <Option key={item} value={item}>{item}</Option>)
      }
    </Select>
  );

  return (
    <div className={styles.normal}>
      <div className={styles.btnBox}>
        <Row type="flex" justify="center">
          {
            buttonValue.map(item => <Col key={item} className={styles.col}>
              <Button
                size="small"
                type="primary"
                onClick={onClick}
                value={item}
              >
                {item}
              </Button>
            </Col>)
          }
        </Row>
      </div>
      <Search
        addonBefore={selectBefore}
        placeholder="input to search"
        onSearch={onSearch}
        enterButton
      />
    </div>
  );
}

MySearch.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  buttonValue: PropTypes.array,
  optionValue: PropTypes.array,
  selectValue: PropTypes.string,
};

export default MySearch;
