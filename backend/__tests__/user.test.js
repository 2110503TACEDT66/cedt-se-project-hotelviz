const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import your User model
const { register, login, reset, updateUser } = require("../controllers/auth");

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

async function createRequest(func, body = null) {
  const req = {
    user: {
      id: loginId,
    },
    body: body,
  };
  let res = new Response();
  const next = jest.fn();

  await func(req, res, next);

  return { status: res.statusCode, json: res.body, cookies: res.cookies };
}

describe("User", () => {
  beforeAll(async () => {
    dotenv.config({ path: "./config/config.env" });
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI_TEST);

    //
    await User.deleteMany();
  });

  // afterEach(async () => {
  //   await User.deleteMany();
  // });

  afterAll(async () => {
    //await User.deleteMany();
    await mongoose.connection.close();
  });

  describe("User Model", () => {
    it("should create user model successfully", async () => {
      let error;
      try {
        const user = await User.create({
          name: "test1",
          tel: "123-456-7890",
          email: "test1@gmail.com",
          password: "password123",
          role: "user",
        });
        await user.save();
      } catch (err) {
        error = err;
      }
      expect(error).toBe(undefined);
      expect(await User.findOne({ name: "test1" })).not.toBe(null);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Register user", () => {
    it("should register a user and return status 201", async () => {
      const res = await createRequest(register, {
        name: "test2",
        tel: "123-456-7890",
        email: "test2@gmail.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(201);
      expect(await User.findOne({ name: "test2" })).not.toBe(null);
    });

    it("should not register a user with same email and return status 400", async () => {
      const res = await createRequest(register, {
        name: "testduplicate",
        tel: "123-456-7890",
        email: "test2@gmail.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(400);
      expect(await User.findOne({ name: "testduplicate" })).toBe(null);
    });

    it("should not register a user and return status 400", async () => {
      const res = await createRequest(register, {
        name: "testcannotcreateuser",
        tel: "123-456-7890",
        email: "test",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(400);
      expect(await User.findOne({ name: "testcannotcreateuser" })).toBe(null);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Login user", () => {
    it("should login user and return status 200", async () => {
      const res = await createRequest(login, {
        email: "test1@gmail.com",
        password: "password123",
      });

      loginId = res.json._id;

      expect(res.status).toBe(200);
      expect(res.json.email).toBe("test1@gmail.com");
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Reset password", () => {
    it("should reset user password and return status 201", async () => {
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      expect(res.status).toBe(200);
    });

    it("should not reset user password and return status 401", async () => {
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      expect(res.status).toBe(401);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Tier Upgrade", () => {
    it("Upgrade to None", async () => {
      const res = await createRequest(updateUser, {
        experience: 0,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("None");
    });

    it("Upgrade to Bronze", async () => {
      const res = await createRequest(updateUser, {
        experience: 10,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Bronze");
    });

    it("Upgrade to Silver", async () => {
      const res = await createRequest(updateUser, {
        experience: 70,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Silver");
    });

    it("Upgrade to Gold", async () => {
      const res = await createRequest(updateUser, {
        experience: 300,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Gold");
    });

    it("Upgrade to Platinum", async () => {
      const res = await createRequest(updateUser, {
        experience: 600,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Platinum");
    });
  });
});
