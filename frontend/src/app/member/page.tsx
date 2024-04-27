"use client";
import MemberExp from "@/components/memberComponents/MemberExp";
import MemberInfo from "@/components/memberComponents/MemberInfo";
import Coupon from "@/components/memberComponents/Coupon";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserInformation } from "../../../interface";
import getUserProfile from "@/libs/getUserProfile";
import { Skeleton } from "@mui/material";
import MemberLoading from "@/components/memberComponents/MemberLoading";

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
        <main className=" flex flex-col px-28 py-8">
          {
            (userInfo._id == "")? 
            <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 p-4 min-w-[500px]">
            <MemberLoading/>
            </div>
            <div className="w-full xl:w-1/2 p-4 min-w-[500px]">
            <MemberLoading/>
            </div>
          </div>
        :
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 p-4 min-w-[500px]">
            <MemberExp memberInfo={userInfo}/>
            </div>
            <div className="w-full xl:w-1/2 p-4 min-w-[500px]">
            <MemberInfo memberInfo={userInfo}/>
            </div>
          </div>
          }

          <h1 className="text-2xl font-bold mx-4 mt-8">Your Coupon</h1>
          <div className="flex overflow-x-auto mx-4 ">
              <Coupon/>      
              <Coupon/>      
          </div>
          <h1 className="text-2xl font-bold mx-4 mt-8">Collect coupons here !</h1>
          <div className="flex overflow-x-auto mx-4 ">
              <Coupon/>      
              <Coupon/>      
              <Coupon/>                 
              <Coupon/>      
          </div>
        </main>
    )
}