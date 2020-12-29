import React, { useState, useEffect } from 'react';
import {  Input, Cell, Button, Message, Icon } from 'zarm';
import { useForm } from "react-hook-form";


function FormPage() {

  const [value, setValue] = useState();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  const handleChange = (name, value) => {
    setValue(name, value );
  }

  useEffect(() => {
    register('name', { required: true })
  }, [value])
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Cell title="投保人姓名" help={errors.name ? <Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>{errors.name.message || '必填'}</Message> : ''}>
            <Input name="name" onChange={(value) => handleChange('name', value)} placeholder="投保人姓名" />
          </Cell>
          {/* <Cell title="身份证号码" help={errors.applicantCertiNo ? <Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>{errors.applicantCertiNo.message || '必填'}</Message> : ''}>
            <Input name="applicantCertiNo" onChange={(value) => handleChange('applicantCertiNo', value)} placeholder="身份证号码"/>
          </Cell>
          <Cell title="手机号"  help={errors.applicantPhone ? <Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>{errors.applicantPhone.message || '必填'}</Message> : ''} description={<Button size="sm" onClick={(value) => trigger('applicantPhone')} >发送验证码</Button>}>
            <Input name="applicantPhone" onChange={(value) => handleChange('applicantPhone', value)} placeholder="身份证号码"/>
          </Cell> */}
          <Button htmlType="submit" block>提交</Button>
        </form>
      </div>
      
    </>
  )
}

export default FormPage
