import React from "react";
import { BookingItem, HotelItem } from "../../../interface";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { Rating } from "@mui/material";

interface BookingItemProps {
  bookingItem: BookingItem;
  deleteBooking: (token: string, bookingId: string) => Promise<void>;
  session?: any;
}

const HistoryItemDisplay: React.FC<BookingItemProps> = ({
  bookingItem,
  deleteBooking,
  session,
}) => {
  return (
    <div className="flex border border-disable cursor-pointer hover:translate-y-[-4px] transition-all duration-250 ease-in-out hover:shadow-md w-full h-fit rounded-xl shadow-lg bg-white overflow-hidden hover:bg-blue-50"
    // onClick={() => {
    //   window.location.href = `/account/booking/?id=${bookingItem._id}`;}}
    >
      <div className="w-1/3 relative">
        <Image
          src={bookingItem.hotel?.image || "placeholder.jpg"}
          alt={(bookingItem.hotel as unknown as HotelItem).name}
          layout="fill"
          objectFit="cover"
          className="rounded-l-xl"
        />
      </div>

      <div className="flex-1 flex flex-col gap-3 p-8">
        <div className="flex items-center gap-3">
          <div className="text-md font-medium">
            Hotel: {(bookingItem.hotel as unknown as HotelItem).name}
          </div>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={async (e) => {
              if (session) {
                e.stopPropagation();
                if (confirm("Are you sure you want to delete this booking?")) {
                  await deleteBooking(session.user.token, bookingItem._id);
                } 
                location.reload();
              }
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>

        <div className="text-md">
          Booking Date: {bookingItem.date.toString()}
        </div>
        <div className="text-md">
          Hotel: {(bookingItem.hotel as unknown as HotelItem).name}
        </div>
        <div className="text-md">Contact Name: {bookingItem.contactName}</div>
        <div className="text-md">Contact Email: {bookingItem.contactEmail}</div>
        <div className="text-md">
          Contact Telephone: {bookingItem.contactTel}
        </div>
        <div className="text-md">
          Created At: {bookingItem.createdAt.toString()}
        </div>
        
        <hr/>
        {
          session?.user.role === "admin" ?
          <div className="text-lg text-red-400">
            Users have not rated it yet.
          </div>
          :
          <div className="text-md text-gray-500">
            Rate now to earn more member points.
            <table className="mt-1"><tr>
              <td><Rating size="medium" className=" pr-3 mt-1"></Rating></td>
            <td><button onClick={(e) => {e.stopPropagation();}} className="w-fit px-4 py-1 shadow-lg shadow-xl bg-orange-400 border-2 border-transparent backdrop-blur-sm hover:bg-orange-500 hover:shadow-xl duration-300 ease-in-out text-white rounded-lg font-sans font-lg font-semibold">
              Rate
            </button></td>
            </tr></table>
          </div>
        }
        
      </div>
    </div>
  );
};

export default HistoryItemDisplay;
