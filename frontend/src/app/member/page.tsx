import MemberExp from "@/components/memberComponents/MemberExp";
import MemberInfo from "@/components/memberComponents/MemberInfo";
import Coupon from "@/components/memberComponents/Coupon";

export default async function Mybookings() {
    return(
        <main className="relative flex flex-col px-28 py-4">
          <div className="flex">
            <MemberExp/>
            <MemberInfo/>
          </div>
          <div>
              <Coupon/>      
          </div>
        </main>
    )
}