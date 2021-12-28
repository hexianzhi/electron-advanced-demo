console.log("window: ", window);
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let text = document.getElementById("text");

const { handleDB } = window.toMain;

btn1.onclick = function () {
  handleDB("addUser", {
    username: "hexz",
    birthday: "1991.1.1",
  });
};

btn2.onclick = function () {
  const test = { originName: "hexz", newName: "newhexz" };
  handleDB("updateUser", test);
};

btn3.onclick = function () {
  handleDB("deleteUser", { name: "hexz" });
};

btn4.onclick = async () => {
  const res = await handleDB("findUser", {
    username: "hexz",
  });
  const user = res[0];
  text.innerText = `用户名字：${user.username},  用户生日： ${user.birthday}`;
};
