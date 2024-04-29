const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/User");
const Hotel = require("../models/Hotel");
const { createHotel, getHotels, getHotel } = require("../controllers/hotels");

let loginId = null;
let hotelId = null;

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

describe("Hotel", () => {
  beforeAll(async () => {
    dotenv.config({ path: "./config/config.env" });
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI_TEST);

    await Hotel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("Hotel Model", () => {
    it("should create hotel model successfully", async () => {
      let error;
      try {
        const hotel = await Hotel.create({
          name: "hotel1",
          address: "address1",
          district: "district1",
          province: "province1",
          postalcode: "11111",
          tel: "111-111-1111",
          region: "region1",
          image: "https://drive.google.com/uc?id=imageLink",
        });
        await hotel.save();
      } catch (err) {
        error = err;
      }
      expect(error).toBe(undefined);
      let hotel2 = await Hotel.findOne({ name: "hotel1" });
      expect(hotel2).not.toBe(null);
      hotelId = hotel2.id;
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Create hotel", () => {
    it("should create a hotel and return status 201", async () => {
      const res = await createRequest(createHotel, {
        body: {
          name: "hotel2",
          address: "address2",
          district: "district2",
          province: "province2",
          postalcode: "22222",
          tel: "222-222-2222",
          region: "region2",
          image: "https://drive.google.com/uc?id=imageLink",
        },
      });

      expect(res.status).toBe(201);
      expect(await Hotel.findOne({ name: "hotel2" })).not.toBe(null);

      // for(let i = 3;i<30;i++) {
      //   await createRequest(createHotel, {
      //     name: "hotel" + i,
      //     address: "address" + i,
      //     district: "district" + i,
      //     province: "province" + i,
      //     postalcode: "00000",
      //     tel: "000-000-0000",
      //     region: "region" + i,
      //     image: "https://drive.google.com/uc?id=imageLink",
      //   });
      // }
    });

    it("should prevent from creating a hotel with wrong format and return status 400", async () => {
      const res = await createRequest(createHotel, {
        body: {
          address: "address2",
          district: "district2",
          province: "province2",
          postalcode: "22222",
          tel: "222-222-2222",
          region: "region2",
          image: "https://drive.google.com/uc?id=imageLink",
        },
      });

      expect(res.status).toBe(400);
    });
  });

  describe("Get hotels", () => {
    it("should get hotel list and return status 200", async () => {
      const res = await createRequest(getHotels);

      expect(res.status).toBe(200);
    });

    it("should get hotel list with operator and return status 200", async () => {
      const res = await createRequest(getHotels, {
        query: { rating: { gte: 3 } },
      });

      expect(res.status).toBe(200);
    });

    it("should get hotel list with minPrice and maxPrice and return status 200", async () => {
      const res = await createRequest(getHotels, {
        query: { minPrice: 300, maxPrice: 5000 },
      });

      expect(res.status).toBe(200);
    });

    it("should get hotel list with polluted query and return status 200", async () => {
      const res = await createRequest(getHotels, {
        query: { amenities: "Wifi" },
        queryPolluted: { amenities: ["Wifi", "Wifi"] },
      });

      expect(res.status).toBe(200);
    });

    it("should get hotel list with selected field and return status 200", async () => {
      const res = await createRequest(getHotels, { query: { select: "name" } });

      expect(res.status).toBe(200);
    });

    it("should get hotel list with sorted field and return status 200", async () => {
      const res = await createRequest(getHotels, { query: { sort: "rating" } });

      expect(res.status).toBe(200);
    });

    it("should get hotel list with page limit and return status 200", async () => {
      const res = await createRequest(getHotels, { query: { limit: 1 } });

      expect(res.status).toBe(200);
    });

    it("should get hotel list with page index and return status 200", async () => {
      const res = await createRequest(getHotels, {
        query: { limit: 1, page: 2 },
      });

      expect(res.status).toBe(200);
    });
  });

  describe("Get hotel", () => {
    it("should get a hotel with hotel id and return status 200", async () => {
      const res = await createRequest(getHotel, { params: { id: hotelId } });

      expect(res.status).toBe(200);
    });

    it("should prevent from getting a hotel with incorrect hotel id and return status 400", async () => {
      console.log(1111);
      const res = await createRequest(getHotel, { params: { id: "fakeid" } });

      expect(res.status).toBe(400);
    });

    it("should prevent from getting a hotel without hotel id and return status 400", async () => {
      console.log(1111);
      const res = await createRequest(getHotel);

      expect(res.status).toBe(400);
    });
  });
});
