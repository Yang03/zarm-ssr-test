import React from 'react';
import {  Calendar } from 'zarm';

function CalendarPage() {
  return (
    <>
    <Calendar
      visible={true}
      multiple={true}
      value={['2020-07-29', '2020-08-04']}
      min={'2017-12-29'}
      max={'2020-08-04'}
      dateRender={(date) => {
        if (/(0|6)/.test(date.getDay())) {
          return (
            <div className="custom">
              <div className="custom__date">{date.getDate()}</div>
              <div className="custom__text">Closed</div>
            </div>
          );
        }
        return date.getDate();
      }}
      disabledDate={(date) => /(0|6)/.test(date.getDay())}
      // onChange={(value) => {
      //   //setValue(value);
      //   console.log('onChange', value);
      // }}
    />
    </>
  )
}

export default CalendarPage
