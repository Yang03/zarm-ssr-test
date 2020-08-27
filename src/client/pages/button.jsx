import React from 'react';
import {  Button, Icon } from 'zarm';

function ButtonPage() {
  return (
    <>
      <Button>default</Button>
      <Button theme="primary">primary</Button>
      <Button block>default</Button>
      <Button block disabled>default disabled</Button>
      <Button block theme="primary">primary</Button>
      <Button block disabled theme="primary">primary disabled</Button>
      <Button shape="rect" theme="primary">rect</Button>
       <Button theme="primary">radius</Button>
       <Button shape="round" theme="primary">round</Button>
       <Button shape="circle" theme="primary">circle</Button>
       <Button shape="circle" icon={<Icon type="right" />} />
    </>
  )
}

export default ButtonPage
