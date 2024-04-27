"use client";

import createBooking from "@/libs/createBooking";
import updateBooking from "@/libs/updateBooking";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingItem, RoomType } from "../../interface";
import getOneBooking from "@/libs/getOneBooking";
import getBookings from "@/libs/getBookings";
import DateReserve from "./DateReserve";
import DateReserveEdit from "./DateReserveEdit";


export default function BookingForm({ hotelID = "",roomType}: { hotelID?: string,roomType?:RoomType[] }) {
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id");

  if (id) hotelID = id;

  const makeBooking = async () => {
    if (session) {
      const item = {
        date: dayjs(bookingDate).toDate(),
        roomType:roomtype,
        contactEmail: contactEmail,
        contactName: contactName,
        contactTel: contactTel,
      };
      if (id) {
        await updateBooking(session.user.token, id, item);
        window.location.href = "/account/mybookings";
      } else {
        if (canCreateBooking) {
          await createBooking(session.user.token, bookingLocation, item);
          window.location.href = "/account/mybookings";
        } else alert("Can't book more than three");
      }
    }
  };

  const [canCreateBooking, setCanCreateBooking] = useState<boolean>(false);
  const [contactName, setName] = useState<string>("");
  const [contactEmail, setEmail] = useState<string>("");
  const [contactTel, setTel] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [bookingLocation, setBookingLocation] = useState<string>(hotelID);
  const [roomtype, setRoomType] = useState<RoomType | null>(null);

  useEffect(() => {
    const getBooking = async () => {
      if (!session) return;
      if (id != null && !contactEmail) {
        const booking: BookingItem = (
          await getOneBooking(session.user.token, id)
        ).data;
        setName(booking.contactName);
        setEmail(booking.contactEmail);
        setTel(booking.contactTel);
        setBookingDate(dayjs(booking.date));
        setBookingLocation(booking.hotel._id);
        setRoomType(booking.roomType);
      } else {
        const bookings = await getBookings(session.user.token);
        if (bookings.count < 3) setCanCreateBooking(true);
      }
    };
    getBooking();
  }, [contactName, contactEmail, contactTel, bookingDate, bookingLocation, roomtype]);
  
  return (
    <div className="">
      <div className="w-full space-y-2">
        {!id&&roomType?

        <DateReserve
          contactName={contactName}
          contactEmail={contactEmail}
          contactTel={contactTel}
          bookingDate={bookingDate}
          bookingLocation={bookingLocation}
          roomtype={roomType}
          onNameChange={(value: string) => {
            setName(value);
          }}
          onEmailChange={(value: string) => {
            setEmail(value);
          }}
          onTelChange={(value: string) => {
            setTel(value);
          }}
          onDateChange={(value: Dayjs) => {
            setBookingDate(value);
          }}
          onLocationChange={(value: string) => {
            setBookingLocation(value);
          }}
          onRoomTypeChange={(value: RoomType) => {
            setRoomType(value);
          }}
        ></DateReserve>
        :
        <DateReserveEdit
        contactName={contactName}
          contactEmail={contactEmail}
          contactTel={contactTel}
          bookingDate={bookingDate}
          bookingLocation={bookingLocation}
          
          onNameChange={(value: string) => {
            setName(value);
          }}
          onEmailChange={(value: string) => {
            setEmail(value);
          }}
          onTelChange={(value: string) => {
            setTel(value);
          }}
          onDateChange={(value: Dayjs) => {
            setBookingDate(value);
          }}
          onLocationChange={(value: string) => {
            setBookingLocation(value);
          }}
          >
            </DateReserveEdit>}
      </div>
      <div className="flex flex-row-reverse">
        <button
          name="Book Now!"
          className="block rounded-full bg-orange-500 px-5 py-2 text-white shadow-sm mt-5"
          onClick={makeBooking}
        >
          Book Now!
        </button>
      </div>
    </div>
  );
}
