"use client";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
// import getUserProfile from '@/libs/getUserProfile';

export default function MemberInfo() {
    const { data: session, status } = useSession();
    // const [userTel, setUserTel] = useState<string>("");

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         try {
    //             if (status === "authenticated") { 
    //                 // setUserTel("34");
    //                 if(session.user.token !== ""){
    //                 const userProfile = await getUserProfile(session.user.token);
    //                 setUserTel(userProfile.tel);
    //                 // setUserTel("78");
    //                 }
    //                 else {setUserTel("56");}
    //             } else {
    //                 setUserTel("123");
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchUserProfile();
    // }, [session, status]); 

    return(
        <a className="m-2 text-base border border-gray-300 w-full h-[200px] rounded-xl bg-white p-3">
            
            <table>
                <tr>
                    <td className="w-[65px]">Name</td>
                    <td>{session?.user.name}</td>
                </tr>
                {/* <tr>
                    <td>Tel</td>
                    <td>{userTel}</td>
                </tr> */}
                <tr>
                    <td>Email</td>
                    <td>{session?.user.email}</td>
                </tr>
            </table>
        </a>
    )
}
