export class HotelItem {
  _id: string = "";
  name: string = "";
  address: string = "";
  district: string = "";
  province: string = "";
  postalcode: string = "";
  tel: string = "";
  region: string = "";
  image: string = "";
  __v: number = 0;
  id: string = "";
  roomType: RoomType[]=[];
  amenities: string[] = [];
  rating: number = 0;
  ratingCount: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
}

export class RoomType{
  key : string = "";
  price : number = 0;
}

export interface HotelJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: HotelItem[];
  total: number;
}

export interface BookingItem {
  _id: string;
  date: Date;
  user: string;
  hotel: HotelItem;
  roomType: RoomType;
  contactEmail: string;
  contactName: string;
  contactTel: string;
  createdAt: Date;
  id: string;
}

export class CouponItem {
  _id: string="";
  expiredDate: Date= new Date(0);
  owner: string="";
  type: string="";
  tiers: string[]=[];
  discount: Number=0;
  createdAt: Date= new Date(0);
  point: Number=0;
  used : boolean=false;
}

export interface HistoryItem {
  _id: string;
  date: Date;
  user: string;
  hotel: HotelItem;
  roomType: RoomType;
  contactEmail: string;
  contactName: string;
  contactTel: string;
  createdAt: Date;
  rating: number;
  id: string;

}

export interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

export interface CouponJson {
  success: boolean;
  count: number;
  data: CouponItem[];
  pagination: Object;
  total: number;
}

export class UserInformation {
  _id: string = "";
  name: string = "";
  tel: string = "";
  email: string = "";
  role: string = "";
  createdAt: string = "";
  tier: string = "";
  experience: number = 0;
  point: number = 0;
  coupons: Coupons[] = [];
}

export interface Coupons {
  _id: string;
  type: string;
  discount: number;
  tiers: string[];
  point: number;
  owner: string;
  used: boolean;
  createAt: string;
  expiredDate: string;
}