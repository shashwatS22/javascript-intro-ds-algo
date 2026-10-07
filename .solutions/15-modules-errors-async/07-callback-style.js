function getUser(id, callback) {
  setTimeout(() => callback({ id, name: 'Ada' }), 10);
}

getUser(1, (user) => console.log(user.name));
