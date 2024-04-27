"use client";
import MemberExp from "@/components/memberComponents/MemberExp";
import MemberInfo from "@/components/memberComponents/MemberInfo";
import Coupon from "@/components/memberComponents/Coupon";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserInformation } from "../../../interface";
import getUserProfile from "@/libs/getUserProfile";

export default function Member() {

  const { data: session, status } = useSession();
  
  const [userInfo, setUserInfo] = useState<UserInformation>(new UserInformation());

  useEffect(() => {
      const getUserInfo = async () => {
          if(session && userInfo._id == ""){
              const userInfoA:UserInformation = (await getUserProfile(session?.user.token)).data;
              setUserInfo(userInfoA);
          }
      };
      getUserInfo();
  },[userInfo])

    return(
        <main className=" flex flex-col px-28 py-4">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 p-4 min-w-[500px]">
            <MemberExp memberInfo={userInfo}/>
            </div>
            <div className="w-full xl:w-1/2 p-4 min-w-[500px]">
            <MemberInfo memberInfo={userInfo}/>
            </div>
          </div>
          <div>
              <Coupon/>      
          </div>
        </main>
    )
}