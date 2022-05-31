let taskContainer = document.querySelector("#taskContainer");

async function fetchAndShowTask() {
  try {
    let res = await fetch(`http://localhost:3000/tasks`);

    let data = await res.json();
    // JSON.parse(data)
    data.forEach((task) => {
      let taskElement = document.createElement("h2");

      taskElement.textContent = task.title;

      if (task.status) {
        taskElement.style.color = "green";
      } else {
        taskElement.style.color = "red";
      }
      let br = document.createElement("br");
      let editBut = document.createElement("button");
      editBut.innerText = "EDIT";
      editBut.addEventListener("click", function () {
        localStorage.setItem("taskID", task.id);

        window.location.href = "./edit.html";
      });

      let deleteBut = document.createElement("button");
      deleteBut.innerText = "DELETE";
      deleteBut.addEventListener("click", deleteTask);

      async function deleteTask() {
        try {
          let res = fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "Application/json",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      taskContainer.append(taskElement, editBut, deleteBut, br);
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchAndShowTask();

async function addTask() {
  try {
    let title = document.querySelector("#title").value;

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
    console.log(body);

    let res = await fetch(`http://localhost:3000/tasks`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "Application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
