import MemberExp from "@/components/memberComponents/MemberExp";
import MemberInfo from "@/components/memberComponents/MemberInfo";

export default async function Mybookings() {
    return(
        <main>
          <div className="flex">
            <MemberExp/>
            <MemberInfo/>
          </div>
          
        </main>
    )
}