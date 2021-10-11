import React, { useMemo } from 'react';

import { useSelector } from '../../store';
import { selectors } from '../../store/TodoSlice';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TodoReview() {
  const list = useSelector(selectors.selectAllTodo());
  const completedTask = useMemo(() => {
    return list.filter((list) => list.status === 'Selected');
  }, [list]);

  const data = [
    { name: 'Number of task', value: list.length },
    { name: 'Completed Task', value: completedTask.length },
  ];
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginTop: '100px' }}>
        <div
          style={{
            width: '200px',
            height: '200px',
            border: '1px solid',
            lineHeight: '200px',
          }}
        >
          {completedTask.length} / {list.length}
        </div>
        No of Task vs Completed Task
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
