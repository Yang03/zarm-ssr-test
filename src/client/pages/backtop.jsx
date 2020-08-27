import { useRef, useState } from 'react';
import { Cell, BackToTop, Message, Button, Icon } from 'zarm';

const BackTopPage = () => {
  const list = [];
  for (let i = 0; i < 100; i++)
    list.push(<Cell key={+i}>第 {i + 1} 行</Cell>);

  const containerRef = useRef();
  const [useWindowScroll, setUseWindowScroll] = useState(true);

  const scrollContainer = !useWindowScroll ? () => containerRef.current : null;

  const containerStyle = !useWindowScroll ? {
    overflowY: 'auto',
    maxHeight: 400,
  }: {};

  return (
    <>
      <Message theme="warning" icon={<Icon type="warning-round" />}>
        当前使用的是 `{useWindowScroll ? 'window' : 'div' }` 作为滚动容器。
        <Button theme="primary" size="xs" onClick={() => setUseWindowScroll(!useWindowScroll)}>点击切换</Button>
      </Message>

      <div ref={containerRef} style={containerStyle}>{list}</div>

      <BackToTop
        scrollContainer={scrollContainer}
        onClick={() => console.log('click back to top')}
      >
        <div style={{
          width: 60,
          height: 60,
          lineHeight: '60px',
          textAlign: 'center',
          backgroundColor: '#fff',
          color: '#999',
          fontSize: 20,
          borderRadius: 30,
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}>
          Up
        </div>
      </BackToTop>
    </>
  )
};

export default BackTopPage;
