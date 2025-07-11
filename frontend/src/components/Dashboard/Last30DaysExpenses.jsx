import React, { useEffect, useState } from 'react'
import { prepareExpensesBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData,setChartData] = useState([]);


    useEffect(()=>{
        // console.log(data);
        
        const result = prepareExpensesBarChartData(data);
        // console.log(result); 
        // for debugging
        
        setChartData(result);

        return ()=>{}
    },[data]);


  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart  data={chartData}/>
    </div>
  )
}

export default Last30DaysExpenses