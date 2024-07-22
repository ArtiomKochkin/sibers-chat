const { trimStr } = require("./utils");

let users = [];

// Find a user in the users array
const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
  );
};

// Add a new user to the users array
const addUser = (user) => {
  const isExist = findUser(user);
  // The first user in the room becomes the admin
  const isAdmin = users.filter((u) => u.room === user.room).length === 0; 

  !isExist && users.push({ ...user, isAdmin });

  const currentUser = isExist || { ...user, isAdmin };

  return { isExist: !!isExist, user: currentUser, isAdmin: currentUser.isAdmin };
};

// Get all users in a specific room
const getRoomUsers = (room) => users.filter((u) => u.room === room);

// Get the admin of a specific room
const getAdmin = (room) => users.find((u) => u.room === room && u.isAdmin);

// Remove a user from the users array
const removeUser = (user) => {
  const found = findUser(user);

  if (found) {
    users = users.filter(
      ({ room, name }) => room === found.room && name !== found.name
    );
  }

  return found;
};

module.exports = { addUser, findUser, getRoomUsers, removeUser, getAdmin };