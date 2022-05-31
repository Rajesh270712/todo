const id = localStorage.getItem("taskID");

fetchUpdate();
let data;
async function fetchUpdate() {
  try {
    let res = await fetch(`http://localhost:3000/tasks/${id}`);

    data = await res.json();

    let inputEle = document.querySelector("#title");

    inputEle.placeholder = data.title;
  } catch (error) {
    console.log(error);
  }
}

async function addTask() {
  try {
    let title = document.querySelector("#title").value;
    if (title == "") {
      title = data.title;
    }
    let status;
    let checkbox = document.querySelector("#checkbox");

    if (checkbox.checked) {
      status = true;
    } else {
      status = false;
    }
    let body = {
      title,
      status,
    };

    let res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    // console.log(updateData);
    window.location.href = "todo.html";
    // document.querySelector("#container").append(input);
  } catch (error) {
    console.log(error);
  }
}
