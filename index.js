/*---------------------------------------------------------------displaying-----------------------------------------------------------------*/
function get() {
  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(showInput);
      console.log(data);
    });
}

function showInput(user) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("#photo").src =
    "https://dantoto-eb44.restdb.io/media/" + user.Photo;
  clone.querySelector("#name").textContent = user.Username;
  clone.querySelector("#wins").textContent = user.Wins;
  clone.querySelector("#looses").textContent = user.Looses;
  clone.querySelector("#rating").textContent = user.Rating;
  clone.querySelector(".removeButton").id = "removeButton" + user._id;

  clone.querySelector(".removeButton").addEventListener("click", e => {
    e.target.parentElement.parentElement.remove();
    deleteTask(user._id); //wywołanie funkcji "detete task"
    //console.log(task._id);
  });

  document.querySelector("table").appendChild(clone);
}

/*---------------------------------------------------------------deleting-----------------------------------------------------------------*/

/*document.querySelector("table").addEventListener("click", clickList);

function clickList(event) {
  if (event.target.classList.contains("removeButton")) {
    //event.target.parentElement.remove();
    let removeButtonId = event.target.id;
    let toBeRemoved = removeButtonId.substring(12);
    //console.log(toBeRemoved);
    deleteTask(toBeRemoved);
  }
}*/

function deleteTask(id) {
  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

// Figures out if a remove button was clicked
// If so, calls clickRemove
get();
