export default function AllCouponCard({couponType, discount, tier, point, createdDate, expiredDate,count,usedCount,unusedCount,ownedCount,unownedCount}:
     {couponType: string,  discount: number, tier: string[], point: number, createdDate: Date, expiredDate: Date,count:number,usedCount:number,unusedCount:number,ownedCount:number,unownedCount:number}) {
    return (
        <a href={"/admin/addcoupon/?id="+couponType}>
            <div className="relative flex flex-col m-0 gap-2 border border-disable cursor-pointer min-w-[188px] hover:translate-y-[-4px] transition-all duration-250 ease-in-out hover:shadow-md w-full h-[300px] rounded-xl shadow-lg overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3), #ff8c00, #ff0000)' }}>
                <div className="h-[80%] px-4 py-6 flex flex-col justify-between">
                    <div>
                        <p className="text-3xl font-semibold mb-2">Coupon Type: {couponType}</p>   
                        <p className="text-lg mb-1">Discount: {discount.toString()}</p>
                        <p className="text-lg mb-1">Tier: {tier.join(', ')}</p> 
                        <p className="text-lg">Point: {point.toString()}</p>
                        <p className="text-lg">count: {count.toString()}</p>
                        <p className="text-lg">usedCount: {usedCount.toString()}</p>
                        <p className="text-lg">unusedCount: {unusedCount.toString()}</p>
                        <p className="text-lg">ownedCount: {ownedCount.toString()}</p>
                        <p className="text-lg">unownedCount: {unownedCount.toString()}</p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-4 text-right text-lg">
                    <p>Created Date: {createdDate.toString()}</p>
                    <p>Expired Date: {expiredDate.toString()}</p>
                </div>
            </div>
        </a>
    );
}
