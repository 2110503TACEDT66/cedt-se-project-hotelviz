import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HistoryList from "@/components/bookingHistoryComponents copy/HistoryList";
import BookingList from "@/components/myBookingComponents/BookingList";
import getBookings from "@/libs/getBookings";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function BookingHistory() {
  const session = await getServerSession(authOptions);
  const bookings = await getBookings(session!.user.token);
  return (
    <main>
      <Suspense
        fallback={
          <p>
            Bookings Panel is Loading...<LinearProgress></LinearProgress>
          </p>
        }
      >
        <HistoryList bookings={bookings}></HistoryList>
      </Suspense>
    </main>
  );
}
