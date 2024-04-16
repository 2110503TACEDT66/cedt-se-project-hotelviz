import React from "react";
import { BookingItem, HistoryItem, HotelItem } from "../../../interface";
import Image from "next/image";
import { Rating } from "@mui/material";
import rateHotelStar from "@/libs/rateHotelStar";
import { useState } from "react";


interface HistoryItemProps {
  historyItem: HistoryItem;
  // deleteBooking: (token: string, bookingId: string) => Promise<void>;
  session?: any;
}

const HistoryItemDisplay: React.FC<HistoryItemProps> = ({
  historyItem,
  // deleteBooking,
  session,
}) => {
  const [userRating,setRating] = useState<null|number>(0);

  return (
    <div className="flex border border-disable cursor-pointer transition-all duration-250 ease-in-out w-full h-fit rounded-xl shadow-lg bg-white overflow-hidden ">
      <div className="w-1/3 relative">
        <Image
          src={historyItem.hotel?.image || "placeholder.jpg"}
          alt={(historyItem.hotel as unknown as HotelItem).name}
          layout="fill"
          objectFit="cover"
          className="rounded-l-xl"
        />
      </div>

      <div className="flex-1 flex flex-col gap-3 p-8">
        <div className="flex items-center gap-3">
          <div className="text-md font-medium">
            Hotel: {(historyItem.hotel as unknown as HotelItem).name}
          </div>
        </div>

        <div className="text-md">
          Booking Date: {historyItem.date.toString()}
        </div>
        <div className="text-md">
          Hotel: {(historyItem.hotel as unknown as HotelItem).name}
        </div>
        <div className="text-md">Contact Name: {historyItem.contactName}</div>
        <div className="text-md">Contact Email: {historyItem.contactEmail}</div>
        <div className="text-md">
          Contact Telephone: {historyItem.contactTel}
        </div>
        <div className="text-md">
          Created At: {historyItem.createdAt.toString()}
        </div>
        
        <hr/>
        {
          (historyItem.rating<=5 && historyItem.rating>=0)?
                
                <div>
                  <table>
                  <tr>
                    {session?.user.role === "admin" ?
                    <td className="text-lg text-gray-500">Rating : </td>
                    :
                    <td className="text-lg text-gray-500">You rate : </td>
                    }
                    <td><Rating size="medium" className=" p-1 mt-1" value={historyItem.rating} readOnly={true}></Rating></td>
                  </tr>
                  </table>
                </div>
                :
                <div>
                  {
                    session?.user.role === "admin" ?
                    <div>
                      <div className="text-lg text-red-600">Users have not rated a star yet.</div> 
                    </div>
                    :
                    <div className="text-md text-gray-500">
                      Rate now to earn more member points.
                      <table className="mt-1"><tr>
                        <td><Rating size="medium" className=" pr-3 mt-1" value={userRating}
                          onChange={(e, newValue) => {
                              e.stopPropagation; 
                              if(newValue)
                              {
                                  setRating(newValue);
                              }
                              
                          }}></Rating></td>
                      <td><button onClick={async (e) => {e.stopPropagation();
                      if(userRating){
                        if (confirm(`Are you sure you want to rate this booking ${userRating} stars? \nYou can only rate once.`)) {
                          await rateHotelStar(session.user.token,historyItem.hotel.id,userRating);
                        }} 
                      else {
                        alert('Please rate this booking. (1-5 stars)')
                      }
                      } 
                      } className="w-fit px-4 py-1.5 shadow-lg backdrop-blur-sm hover:shadow-xl duration-300 ease-in-out text-white rounded-lg font-sans font-lg font-semibold
                      bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500">
                        Rate
                      </button></td>
                      </tr></table>
                    </div>
                  }
                </div>
        }        
      </div>
    </div>
  );
};

export default HistoryItemDisplay;
