const { trimStr } = require("./utils");

let users = [];

const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
  );
};

const addUser = (user) => {
  const isExist = findUser(user);
  const isAdmin = users.filter((u) => u.room === user.room).length === 0; 

  !isExist && users.push({ ...user, isAdmin });

  const currentUser = isExist || { ...user, isAdmin };

  return { isExist: !!isExist, user: currentUser, isAdmin: currentUser.isAdmin };
};

const getRoomUsers = (room) => users.filter((u) => u.room === room);

const getAdmin = (room) => users.find((u) => u.room === room && u.isAdmin);

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