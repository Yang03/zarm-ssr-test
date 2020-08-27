import React, { useEffect, useRef, useReducer } from 'react';
import { Cell, Button, Picker, Toast } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

// 普通多列数据
const MULTI_DATA = [
  [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ],
  [
    { value: '3', label: '选项A' },
    { value: '4', label: '选项B' },
  ],
];

// 级联数据
const CASCADE_DATA = [
  {
    code: '1',
    label: '北京市',
    children: [
      { code: '11', label: '海淀区' },
      { code: '12', label: '西城区' },
    ],
  },
  {
    code: '2',
    label: '上海市',
    children: [
      { code: '21', label: '杨浦区' },
      { code: '22', label: '静安区' },
    ],
  },
];

const DIY_DATA = [
  {
    value: '1',
    name: '北京市',
    children: [
      { value: '11', name: '海淀区' },
      { value: '12', name: '西城区' },
    ],
  },
  {
    value: '2',
    name: '上海市',
    children: [
      { value: '21', name: '黄埔区' },
      { value: '22', name: '虹口区' },
    ],
  },
];

const initState = {
  single: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
  multi: {
    visible: false,
    value: [],
    dataSource: MULTI_DATA,
  },
  cascade: {
    visible: false,
    value: [],
    dataSource: [],
  },
  diy: {
    visible: false,
    value: [],
    dataSource: DIY_DATA,
  },
  specDOM: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
};

const reducer = (state, action) => {
  const { type, key, visible, value, valueMember, dataSource } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        }
      };

    case 'value':
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
        }
      };

    case 'valueMember':
      return {
        ...state,
        [key]: {
          ...state[key],
          valueMember,
        }
      };

    case 'dataSource':
      return {
        ...state,
        [key]: {
          ...state[key],
          dataSource,
        }
      };
  }
};

const PickerPage = () => {
  const myRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);

  const setVisible = (key) => {
    dispatch({ type: 'visible', key });
  };

  const setValue = (key, value) => {
    dispatch({ type: 'value', key, value });
  };

  const setValueMember = (key, value) => {
    dispatch({ type: 'valueMember', key, valueMember: value });
  };

  const setDataSource = (key, value) => {
    dispatch({ type: 'dataSource', key, dataSource: value });
  };

  useEffect(() => {
    // 异步加载数据源测试
    setTimeout(() => {
      setValue('cascade', ['1', '12']);
      setValueMember('cascade', 'code');
      setDataSource('cascade', CASCADE_DATA);
    }, 0);
  }, []);

  return (
    <>
      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('single')}>选择</Button>
        }
      >
        单列
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('multi')}>选择</Button>
        }
      >
        多列
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('cascade')}>选择</Button>
        }
      >
        级联
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('diy')}>选择</Button>
        }
      >
        自定义
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('specDOM')}>选择</Button>
        }
      >
        挂载到指定dom节点
      </Cell>

      <Picker
        visible={state.single.visible}
        value={state.single.value}
        dataSource={state.single.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('single', selected.map(item => item.value));
          setVisible('single');
        }}
        onCancel={() => setVisible('single')}
      />

      <Picker
        visible={state.multi.visible}
        value={state.multi.value}
        dataSource={state.multi.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          // Toast.show(JSON.stringify(selected));
          setValue('multi', selected.map(item => item.value));
          setVisible('multi');
        }}
        onCancel={() => setVisible('multi')}
      />

      <Picker
        visible={state.cascade.visible}
        value={state.cascade.value}
        dataSource={state.cascade.dataSource}
        valueMember={state.cascade.valueMember}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          // Toast.show(JSON.stringify(selected));
          setValue('cascade', selected.map(item => item.code));
          setVisible('cascade');
        }}
        onCancel={() => setVisible('cascade')}
      />

      <Picker
        visible={state.diy.visible}
        title="custom title"
        cancelText="Cancel"
        okText="Ok"
        dataSource={state.diy.dataSource}
        value={state.diy.value}
        valueMember="value"
        itemRender={data => data.name}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          // Toast.show(JSON.stringify(selected));
          setValue('diy', selected.map(item => item.value));
          setVisible('diy');
        }}
        onCancel={() => setVisible('diy')}
      />

      <Picker
        visible={state.specDOM.visible}
        value={state.specDOM.value}
        dataSource={state.specDOM.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          // Toast.show(JSON.stringify(selected));
          setValue('specDOM', selected.map(item => item.value));
          setVisible('specDOM');
        }}
        onCancel={() => setVisible('specDOM')}
        mountContainer={() => myRef.current}
      />

      <div
        id="test-div"
        style={{ position: 'relative', zIndex: 1 }}
        ref={myRef}
      />
    </>
  );
};


export default PickerPage
