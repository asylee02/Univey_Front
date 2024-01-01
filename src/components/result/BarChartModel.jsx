import React from 'react'
import {BarChart, Bar, XAxis, YAxis, Label, CartesianGrid, LabelList} from 'recharts'
export default function BarChartModel({data}) {
  return (
    <div>
      <BarChart 
          width={730} 
          height={250} 
          data={data} 
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="응답 종류" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: '응답 수', angle: -90, position: 'insideLeft' }} />
          <Bar dataKey="응답 수" fill="#8884d8">
          </Bar>
        </BarChart>
    </div>
  )
}
