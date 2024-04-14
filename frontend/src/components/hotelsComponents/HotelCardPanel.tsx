"use client";
import HotelCard from "./HotelCard";
import Link from "next/link";
import { useReducer, useState } from "react";
import RegionButton from "./RegionButton";
import { useEffect } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getHotels from "@/libs/getHotel";
import { CircularProgress } from "@mui/material";
import LoadingHotelCard from "./LoadingHotelCard";
import PaginationBar from "../PaginationBar";
import Skeleton from "@mui/material/Skeleton";
import { HotelItem, HotelJson } from "../../../interface";

export default function HotelCardPanel({ session = null }: { session?: any }) {

///mock data for RecomendPanel
 const Recomendhotels = [{_id:"660259a44df8344ed9dfbe2d",name:"Continental Hotel",image:"https://drive.google.com/uc?id=1po69QWiOhIlYr36R0xRqCtNod2KWhNlR",province:"Krabi"}
  ,{_id:"660259a44df8344ed9dfbe31",name:"Wan Sabai",image:"https://drive.google.com/uc?id=1yRquMBFLq_U3-vA4cfwOybp_4YVYZWcW",province:"Surat Thani"}
  ,{_id:"660259a44df8344ed9dfbe31",name:"Wan Sabai",image:"https://drive.google.com/uc?id=1yRquMBFLq_U3-vA4cfwOybp_4YVYZWcW",province:"Surat Thani"}
  ,{_id:"660259a44df8344ed9dfbe31",name:"Wan Sabai",image:"https://drive.google.com/uc?id=1yRquMBFLq_U3-vA4cfwOybp_4YVYZWcW",province:"Surat Thani"}
 ]

  const [spinner, setSpinner] = useState(true);
  const [hotels, setHotels] = useState<HotelJson | null>(null);
  const regionReducer = (
    selectedRegion: string,
    action: { regionName: string }
  ) => {
    if (selectedRegion === action.regionName) {
      return "None";
    }
    return action.regionName;
  };
  const [selectedRegion, dispatchRegion] = useReducer(regionReducer, "None");

  const pageReducer = (page: number, action: { newPage: number }) => {
    return action.newPage;
  };
  const [page, dispatchPage] = useReducer(pageReducer, 1);

  const regions = ["Bangkok", "North", "Northeast", "Central", "South"];

  useEffect(() => {
    const fetchData = async () => {
      setSpinner(true);
      setHotels(null);
      let hotels;
      if (session)
        hotels = await getHotels(session.user.token, 4, page, selectedRegion);
      else hotels = await getHotels(null, 4, page, selectedRegion);
      setHotels(hotels);
      setSpinner(false);
    };
    fetchData();
  }, [page, selectedRegion]);

  useEffect(()=> {

  })

  return (
    <div className="my-0 relative bg-blue">
      <div className="relative flex flex-col px-28 py-4">
        <div className="font-poppins font-medium text-2xl">
          Find hotel for your next trip 🗺️
        </div>
        <div className="flex flex-row gap-x-1 mt-8 justify-start ">
          {regions.map((regionName) => (
            <RegionButton
              key={regionName}
              name={regionName}
              selected={selectedRegion === regionName}
              onRegion={() => {
                if (!spinner) {
                  dispatchRegion({ regionName: regionName });
                  dispatchPage({ newPage: 1 });
                }
              }}
            />
          ))}
        </div>
        
          {hotels? page==1&&hotels.count==0?
          <div>
            <div className="py-10 text-center">We're sorry, no hotels matched your criteria.</div>
            <div className="font-poppins font-medium text-2xl pt-10">You Might Also Like</div>
            <div className="grid grid-cols-4grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-4 gap-y-6 mt-8 gap-8 w-full h-auto">
              {Recomendhotels.map((hotel) => (
                  <HotelCard
                    key={hotel._id}
                    hotelName={hotel.name}
                    hotelID={hotel._id}
                    imgSrc={hotel.image}
                    address={hotel.province}
                  ></HotelCard>
                ))}
            </div>
          </div>:"":""}
          
        
        
        <div className="grid grid-cols-4grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-4 gap-y-6 mt-8 gap-8 w-full h-auto">
          {spinner ? <LoadingHotelCard /> : ""}
          {spinner ? <LoadingHotelCard /> : ""}
          {spinner ? <LoadingHotelCard /> : ""}
          {spinner ? <LoadingHotelCard /> : ""}
          {hotels
            ? page==1&&hotels.count==0?""
            
            :(
              hotels.data.map((hotel: HotelItem) => (
                  <HotelCard
                    key={hotel._id}
                    hotelName={hotel.name}
                    hotelID={hotel._id}
                    imgSrc={hotel.image}
                    address={hotel.province}
                  ></HotelCard>
                )))
            : ""}
           
        </div>
        <div className="py-5 justify-self-center mx-auto">
          {hotels ?
           (
            !(page==1&&hotels.count==0)?(
            selectedRegion === "None" ? (
              <PaginationBar
                totalPages={Math.ceil(hotels.total / 4)}
                currentPage={page}
                onPage={(newPage: number) => dispatchPage({ newPage: newPage })}
              />
            ) : (
              <div className="list-style-none flex">
                {page > 1 ? (
                  <button
                    className="hover:bg-slate-50 relative block rounded-xl bg-transparent font-sans font-md px-5 py-3 text-lg text-surface hover:translate-y-[-1px] hover:shadow-md transition-all duration-450 ease-in-out "
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatchPage({ newPage: page - 1 });
                    }}
                  >
                    &laquo;
                  </button>
                ) : (
                  <button className="relative block rounded-xl bg-transparent text-gray-300 font-sans font-md px-5 py-3 text-lg text-surface ">
                    &laquo;
                  </button>
                )}
                <span
                  className={`relative block rounded-xl bg-transparent font-sans font-semibold px-5 py-3 text-lg text-surface `}
                >
                  {page}
                </span>
                {page < hotels.total ? (
                  <button
                    className="hover:bg-slate-50 relative block rounded-xl bg-transparent font-sans font-md px-5 py-3 text-lg text-surface hover:translate-y-[-1px] hover:shadow-md transition-all duration-450 ease-in-out "
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatchPage({ newPage: page + 1 });
                    }}
                  >
                    &raquo;
                  </button>
                ) : (
                  <button className="relative block rounded-xl bg-transparent text-gray-300 font-sans font-md px-5 py-3 text-lg text-surface ">
                    &raquo;
                  </button>
                )}
              </div>
            )
          ):"") : (
            <div className="list-style-none flex space-x-2 rounded-lg">
              <Skeleton
                variant="rectangular"
                className="rounded-3xl"
                width={40}
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="rounded-lg"
                width={40}
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="rounded-3xl"
                width={40}
                height={40}
                animation="wave"
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className="block  w-full " >
              <div className="flex flex-row gap-x-1 mt-16 justify-start mx-10 ">
                  <button className="rounded-full bg-slate-100 px-5 py-2 text-sky-600 shadow-sm font-bold">North</button>
                  <button className="rounded-full bg-slate-100 px-5 py-2 text-sky-600 shadow-sm font-bold">Northeast</button>
                  <button className="rounded-full bg-slate-100 px-5 py-2 text-sky-600 shadow-sm font-bold">Middle</button>
                  <button className="rounded-full bg-slate-100 px-5 py-2 text-sky-600 shadow-sm font-bold">South</button>
              </div>
              <div className="flex flex-row flex-wrap gap-x-10  my-10 mx-10">
                <Link
                  href={'/hote/hid'}
                  key={'hid'}
                  className="w-1/6"
                >
                  <HotelCard
                    hotelName={'Pataya1'}
                    imgSrc="/img/patta.jpg" 
                    address="Chonburi"
                  ></HotelCard>
                </Link>
                <Link
                  href={'/hotel/hid'}
                  key={'hid'}
                  className="w-1/6"
                >
                  <HotelCard
                    hotelName={'Pataya2'}
                    imgSrc="/img/patta.jpg" 
                    address="Chonburi"
                  ></HotelCard>
                </Link>
                <Link
                  href={'/hotel/hid'}
                  key={'hid'}
                  className="w-1/6"
                >
                  <HotelCard
                    hotelName={'Pataya3'}
                    imgSrc="/img/patta.jpg" 
                    address="Chonburi"
                  ></HotelCard>
                </Link>

              </div>
            </div> */}
    </div>
  );
}
