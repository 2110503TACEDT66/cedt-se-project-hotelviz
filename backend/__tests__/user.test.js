const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import your User model
const { register, login, reset } = require("../controllers/auth");

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
      expect(error).toEqual(undefined);
    });

    // it("should require name field", async () => {
    //   let error;
    //   try {
    //     const user = await User.create({
    //       //name: "test1",
    //       tel: "123-456-7890",
    //       email: "test1@gmail.com",
    //       password: "password123",
    //       role: "user",
    //     });
    //     await user.save();
    //   } catch (err) {
    //     error = err;
    //   }
    //   expect(error.message).toEqual(
    //     "User validation failed: name: Please add a name"
    //   );
    // });

    //   describe("Password Encryption", () => {
    //     it("should encrypt password before saving", async () => {
    //       const user = new User({
    //         name: "Test User",
    //         tel: "1234567890",
    //         email: "test@example.com",
    //         password: "password",
    //       });
    //       await user.save();
    //       // Check if password is encrypted
    //       expect(user.password).toBeDefined();
    //       expect(user.password).not.toEqual("password");
    //     });

    //     // Write other tests related to password encryption
    //   });
  });

  describe("Register user", () => {
    it("should register a user and return status 201", async () => {
      const res = await createRequest(register, {
        name: "test2",
        tel: "123-456-7890",
        email: "test2@gmail.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toEqual(201);
    });
  });

  describe("Login user", () => {
    it("should login user and return status 200", async () => {
      const res = await createRequest(login, {
        email: "test1@gmail.com",
        password: "password123",
      });
      
      loginId = res.json._id

      expect(res.status).toEqual(200);
    });
  });

  describe("Reset password", () => {
    it("should reset user password and return status 201", async () => {
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      expect(res.status).toEqual(200);
    });

    it("should not reset user password and return status 401", async () => {
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      expect(res.status).toEqual(401);
    });
  });

  // Write similar tests for other methods like getSignedJwtToken, matchPassword, changePassword
});
