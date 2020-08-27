import React, { useState, useEffect, useRef } from 'react';
import { Pull, Cell, Message, Icon, Button, ActivityIndicator } from 'zarm';

const REFRESH_STATE = {
  normal: 0,  // 普通
  pull: 1,    // 下拉刷新（未满足刷新条件）
  drop: 2,    // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0,   // 普通
  abort: 1,    // 中止
  loading: 2,  // 加载中
  success: 3,  // 加载成功
  failure: 4,  // 加载失败
  complete: 5, // 加载完成（无新数据）
};

const getRandomNum = (min, max) => {
  const Range = max - min;
  const Rand = Math.random();
  return (min + Math.round(Rand * Range));
}

const fetchData = (length, dataSource = []) => {
  let newData = [].concat(dataSource);
  const startIndex = newData.length;
  for (let i = startIndex; i < startIndex + length; i++) {
    newData.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
  }
  return newData;
}

let mounted = true;

const PullPage = () => {
  const pullRef = useRef();
  const [bodyScroll, setBodyScroll] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);

  const toggleScrollContainer = () => {
    const newBodyScroll = !bodyScroll;
    setBodyScroll(newBodyScroll);

    if (newBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  // 模拟请求数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    setTimeout(() => {
      if (!mounted) return;
      setDataSource(fetchData(20));
      setRefreshing(REFRESH_STATE.success);
    }, 2000);
  }

  // 模拟加载更多数据
  const loadData = () => {
    setLoading(LOAD_STATE.loading);
    setTimeout(() => {
      if (!mounted) return;

      const randomNum = getRandomNum(0, 5);
      console.log(`状态: ${randomNum === 0 ? '失败' : (randomNum === 1 ? '完成' : '成功')}`);

      let loadingState = LOAD_STATE.success;
      if (randomNum === 0) {
        loadingState = LOAD_STATE.failure;
      } else if (randomNum === 1) {
        loadingState = LOAD_STATE.complete;
      } else {
        setDataSource(fetchData(20, dataSource));
      }

      setLoading(loadingState);
    }, 2000);
  }

  useEffect(() => {
    setDataSource(fetchData(20));

    return () => {
      mounted = false;
      document.body.style.overflow = 'auto';
    };
  }, []);

  const style = bodyScroll
    ? {}
    : { overflowY: 'auto', maxHeight: 400 };

  const scrollContainer = () => {
    return bodyScroll
      ? window
      : pullRef.current && pullRef.current.scrollContainer;
  }

  return (
    <>
      <Message theme="warning" icon={<Icon type="warning-round" />}>
        当前使用的是 `{bodyScroll ? 'window' : 'div' }` 作为滚动容器。
        <Button theme="primary" size="xs" onClick={toggleScrollContainer}>点击切换</Button>
      </Message>
      <Pull
        ref={pullRef}
        style={style}
        refresh={{
          state: refreshing,
          handler: refreshData,
        }}
        load={{
          state: loading,
          distance: 200,
          handler: loadData,
        }}
      >
        {dataSource}
      </Pull>

    </>
  );
}

export default PullPage
