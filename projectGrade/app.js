let hero = document.querySelector("div.hero");
let slider = document.querySelector("div.slider");
let animation = document.querySelector("section.animation-wrapper");

//讓整個網站的enter鍵無效
window.addEventListener("keypress", (e) => {
  console.log(e.key);
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

const timeLine = new TimelineMax();

//parameter1 要控制的對象
//parameter2 duration
//parameter3 要控制對象的原始狀態
//parameter4 要控制對象的動畫結束後的狀態
//parameter5 時間差
timeLine
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//計算GPA
let selects = document.querySelectorAll("select");
let credits = document.querySelectorAll(".class-credit");
selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; //GPA計算用分母
  let creditSum = 0; //GPA計算用分子

  for (let i = 0; i < formLength; i++) {
    let convertorValue = convertor(selects[i].value);
    if (!isNaN(credits[i].valueAsNumber) && convertorValue != 0) {
      creditSum += credits[i].valueAsNumber;
      sum += credits[i].valueAsNumber * convertorValue;
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }

  document.getElementById("result-gpa").innerText = result;
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B+" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C+" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D+" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

let allInputs = document.querySelector(".all-inputs");
let addBtn = document.querySelector(".plus-btn");
addBtn.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");
  newForm.appendChild(newDiv);
  allInputs.appendChild(newForm);

  //新增五個元素到div.grader
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.classList.add("class-type");
  newInput1.setAttribute("list", "opt");
  newInput1.setAttribute("placeholder", "class category");
  newDiv.appendChild(newInput1);

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");
  newInput2.setAttribute("placeholder", "class number");
  newDiv.appendChild(newInput2);

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.classList.add("class-credit");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.addEventListener("click", () => {
    setGPA();
  });
  newDiv.appendChild(newInput3);

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  newDiv.appendChild(newSelect);

  let newTrashButton = document.createElement("button");
  newTrashButton.classList.add("trash-button");
  let newI = document.createElement("i");
  newI.classList.add("fas");
  newI.classList.add("fa-trash");
  newTrashButton.appendChild(newI);
  newDiv.appendChild(newTrashButton);

  //按了TrashButton後跑縮小動畫，跑完之後remove form
  newTrashButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        newTrashButton.parentElement.parentElement.remove();
        setGPA();
      }
    );
  });

  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

//按了TrashButton後跑縮小動畫，跑完之後remove form
let allTrashBtns = document.querySelectorAll(".trash-button");
allTrashBtns.forEach((trashBtn) => {
  trashBtn.addEventListener("click", (e) => {
    e.preventDefault();
    trashBtn.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
  });
  trashBtn.parentElement.parentElement.addEventListener("animationend", (e) => {
    trashBtn.parentElement.parentElement.remove();
    setGPA();
  });
});

let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-aescending");

btn1.addEventListener("click", () => {
  handleSorting("descending");
});

btn2.addEventListener("click", () => {
  handleSorting("aescending");
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let graderObjects = [];
  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value;
    let class_number = graders[i].children[1].value;
    let class_credits = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credits == "" &&
        class_grade == ""
      )
    ) {
      let graderObject = {
        class_name,
        class_number,
        class_credits,
        class_grade,
        class_grade_number: convertor(class_grade),
      };
      graderObjects.push(graderObject);
    }
  }

  //假如沒有要排序的東西就不往後執行
  if (graderObjects.length == 0) {
    return;
  }

  graderObjects = mergeSort(graderObjects);
  if (direction == "descending") {
    graderObjects = graderObjects.reverse();
  }

  //根據graderObject裡面的值來更新內容
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < graderObjects.length; i++) {
    allInputs.innerHTML += `<form>
     <div class="grader">
       <input
         type="text"
         class="class-type"
         placeholder="class category"
         list="opt"
         value=${graderObjects[i].class_name}
       /><!--
       --><input
         type="text"
         class="class-number"
         placeholder="class number"
         value=${graderObjects[i].class_number}
       /><!--
       --><input
         type="number"
         class="class-credit"
         min="0"
         max="6"
         placeholder="credits"
         value=${graderObjects[i].class_credits}
       /><!--
       --><select name="select" class="select">
         <option value=""></option>
         <option value="A">A</option>
         <option value="A-">A-</option>
         <option value="B+">B+</option>
         <option value="B">B</option>
         <option value="B-">B-</option>
         <option value="C+">C+</option>
         <option value="C">C</option>
         <option value="C-">C-</option>
         <option value="D+">D+</option>
         <option value="D">D</option>
         <option value="D-">D-</option>
         <option value="F">F</option></select
       ><!--
       --><button class="trash-button">
         <i class="fas fa-trash"></i>
       </button>
     </div>
   </form>`;
  }

  //select用js更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = graderObjects[i].class_grade;
  }

  //重新把事件加上去
  let selects = document.querySelectorAll("select");
  let credits = document.querySelectorAll(".class-credit");
  //幫select新增事件的同時更改顏色
  selects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  credits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  //按了TrashButton後跑縮小動畫，跑完之後remove form
  let allTrashBtns = document.querySelectorAll(".trash-button");
  allTrashBtns.forEach((trashBtn) => {
    trashBtn.addEventListener("click", (e) => {
      e.preventDefault();
      trashBtn.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
    });
    trashBtn.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        trashBtn.parentElement.parentElement.remove();
        setGPA();
      }
    );
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }

  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) return arr;

  if (arr.length == 1) return arr;
  else {
    let middle = Math.floor(arr.length / 2);
    let arr1 = arr.slice(0, middle);
    let arr2 = arr.slice(middle, arr.length);

    return merge(mergeSort(arr1), mergeSort(arr2));
  }
}
