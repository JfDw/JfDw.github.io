const myImage = document.querySelector("img");

myImage.onclick = () => {
  const src = myImage.getAttribute("src");
  if (src === "images/fig1.png") {
    myImage.setAttribute("src", "images/fig2.png");
  } else {
    myImage.setAttribute("src", "images/fig1.png");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("请输入你的姓名");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `欢迎你，${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `欢迎你，${storedName}`;
}

myButton.onclick = function () {
  setUserName();
};
