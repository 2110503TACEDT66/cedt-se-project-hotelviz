import LoyaltyIcon from '@mui/icons-material/Loyalty';

export default function Coupon(
    // {couponType, discount, tier, point, createdDate, expiredDate}: {couponType: string, discount: Number, tier: string[], point: Number, createdDate: Date, expiredDate: Date}
) {
    return (
        <div className=" w-[500px] min-w-[500px] h-[auto] mr-8 my-4 bg-gradient-to-br from-yellow-600 to-indigo-600  text-white text-center py-4 px-8  rounded-lg shadow-md relative  hover:translate-y-[-4px] transition-all duration-250 ease-in-out hover:shadow-md rounded-xl shadow-lg overflow-hidden border-white border-[5px]">
            <h1 className="text-3xl font-bold -4">NewYear Sale</h1>
            <hr className='mx-5 my-1'/>
            <h3 className="text-xl font-semibold mb-5">{300} Bath Discount</h3>
            
            <div className='grid grid-cols-2 mt-[40px]'>
                <div className='flex justify-start '>                            
                <span className="border-dashed border text-white text-md px-2 py-2 rounded-l w-[110px]">300 Points</span>
                <span className=" flex border border-white bg-white text-purple-600 px-2 py-2  w-[100px] rounded-r cursor-pointer justify-content-start">
                    <h1 className='mr-1'><LoyaltyIcon fontSize={"inherit"}/></h1>
                    <h1 className="mr-[2px] text-sm font-semibold mt-[2px]">Platinum</h1>
                </span>
                </div>
            <div className="text-sm flex justify-end mt-[20px]">Valid Till: 20Dec, 2021</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
            <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
        </div>
        
        
    )};