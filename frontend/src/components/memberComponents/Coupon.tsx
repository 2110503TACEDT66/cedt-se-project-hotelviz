import LoyaltyIcon from '@mui/icons-material/Loyalty';

export default function Coupon(
    // {couponType, discount, tier, point, createdDate, expiredDate}: {couponType: string, discount: Number, tier: string[], point: Number, createdDate: Date, expiredDate: Date}
) {
    return (
        <div className="container mx-auto">
                    <div className="bg-gradient-to-br from-yellow-600 to-indigo-600 w-[600px] h-[250px] text-white text-center py-10 px-20 rounded-lg shadow-md relative cursor-pointer min-w-[188px] hover:translate-y-[-4px] transition-all duration-250 ease-in-out hover:shadow-md rounded-xl shadow-lg overflow-hidden">
                        <h1 className="text-4xl font-semibold mb-4">NewYear Sale</h1>
                        <h3 className="text-2xl font-italic mb-4">{300} Bath Discount</h3>
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="border-dashed border text-white px-4 py-2 rounded-l">300 points</span>
                            <button className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer">Redeem it!</button>
                            <h1 className='mb-1'><LoyaltyIcon/></h1>
                            <h1 className="mr-[2px]">Platinum</h1>
                        </div>
                        <p className="text-sm">Valid Till: 20Dec, 2021</p>
                        
                        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

                    </div>
                </div>
        
        
    )};