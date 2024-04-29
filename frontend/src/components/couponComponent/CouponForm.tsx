"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
} from "@mui/material";
import { CouponItem, SummaryCoupon } from "../../../interface";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker,LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const tiers = [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    
  ];

export default function CouponForm({
  coupon,
  onCouponChange,
  onNumberCouponChange,
}: {
    coupon: SummaryCoupon;
  onCouponChange: Function;
  onNumberCouponChange: Function;
}) {

  const [date, setDate] = useState<Dayjs | null>(dayjs(coupon.expiredDate));
  

  {
    const [selectedTiers, setSelectedTiers] = useState(coupon.tiers);

    useEffect(() => {
        setSelectedTiers(coupon.tiers);
      
    }, [coupon.tiers]);
    return (
      <div className="bg-slate-100 rounded-lg space-y-5 w-full px-10 py-5 flex flex-col">
        <div>Coupon Type</div>

        <TextField
          variant="outlined"
          name="name"
          label=""
          defaultValue={coupon._id}
          onChange={(e) => {
            coupon.type = e.target.value;
            onCouponChange(coupon);
          }}
        ></TextField>

        <div>Discount (Baht)</div>
        <TextField
          variant="outlined"
          name="discount"
          label=""
          defaultValue={coupon.discount}
          onChange={(e) => {
            coupon.discount = Number(e.target.value);
            onCouponChange(coupon);
          }}
        ></TextField>

        <div>Points</div>
        <TextField
          variant="outlined"
          name="point"
          label=""
          defaultValue={coupon.point}
          onChange={(e) => {
            coupon.point = Number(e.target.value);
            onCouponChange(coupon);
          }}
        ></TextField>

     <div>Coupon expired Date</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        
          slotProps={{ textField: { size: "medium" } }}
          className="bg-white"
          defaultValue={dayjs(coupon.expiredDate)}
          value={date}
          onChange={(newValue) => {
            if (newValue) {
            coupon.expiredDate = newValue.toDate();
            setDate(newValue);
            onCouponChange(coupon);}
          }}
        ></DatePicker>
      </LocalizationProvider>
      
        {!coupon._id?
<div>

        <div>Numbers of Coupon</div>
        <TextField
          variant="outlined"
          name="CouponNum"
          label=""
          defaultValue={null}
          onChange={(e) => {
            const value = e.target.value;
            onNumberCouponChange(value);
          }}
        ></TextField>
</div>
        :""
        }


        <div>Tiers</div>
        <FormControl>
          <InputLabel>Tiers</InputLabel>
          <Select
            multiple
            value={selectedTiers}
            onChange={(e) => {
              const selected = e.target.value as string[];
              setSelectedTiers(selected);
              coupon.tiers = selected;
              onCouponChange(coupon);
            }}
            input={<OutlinedInput label="Multiple Select" />}
            renderValue={(selected) => (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => {
                      const updatedTiers = selectedTiers.filter(
                        (item) => item !== value
                      );
                      setSelectedTiers(updatedTiers);
                      coupon.tiers = updatedTiers;
                      onCouponChange(coupon);
                    }}
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    sx={{
                      backgroundColor: "lightgrey",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#2196f3",
                        color: "white",
                      },
                    }}
                  />
                ))}
              </Stack>
            )}
          >
            {tiers.map((name) => (
              <MenuItem
                key={name}
                value={name}
                sx={{ justifyContent: "space-between" }}
              >
                {name}
                {coupon.tiers.includes(name) ? (
                  <CheckIcon color="info" />
                ) : null}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}
