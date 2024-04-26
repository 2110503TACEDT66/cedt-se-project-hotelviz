"use client"
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
// import MemberExpDisplay from './MemberExpDisplay';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useEffect, useState } from 'react';

export default function MemberExp() {
    const [Tier, setTier] = useState<string>("");
    const [NextTier, setNextTier] = useState<string>("");
    const [Exp, setExp] = useState(0);
    const [FullExp, setFullExp] = useState(0);
    const [PointBalance, setPointBalance] = useState(0);
    const [ColorA, setColorA] = useState<string>("#1e40af");
    const [ColorB, setColorB] = useState<string>("text-blue-800");
    

    const setColorDisplay = () => {
        if(Tier == "Platinum") {
            setColorA("#14b8a6");
            setColorB("text-teal-500");
            setFullExp(500);
        } else if (Tier == "Gold") {
            setColorA("#eab308");
            setColorB("text-yellow-500");
            setFullExp(500);
            setNextTier("Platinum");
        } else if (Tier == "Sliver") {
            setColorA("#64748b");
            setColorB("text-slate-500");
            setFullExp(200);
            setNextTier("Gold");
        } else if (Tier == "Bronze") {
            setColorA("#854d0e");
            setColorB("text-yellow-800");
            setFullExp(50);
            setNextTier("Sliver");
        } else {
            setColorA("#1e40af");
            setColorB("text-blue-800");
            setFullExp(0);
            setNextTier("");
        }
    }

    useEffect(() => {setTier("Gold"); setExp(227); setColorDisplay()})


    return (
        <div className="flex m-2 pl-3 border border-gray-300 w-full h-[200px] rounded-xl bg-white">
        <div className='relative ml-1' >
            <Gauge value={Math.min(Exp,FullExp)} valueMax={FullExp} 
            startAngle={-120} endAngle={120} width={180}
            sx={(theme) => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: `${ColorA}`,
                },
              })}
            text={''}
            />
        </div>   
        <div className='absolute mt-16 ml-16 w-[60px]'>
            <div className='text-center mb-1'><BedtimeIcon/></div>
            <div className='font-bold text-2xl text-center'>{Exp}</div>
            <div className='border border-stone-800'></div>
            <div className='font-bold text-md text-center'>{FullExp}</div>
        </div>
        <div className='m-8 w-full'>
        
        <div className={`w-auto text-4xl font-bold ${ColorB}`}>
            {Tier}
        </div>
        <hr className='my-3'/>
        <div className='w-auto text-lg font-bold text-black-400'>
            Point balance : {PointBalance}
        </div>
        {
            (Tier == "Platinum")? 
            <div className='mt-2 w-auto text-sm font-bold text-neutral-400 font-sans'>You are the highest tier!</div>
            :
            <div className='mt-2 w-auto text-sm font-bold text-neutral-400 font-sans'>
            Earn more {Math.max(FullExp - Exp,0)} <BedtimeIcon fontSize={"inherit"}/> to get {NextTier} tier.
            </div>
        }
        
        </div>
        </div>
    )
}

