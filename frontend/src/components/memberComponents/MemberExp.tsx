"use client"
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
// import MemberExpDisplay from './MemberExpDisplay';
import BedtimeIcon from '@mui/icons-material/Bedtime';

export default function MemberExp() {

    return (
        <div className="flex m-2 pl-3  border border-gray-300 w-[800px] h-[200px] rounded-xl bg-white ">
        <div className='relative ml-1' >
            <Gauge value={75} valueMax={200} 
            startAngle={-120} endAngle={120} width={180}
            sx={(theme) => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: '#FFD700',
                },
              })}
            text={
                ''
            }
            />
        </div>   
        <div className='absolute mt-16 ml-16 w-[60px]'>
            <div className='text-center mb-1'><BedtimeIcon/></div>
            <div className='font-bold text-2xl text-center'>75</div>
            <div className='border border-stone-800'></div>
            <div className='font-bold text-md text-center'>200</div>
        </div>
        <div className='m-8 w-full'>
        
        <div className=' w-auto text-4xl font-bold text-yellow-500'>
            Platinum
        </div>
        <hr className='my-3'/>
        <div className='w-auto text-lg font-bold text-black-400'>
            Point balance : {"321"}
        </div>
        <div className='mt-2 w-auto text-sm font-bold text-neutral-400 font-sans'>
            Earn more {"125"} <BedtimeIcon fontSize={"inherit"}/> to get ...
        </div>
        </div>
        </div>
    )
}

