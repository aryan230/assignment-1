import {
  types,
  onSnapshot,
  flow,
  applySnapshot,
  getSnapshot,
} from "mobx-state-tree";

const UserModel = types
  .model("User", {
    isUser: types.boolean,
    userId: types.string,
    userName: types.string,
    userImage: types.string,
  })
  .actions((self) => ({
    setTodos(value) {
      self.userTodos = value;
    },
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
      self.isUser = true;
      (self.userId = user.uid),
        (self.userName = user.displayName),
        (self.userImage = user.photoURL);
    },
    removeUser() {
      localStorage.removeItem("user");
      self.isUser = false;
    },
  }))
  .views((self) => ({
    get todos() {
      return self.isUser;
    },
  }));

let user: any;
if (localStorage.getItem("user")) {
  const userInfoFromStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  user = UserModel.create({
    isUser: true,
    userId: userInfoFromStorage.uid,
    userName: userInfoFromStorage.displayName,
    userImage: userInfoFromStorage.photoURL,
  });
} else {
  user = UserModel.create({
    isUser: false,
    userId: "0",
    userName: "0",
    userImage: "0",
  });
}

export default user;
