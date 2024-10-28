const { findUser, addUser, removeUser, getAdmin, getRoomUsers } = require("../src/users");

let users;

describe("Users management functions", () => {

  beforeEach(() => {
    users = [
      { name: "Alice", room: "Room1", isAdmin: true },
      { name: "Bob", room: "Room2", isAdmin: false },
      { name: "Charlie", room: "Room1", isAdmin: false },
      { name: "David", room: "Room3", isAdmin: false },
      { name: "Eve", room: "Room2", isAdmin: false },
      { name: "Frank", room: "Room3", isAdmin: false },
      { name: "Grace", room: "Room1", isAdmin: false },
      { name: "Hannah", room: "Room2", isAdmin: true },
      { name: "Ivan", room: "Room3", isAdmin: true },
      { name: "Judy", room: "Room1", isAdmin: false }
    ];
  });

  describe("Find a user", () => {
    it('should return undefined for a non-existing user', () => {
      let user = { name: "Fake user", room: "Room1", isAdmin: false };
      let result = findUser(users, user);

      expect(result).toBeUndefined();
    });

    it('should return undefined for a incorrect user', () => {
      let user = { name: "Fake user" };
      let result = findUser(users, user);

      expect(result).toBeUndefined();
    });

    it('should return the correct user', () => {
      let user = { name: "Judy", room: "Room1", isAdmin: false };
      let result = findUser(users, user);

      expect(result).toEqual(user);
    });
  });

  describe("Add a user", () => {
    it("should return the new user", () => {
      let user = { name: "New user", room: "Room1" };
      let result = addUser(users, user);

      expect(result).toEqual({
        isExist: false,
        isAdmin: false,
        user: { name: "New user", room: "Room1", isAdmin: false }
      })
    });

    it("should return the existing user-admin", () => {
      let user = { name: "Ivan", room: "Room3" };
      let result = addUser(users, user);

      expect(result).toEqual({
        isExist: true,
        isAdmin: true,
        user: { name: "Ivan", room: "Room3", isAdmin: true },
      })
    });

    it("should not return nothing for incorrect user", () => {
      let user = { name: "Ivan" };
      let result = addUser(users, user);

      expect(result).toBeUndefined();
    });
  });

  describe("Remove a user", () => {
    it("should return the founded user", () => {
      let user = { name: "Bob", room: "Room2" };
      let result = removeUser(users, user);

      expect(result).toEqual({ name: "Bob", room: "Room2", isAdmin: false });
    });

    it("should return the unknown user", () => {
      let user = { name: "Bob", room: "Room21312121"  };
      let result = removeUser(users, user);

      expect(result).toBeUndefined();
    });

    it("should return the incorrect user", () => {
      let user = { name: "Bob" };
      let result = removeUser(users, user);

      expect(result).toBeUndefined();
    });
  });

  describe('Get users of room', () => { 
    it("should return users for existing room", () => {
      let result = getRoomUsers(users, 'Room1');

      expect(result).toEqual([
        { name: "Alice", room: "Room1", isAdmin: true },
        { name: "Charlie", room: "Room1", isAdmin: false },
        { name: "Grace", room: "Room1", isAdmin: false },
        { name: "Judy", room: "Room1", isAdmin: false }
      ]);
    });

    it("should return empty array for non-existing room", () => {
      let result = getRoomUsers(users, 'Room1123456879');

      expect(result).toEqual([]);
    });
  });


  describe('Get the admin', () => { 
    it('should return user-admin', () => {
      let result = getAdmin(users, "Room2");

      expect(result).toEqual({ name: "Hannah", room: "Room2", isAdmin: true });
    });

    it('should return undefined for unknown room', () => {
      let result = getAdmin(users, "Room2000");

      expect(result).toBeUndefined();
    });
  });
});