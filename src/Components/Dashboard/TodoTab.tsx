import React, { useMemo, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useSelector } from '../../store';
import { selectors } from '../../store/TodoSlice';

import TabList from './TodoList';
import TodoReview from './TodoReview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TodoTab() {
  const [value, setValue] = React.useState(0);
  const list = useSelector(selectors.selectAllTodo());

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(list));
  }, [list]);

  const filterList = useMemo(() => {
    return list
      .filter((todo) => new Date(todo?.date).getTime() >= new Date().getTime())
      .splice(0, 5);
  }, [list]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Latest List' {...a11yProps(0)} />
          <Tab label='All List' {...a11yProps(1)} />
          <Tab label='Review' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabList list={filterList} showAllData={false} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabList list={list} showAllData />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TodoReview />
      </TabPanel>
    </Box>
  );
}
