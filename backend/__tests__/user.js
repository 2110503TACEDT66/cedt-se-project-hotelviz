const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/User");
const Coupon = require("../models/Coupon");
const {
  register,
  login,
  reset,
  updateUser,
  logout,
  deleteUser,
  getMe,
} = require("../controllers/auth");

let session = {};

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
      id: session._id,
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
    await User.deleteMany();
    await Coupon.deleteMany();
  });

  afterAll(async () => {
    await User.deleteMany();
    await Coupon.deleteMany();
    await mongoose.connection.close();
  });

  describe("User Model", () => {
    it("should create user model successfully", async () => {
      let error;
      try {
        const user = await User.create({
          name: "admin",
          tel: "123-456-7890",
          email: "admin@gmail.com",
          password: "password123",
          role: "admin",
        });
        await user.save();
      } catch (err) {
        error = err;
      }
      expect(error).toBe(undefined);
      expect(await User.findOne({ name: "admin" })).not.toBe(null);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Register user", () => {
    it("should register a user and return status 201", async () => {
      const res = await createRequest(register, {
        name: "user1",
        tel: "123-456-7890",
        email: "user1@gmail.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(201);
      expect(await User.findOne({ name: "user1" })).not.toBe(null);
    });

    it("should prevent user from register with same email and return status 400", async () => {
      const res = await createRequest(register, {
        name: "testduplicate",
        tel: "123-456-7890",
        email: "user1@gmail.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(400);
      expect(await User.findOne({ name: "testduplicate" })).toBe(null);
    });

    it("should prevent user from register with incorrect format and return status 400", async () => {
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
        email: "user1@gmail.com",
        password: "password123",
      });

      session = res.json;

      expect(res.status).toBe(200);
      expect(res.json.email).toBe("user1@gmail.com");
      expect(session.email).toBe("user1@gmail.com")
    });

    it("should prevent user from login with incorrect request body and return status 400", async () => {
      const res = await createRequest(login, {
        password: "password123",
      });

      expect(res.status).toBe(400);
    });

    it("should prevent user from login with invalid email and return status 400", async () => {
      const res = await createRequest(login, {
        email: "wrongemail@gmail.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(400);
    });

    it("should prevent user from login with incorrect password and return status 401", async () => {
      const res = await createRequest(login, {
        email: "user1@gmail.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Logout user", () => {
    it("should logout user and return status 200", async () => {
      const res = await createRequest(logout);

      expect(res.status).toBe(200);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Reset password", () => {
    it("should set new password and return status 201", async () => {
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      expect(res.status).toBe(200);

      //login with new password
      const res2 = await createRequest(login, {
        email: "user1@gmail.com",
        password: "newpassword",
      });

      expect(res2.status).toBe(200);
    });

    it("should prevent from set new password with incorrect current password and return status 401", async () => {
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      expect(res.status).toBe(401);
    });

    it("should prevent from set new password without current password and return status 400", async () => {
      const res = await createRequest(reset, {
        new_password: "newpassword",
      });

      expect(res.status).toBe(400);
    });

    it("should prevent from set new password without logged-in and return status 500", async () => {
      let tempId = session._id;
      session._id = null;
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      session._id = tempId;

      expect(res.status).toBe(500);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Update user", () => {
    it("should update user and return status 200", async () => {
      const res = await createRequest(updateUser, {
        tel: "000-000-0000",
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tel).toBe("000-000-0000");
      expect((await User.findById(session._id)).tel).toBe("000-000-0000")
    });

    it("should prevent user from update without logged-in and return status 400", async () => {
      let tempId = session._id;
      session._id = null;
      const res = await createRequest(updateUser, {
        tel: "111-111-1111",
      });

      session._id = tempId;

      expect(res.status).toBe(400);
    });

    it("should prevent user from update without body and return status 400", async () => {
      const res = await createRequest(updateUser);

      expect(res.status).toBe(400);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Delete user", () => {
    it("should delete user and return status 200", async () => {
      const res = await createRequest(deleteUser, {
        password: "newpassword",
      });

      expect(res.status).toBe(200);
    });

    it("should prevent user from delete without logged-in and return status 400", async () => {
      const res = await createRequest(deleteUser, {
        password: "newpassword",
      });

      expect(res.status).toBe(500);

      // login another account
      session = (await createRequest(login, {
        email: "admin@gmail.com",
        password: "password123",
      })).json;
    });

    it("should prevent from delete user without password and return status 400", async () => {
      const res = await createRequest(deleteUser, {});

      expect(res.status).toBe(400);
    });

    it("should delete user and return status 200", async () => {
      const res = await createRequest(deleteUser, {
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Tier Upgrade", () => {
    it("Upgrade to Bronze", async () => {
      const res = await createRequest(updateUser, {
        experience: 10,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Bronze");
      expect((await User.findById(session._id)).tier).toBe("Bronze");
    });

    it("Upgrade to Silver", async () => {
      const res = await createRequest(updateUser, {
        experience: 70,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Silver");
      expect((await User.findById(session._id)).tier).toBe("Silver");
    });

    it("Upgrade to Gold", async () => {
      const res = await createRequest(updateUser, {
        experience: 300,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Gold");
      expect((await User.findById(session._id)).tier).toBe("Gold");
    });

    it("Upgrade to Platinum", async () => {
      const res = await createRequest(updateUser, {
        experience: 600,
      });

      expect(res.status).toBe(200);
      expect(res.json.data.tier).toBe("Platinum");
      expect((await User.findById(session._id)).tier).toBe("Platinum");
    });
  });

  //------------------------------------------------------------------------------------------------------------------------
  describe("Get Me", () => {
    it("should get user data with token", async () => {
      const res = await createRequest(getMe);

      expect(res.status).toBe(200);
      expect(res.json.data.email).toBe(session.email);
    });

    it("should prevent from getting user data without token", async () => {
      session._id = null;
      const res = await createRequest(getMe);

      expect(res.status).toBe(400);
    });
  });
});
