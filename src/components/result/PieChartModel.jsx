import React, { useState } from "react";
import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';

export default function PieChartModel({data}) {
 
 
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
        return (
            <text x={x-10} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
 
    return (
        <>
            <div className="mb-5">

                    {/* <h1>Favorite Beverages - technostuf.com</h1> */}
                    {/* <hr /> */}
                    <div className="mr-28">
                        <ResponsiveContainer width={600} height={300} className="text-center ">
                            <PieChart width={600} height={300}>
                                    <Legend layout="vertical" verticalAlign="middle" align="left" />
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="응답 수"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}