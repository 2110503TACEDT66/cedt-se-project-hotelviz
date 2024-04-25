"use client"
import { Gauge } from '@mui/x-charts/Gauge';

export default function MemberExp() {
    return (
        <a className="flex m-2 border border-gray-300 w-[200px] h-[200px] rounded-xl bg-white ">
            <Gauge value={75} valueMax={200}
            startAngle={-100} endAngle={100} width={150}
            text={
                ({ value, valueMax }) => `${value} / ${valueMax}`
            }
            />
        </a>   
    )
}