"use client";
import { TextField } from "@mui/material";
import { HotelItem } from "../../interface";

export default function HotelForm({
  hotel,
  onHotelChange,
}: {
  hotel: HotelItem;
  onHotelChange: Function;
}) {
  return (
    <div className="bg-slate-100 rounded-lg space-y-5 w-full px-10 py-5 flex flex-col">
      <div>Name</div>
      <TextField
        variant="outlined"
        name="name"
        label=""
        defaultValue={hotel.name}
        onChange={(e) => {
          hotel.name = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

      <div>Address</div>
      <TextField
       variant="outlined"
        name="address"
        label=""
        defaultValue={hotel.address}
        onChange={(e) => {
          hotel.address = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

      <div>District</div>
      <TextField
        variant="outlined"
        name="district"
        label=""
        defaultValue={hotel.district}
        onChange={(e) => {
          hotel.district = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

      <div>Province</div>
      <TextField
        variant="outlined"
        name="province"
        label=""
        defaultValue={hotel.province}
        onChange={(e) => {
          hotel.province = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

<div>Postalcode</div>
      <TextField
        variant="outlined"
        name="postalcode"
        label=""
        defaultValue={hotel.postalcode}
        onChange={(e) => {
          hotel.postalcode = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

<div>Tel</div>
      <TextField
        variant="outlined"
        name="tel"
        label=""
        defaultValue={hotel.tel}
        onChange={(e) => {
          hotel.tel = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

<div>Region</div>
      <TextField
        variant="outlined"
        name="region"
        label=""
        defaultValue={hotel.region}
        onChange={(e) => {
          hotel.region = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>

      <div>Image Link</div>
      <TextField
        variant="outlined"
        name="image"
        label=""
        defaultValue={hotel.image}
        onChange={(e) => {
          hotel.image = e.target.value;
          onHotelChange(hotel);
        }}
      ></TextField>
    </div>
  );
}
