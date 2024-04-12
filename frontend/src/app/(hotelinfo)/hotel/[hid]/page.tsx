"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import BookingCard from "@/components/BookingCard";
import getOneHotel from "@/libs/getOneHotel";
import BookingForm from "@/components/BookingForm";

export default function Booking({
  params,
 
}: {
  params: { hid: string };
}) {
  const { data: session } = useSession();
  if (!session || !session.user.token) return <div>Not login</div>;

  const urlParams = useSearchParams();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getOneHotel(session.user.token, params.hid);
      setHotelName(data.data.name);
      sethotelImg(data.data.image);
      sethotelAddress(
        data.data.address +
          " " +
          data.data.district +
          " " +
          data.data.province +
          " " +
          data.data.postalcode
      );
      sethotelRegion(data.data.region);
      sethotelTel(data.data.tel);
    };

    fetchdata();
  }, []);

  const [hotelName, setHotelName] = useState("");
  const [hotelImg, sethotelImg] = useState("");
  const [hotelAddress, sethotelAddress] = useState("");
  const [hotelRegion, sethotelRegion] = useState("");
  const [hotelTel, sethotelTel] = useState("");

  return (
    <main className="p-10 w-full">
      <div className="text-5xl">Your Accommodation Booking</div>
      <div className="py-5 text-2xl text-gray-600">
        Make sure all the details on this page are correct before proceeding the
        booking.
      </div>
      <div className="w-[95%] flex flex-row  gap-5 py-4">
        <div className="  flex flex-col basis-3/5 p-10 rounded-lg shadow-lg">
          <div className="text-3xl font-medium">Booking details</div>
          <div className="text-base text-gray-600 mt-2">
            Please fill in all field correctly to ensure you receive the booking
            comfirmation email
          </div>

          <BookingForm hotelID={params.hid}></BookingForm>
        </div>
        <div className="basis-2/5">
          <BookingCard
            hotelName={hotelName}
            imgSrc={hotelImg}
            address={hotelAddress}
            region={hotelRegion}
            tel={hotelTel}
          />
        </div>
      </div>
    </main>
  );
}
