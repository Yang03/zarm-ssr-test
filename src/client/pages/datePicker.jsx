import React, { useState } from 'react';
import { DatePickerView } from 'zarm';

function DatePickerPage() {
  const [ value, setValue] = useState('2020-8-13')
  console.log(value)
  return (
    <>
      <DatePickerView
        mode="datetime"
        value={value}
        min="2018-1-13"
        onChange={(value) => {
          // console.log('datePickerView => ', value);
          setValue(value);
        }}
      />
    </>
  )
}

export default DatePickerPage
