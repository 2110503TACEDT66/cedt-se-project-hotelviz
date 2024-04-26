import MemberExp from "@/components/memberComponents/MemberExp";
import MemberInfo from "@/components/memberComponents/MemberInfo";
import Coupon from "@/components/memberComponents/Coupon";

export default async function Mybookings() {
    return(
        <main>
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