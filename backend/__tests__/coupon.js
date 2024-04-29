const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/User");
const Coupon = require("../models/Coupon");

let loginId = null;

class Response {
  constructor() {
    this.statusCode = 200;
    this.body = {};
    this.cookies = [];
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(data) {
    this.body = data;
    return this;
  }

  cookie(name, value, options = {}) {
    const cookie = {
      name,
      value,
      options,
    };
    this.cookies.push(cookie);
    return this;
  }
}

async function createRequest(func, request = {}) {
  let req = {
    user: {
      id: loginId,
    },
    params: {
      id: null,
    },
    body: {},
    query: {
      select: null,
    },
    queryPolluted: {
      amenities: null,
    },
  };
  req = { ...req, ...request };
  let res = new Response();
  const next = jest.fn();

  await func(req, res, next);

  return { status: res.statusCode, json: res.body, cookies: res.cookies };
}

describe("Coupon", () => {
  beforeAll(async () => {
    dotenv.config({ path: "./config/config.env" });
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI_TEST);

    await Coupon.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // describe("Coupon Model", () => {
  //   it("should create hotel model successfully", async () => {
  //     let error;
  //     try {
  //       const hotel = await Hotel.create({
  //         name: "hotel1",
  //         address: "address1",
  //         district: "district1",
  //         province: "province1",
  //         postalcode: "11111",
  //         tel: "111-111-1111",
  //         region: "region1",
  //         image: "https://drive.google.com/uc?id=imageLink",
  //       });
  //       await hotel.save();
  //     } catch (err) {
  //       error = err;
  //     }
  //     expect(error).toBe(undefined);
  //     let hotel2 = await Hotel.findOne({ name: "hotel1" });
  //     expect(hotel2).not.toBe(null);
  //     hotelId = hotel2.id;
  //   });
  // });

  //------------------------------------------------------------------------------------------------------------------------
  // describe("Create hotel", () => {
  //   it("should create a hotel and return status 201", async () => {
  //     const res = await createRequest(createHotel, {
  //       body: {
  //         name: "hotel2",
  //         address: "address2",
  //         district: "district2",
  //         province: "province2",
  //         postalcode: "22222",
  //         tel: "222-222-2222",
  //         region: "region2",
  //         image: "https://drive.google.com/uc?id=imageLink",
  //       },
  //     });

  //     expect(res.status).toBe(201);
  //     expect(await Hotel.findOne({ name: "hotel2" })).not.toBe(null);
  //   });
  // });
});
