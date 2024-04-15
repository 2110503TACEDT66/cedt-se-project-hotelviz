"use client";
import React, { useState,useEffect } from "react";
import { 
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip
 } from "@mui/material";
import { HotelItem } from "../../interface";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const amenities = [
      "Wifi(Free)",
      "Wifi(Paid)",
      "TV",
      "Bathtub",
      "Pets Allowed",
      "Breakfast",
      "Bar",
      "Coffee Shop",
      "Restaurant",
      "Gym",
      "Spa",
      "Pool",
      "Massage",
      "Luggage Storage",
      "Car Parking(Free of Charge)",
      "Car Parking(With Fee)",
      "Babysitting",
      "Daily Housekeeping",
      "Laundry Service",
      "Room Service"
];

export default function HotelForm({
  hotel,
  onHotelChange,
}: {
  hotel: HotelItem;
  onHotelChange: Function;
}) {
  const [selectedAmenities, setSelectedAmenities] = useState(hotel.amenities);

  useEffect(() => {
    setSelectedAmenities(hotel.amenities);
    console.log('4')
  }, [hotel.amenities]);
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

      <div>Amenities</div>
      <FormControl>
      <InputLabel>Amenities</InputLabel>
      <Select
        multiple
        value={selectedAmenities}
        onChange={(e) => {
          const selected = e.target.value as string[];
          setSelectedAmenities(selected);
          hotel.amenities = selected;
          onHotelChange(hotel);
        }}
        input={<OutlinedInput label="Multiple Select"/>}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  {const updatedAmenities = selectedAmenities.filter((item) => item !== value);
                  setSelectedAmenities(updatedAmenities)
                  hotel.amenities = updatedAmenities;
                  onHotelChange(hotel)
                }}
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                sx={{
                  backgroundColor:'lightgrey',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#2196f3',
                    color: 'white'
                  },
                }}
              />
            ))}
          </Stack>
        )}
      >
        {amenities.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
            {hotel.amenities.includes(name) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div>
  );
}
