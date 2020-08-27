import React, { useState } from 'react';
import {  Input, Cell } from 'zarm';

function FormPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  return (
    <>
      <Cell title="单行文本">
        <Input
          clearable
          type="text"
          placeholder="请输入"
          value={title}
          onChange={(value) => {
            setTitle(value);
            console.log(`onChange: ${value}`);
          }}
          onBlur={(value) => console.log(`onBlur: ${value}`)}
        />
      </Cell>
      <Cell title="多行文本">
        <Input
          type="text"
          rows={3}
          placeholder="请输入"
          type="text"
          placeholder="请输入"
          value={content}
          onChange={setContent}
        />
      </Cell>
      <Cell title="金额">
        <Input type="price" placeholder="type is price" defaultValue={value} />
      </Cell>
      <Cell title="多行文本">
        <Input
          autoHeight
          type="text"
          rows={3}
          placeholder="请输入"
          value={value}
          onChange={setValue}
        />
    </Cell>
    </>
  )
}

export default FormPage
