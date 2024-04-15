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
  amenities: string[] = [];
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
  contactEmail: string;
  contactName: string;
  contactTel: string;
  createdAt: Date;
  id: string;
}

export interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}
