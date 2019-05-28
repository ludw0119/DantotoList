let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modalClose");

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
  clone.querySelector(".photoTable").src =
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
  let rows = clone.querySelectorAll(".row");
  rows.forEach(row => {
    row.addEventListener("click", e => {
      showModal(user._id);
    });
  });

  document.querySelector("table").appendChild(clone);
}

/*---------------------------------------------------------------deleting-----------------------------------------------------------------*/

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

function showModal(id) {
  console.log(id);

  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users/" + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      modal.style.display = "block";
      let photo = document.querySelector(".photoModal");
      let username = document.querySelector("#Username");
      let fullname = document.querySelector("#Fullname");
      let email = document.querySelector("#Email");
      let telephone = document.querySelector("#Telephone");
      let address = document.querySelector("#Address");

      photo.src = "https://dantoto-eb44.restdb.io/media/" + data.Photo;
      username.textContent = data.Username;
      fullname.textContent = data.Fullname;
      email.textContent = data.Email;
      telephone.textContent = data.Telephone;
      address.textContent = data.Address;

      modalClose.onclick = function() {
        modal.style.display = "none";
        let modalContent = document.querySelector(".modalContent");
      };
    });
}
