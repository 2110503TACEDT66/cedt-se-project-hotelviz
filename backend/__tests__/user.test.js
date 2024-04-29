const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import your User model
const {
  register,
  login,
  reset,
  updateUser,
  logout,
  deleteUser,
  getMe,
} = require("../controllers/auth");

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

    it("should prevent user from register with same email and return status 400", async () => {
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
        email: "test1@gmail.com",
        password: "password123",
      });

      loginId = res.json._id;

      expect(res.status).toBe(200);
      expect(res.json.email).toBe("test1@gmail.com");
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
        email: "test1@gmail.com",
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
      let tempId = loginId;
      loginId = null;
      const res = await createRequest(reset, {
        current_password: "password123",
        new_password: "newpassword",
      });

      loginId = tempId;

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
    });

    it("should prevent user from update without logged-in and return status 400", async () => {
      let tempId = loginId;
      loginId = null;
      const res = await createRequest(updateUser, {
        tel: "111-111-1111",
      });

      loginId = tempId;

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
        password: "newpassword"
      });

      expect(res.status).toBe(200);
      loginId = null;
    });

    it("should prevent user from delete without logged-in and return status 400", async () => {
      const res = await createRequest(deleteUser, {
        password: "newpassword"
      });

      expect(res.status).toBe(500);

      // login another account
      const res2 = await createRequest(login, {
        email: "test2@gmail.com",
        password: "password123",
      });

      loginId = res2.json._id;
    });

    it("should prevent from delete user without password and return status 400", async () => {
      const res = await createRequest(deleteUser, {
      });

      expect(res.status).toBe(400);
    });

    it("should delete user and return status 200", async () => {
      const res = await createRequest(deleteUser, {
        password: "wrongpassword"
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
  //------------------------------------------------------------------------------------------------------------------------
  describe("Get Me", () => {
    it("should get user data with token", async () => {
      const res = await createRequest(getMe);

      expect(res.status).toBe(200);
      console.log(res.json.data);
    });

    it("should prevent from getting user data without token", async () => {
      loginId = null;
      const res = await createRequest(getMe);
      console.log(res.json.data);

      expect(res.status).toBe(400);
    });
  })
});
