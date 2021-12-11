// Moralis
// import { useMoralis, useMoralisQuery } from 'react-moralis'

// import React, { PureComponent, useEffect, useState } from 'react';
// import { MdOutlineHdrOffSelect } from 'react-icons/md';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
// import { GetRevenue } from '../../../../backend/ChartsLogic';
// import {ChartLogic} from '../../../../backend/ChartsLogic.tsx'

const ChartExample = (props) => {
  var allProductPrices = []
<<<<<<< HEAD
  const { user } = useMoralis();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let  { data } = (props.recurrence === "One time") ? useMoralisQuery("Products", (query) =>
    query.equalTo("user", user)
    .equalTo("recurrence", "One time")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    .ascending("createdAt")) : useMoralisQuery("Products", (query) =>
    query.equalTo("user", user)
    .notEqualTo("recurrence", "One time")
    .ascending("createdAt")) ;
  
  const processed_data = JSON.parse(JSON.stringify(data, null, 2))
  
  const listItems = processed_data.map((d, index) =>{
    var timeStr = d.createdAt;
    var date = new Date(timeStr);
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dateStr = month+"/"+day+"/"+year;
      allProductPrices.push({
          name: dateStr, 
          uv: d.price,
      });}
  );
=======
  // const { user } = useMoralis()
  // let { data } = useMoralisQuery('Products', (query) =>
  //   query
  //     .equalTo('user', user)
  //     .equalTo('recurrence', 'One time')
  //     .ascending('createdAt')
  // )
  // const processed_data = JSON.parse(JSON.stringify(data, null, 2))

  // const listItems = processed_data.map((d, index) => {
  //   var timeStr = d.createdAt
  //   var date = new Date(timeStr)
  //   var day = date.getDate()
  //   var year = date.getFullYear()
  //   var month = date.getMonth() + 1
  //   var dateStr = month + '/' + day + '/' + year
  //   allProductPrices.push({
  //     name: dateStr,
  //     uv: d.price,
  //   })
  // })
>>>>>>> 8992d7b7ea3d9807133fb2828342b61da9e99035
  // console.log(allProductPrices[0]);

  return (
    <ResponsiveContainer width='100%' height='70%'>
      <LineChart
        className={props.className}
        width={500}
        height={300}
        data={allProductPrices}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip wrapperStyle={{ backgroundColor: '#f5f5f5' }} />
        <Line
          type='monotone'
          dataKey='pv'
          stroke='#87F1FF'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ChartExample
