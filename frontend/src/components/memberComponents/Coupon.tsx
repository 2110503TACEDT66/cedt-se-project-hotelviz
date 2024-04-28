import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {useReducer, useState } from "react";
import { CouponItem } from "../../../interface";


export default function Coupon(
    // {couponId,couponType, discount, tier, point, createdDate, expiredDate}: {couponId:string, couponType: string, discount: Number, tier: string[], point: Number, createdDate: Date, expiredDate: Date}
    { coupon }: { coupon: CouponItem }
) {

    // const [spinner, setSpinner] = useState(true);

    
    
    return (
        // <a href={"/member/"+couponType}>
        <div className=" w-[500px] min-w-[500px] h-[auto] mr-8 my-4 bg-gradient-to-br from-yellow-600 to-indigo-600  text-white text-center py-4 px-8  rounded-lg shadow-md relative  hover:translate-y-[-4px] transition-all duration-250 ease-in-out hover:shadow-md rounded-xl shadow-lg overflow-hidden border-neutral-100 border-[5px]">
            <h1 className="text-3xl font-bold -4">{coupon.type}</h1>
            <hr className='mx-5 my-1'/>
            <h3 className="text-xl font-semibold mb-5">{coupon.discount.toString()} Baht Discount</h3>
            
            <div className='grid grid-cols-2 mt-[40px] '>
                <div className='flex justify-start '>                            
                <span className=" flex border border-white bg-white text-purple-600 px-1.5 py-2  w-auto rounded-l  justify-content-start">
                    <h1 className='mr-1'><LoyaltyIcon fontSize={"inherit"}/></h1>
                    <h1 className="mr-[2px] text-sm font-semibold mt-[2px]">{coupon.tiers}</h1>
                </span>
                <span className="border-dashed border text-white text-md px-1.5 py-2 rounded-r w-[120px]">{coupon.point.toString()} Points</span>

                </div>
            <div className="text-sm flex justify-end mt-[20px]">Valid Till: {coupon.expiredDate.toString()}</div>
            </div>
            <div className="w-12 h-12 bg-neutral-100 rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
            <div className="w-12 h-12 bg-neutral-100 rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
        </div>
        // </a>


        // <div className=" w-[500px] min-w-[500px] h-[auto] mr-8 my-4 bg-gradient-to-br from-yellow-600 to-indigo-600  text-white text-center py-4 px-8  rounded-lg shadow-md relative  hover:translate-y-[-4px] transition-all duration-250 ease-in-out hover:shadow-md rounded-xl shadow-lg overflow-hidden border-neutral-100 border-[5px]">
        //     <h1 className="text-3xl font-bold -4">NewYear Sale</h1>
        //     <hr className='mx-5 my-1'/>
        //     <h3 className="text-xl font-semibold mb-5">{300} Baht Discount</h3>
            
        //     <div className='grid grid-cols-2 mt-[40px] '>
        //         <div className='flex justify-start '>                            
        //         <span className=" flex border border-white bg-white text-purple-600 px-1.5 py-2  w-auto rounded-l  justify-content-start">
        //             <h1 className='mr-1'><LoyaltyIcon fontSize={"inherit"}/></h1>
        //             <h1 className="mr-[2px] text-sm font-semibold mt-[2px]">Platinum</h1>
        //         </span>
        //         <span className="border-dashed border text-white text-md px-1.5 py-2 rounded-r w-[120px]">30000 Points</span>

        //         </div>
        //     <div className="text-sm flex justify-end mt-[20px]">Valid Till: 20Dec, 2021</div>
        //     </div>
        //     <div className="w-12 h-12 bg-neutral-100 rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
        //     <div className="w-12 h-12 bg-neutral-100 rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
        // </div>
        
        
    )};