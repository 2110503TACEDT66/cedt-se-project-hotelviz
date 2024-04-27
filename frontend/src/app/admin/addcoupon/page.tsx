"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import getOneHotel from "@/libs/getOneHotel";
import HotelForm from "@/components/HotelForm";
import createHotel from "@/libs/createHotel";
import updateHotel from "@/libs/updateHotel";
import deleteHotel from "@/libs/deleteHotel";
import { CouponItem } from "../../../../interface";
import Link from "next/link";
import getCoupons from "@/libs/getCoupons";

export default function AddCoupon() {
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id");

  const [coupon, setCoupon] = useState<CouponItem>(new CouponItem());

  useEffect(() => {
    const getBooking = async () => {
      if (id != null && session && coupon._id == "") {
        setCoupon((await getCoupons(session.user.token, id)).data);
      }
    };
    getBooking();
  }, [coupon]);

  return (
    <main className="w-[100%] flex flex-row space-y-4">
      {session?.user.role == "admin" ? (
        <div className="w-[70%] m-10 flex flex-col">
            <div className="text-4xl font-medium py-5">{!id?"Add Hotel":"Edit Hotel"}</div>
          <div className="">
            
              
              <HotelForm
                hotel={hotel}
                onHotelChange={(value: HotelItem) => {
                  setHotel(value);
                }}
              ></HotelForm>
           <Link href="/admin/allHotels">
              <button
                name="Edit Hotel"
                className="block rounded-full bg-sky-500 px-5 py-2 text-white shadow-sm m-5"
                onClick={makeBooking}
              >
                {id?"Edit Hotel":"Add Hotel"}
              </button>
            </Link>
            {id ?
            
              <button
                name="Delete Hotel"
                className="block rounded-full bg-red-500 px-5 py-2 text-white shadow-sm m-5"
                onClick={async () => {
                  if (id&&confirm("Are you sure you want to delete this booking?")) {
                    await deleteHotel(session.user.token, id);

                    window.location.href="/admin/allHotels"
                  }
                }}
              >
                Delete
              </button>:""}
            
            
          </div>

        </div>
        ) : ("")}
    </main>
  );
}
