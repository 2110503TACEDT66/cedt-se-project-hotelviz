import Image from "next/image";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

export default function Coupon(){
    return(
        <div className="m-2 text-base border border-gray-300 w-full h-[200px] rounded-xl bg-white p-3">
            <h2>Coupon</h2>
            <p><strong>Type:</strong> {"Newyear Sale"} </p>
            <p><strong>Discount:</strong> {"20"} %</p>
            <p><strong>Member Tier:</strong> {"Gold"} </p>
            <p><strong>Points:</strong> {"3500"} </p>
            <p><strong>Expired Date:</strong> {"25/07/2570"} </p>
            <p><strong>Is Used:</strong> {"No"} </p>
            <p><strong>Created Date:</strong> {"25/07/2566"} </p>
        </div>

        
    )
}