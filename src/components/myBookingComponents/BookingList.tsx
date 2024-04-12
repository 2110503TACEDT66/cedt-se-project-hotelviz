"use client";

import { useSession } from "next-auth/react";
import deleteBooking from "@/libs/deleteBooking";
import { BookingItem } from "../../../interface";
import BookingItemDisplay from "./BookingItemDisplay";

export default async function BookingList({ bookings }: { bookings: any }) {
  const { data: session } = useSession();

  return (
    <div className="container pt-12 px-36 ">
      <h1
        className={`font-barlow text-3xl font-bold mb-4 ${
          session?.user.role === "admin" ? "text-blue-600" : "text-gray-800"
        }`}
      >
        {session?.user.role === "admin"
          ? "Manage All Bookings"
          : "Manage My Bookings"}
      </h1>

      {session && (
        <h3 className="font-barlow text-lg mb-6">
          Booking Counts: {bookings.count}
        </h3>
      )}

      <div className="grid grid-cols-1 gap-6">
        {bookings.data.map((item: BookingItem) => (
          <BookingItemDisplay
            key={item._id}
            bookingItem={item}
            deleteBooking={deleteBooking}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
