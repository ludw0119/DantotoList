let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modalClose");
let deactivatedList = [];
let arrayOfUsers = [];

//prototype object
const userObject = {
  photo: "-user photo-",
  username: "-user name-",
  password: "-user password-",
  wins: "-wins-",
  looses: "-looses-",
  rating: "-rating-",
  fullname: "-fullname-",
  email: "-email-",
  telephone: "-telephone-",
  address: "-address-"
};

/*-----------making object----------*/
function getJSON() {
  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(makeObject);
}
getJSON();

function makeObject(usersList) {
  //alert("make obj");
  usersList.forEach(user => {
    const newUserObject = Object.create(userObject);
    //console.log(userObject); //ten console log działa tak samo jak u Juliany, czyli pokazuje pusty object bez danych z bazy/json, ale z templatem dla każdego usera/studenta
    newUserObject.photo = "https://dantoto-eb44.restdb.io/media/" + user.Photo;
    newUserObject.username = user.Username;
    newUserObject.password = user.Password;
    newUserObject.wins = user.Wins;
    newUserObject.looses = user.Looses;
    newUserObject.rating = user.Rating;
    newUserObject.fullname = user.Fullname;
    newUserObject.email = user.Email;
    newUserObject.telephone = user.Telephone;
    newUserObject.address = user.Address;
    arrayOfUsers.push(newUserObject);
    //console.log(arrayOfUsers);
  });
  displayUsers(arrayOfUsers);
}

function displayUsers(arrayOfUsers) {
  //console.log(arrayOfUsers);
  arrayOfUsers.forEach(user => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".photoTable").src =
      "https://dantoto-eb44.restdb.io/media/" + user.Photo;
    clone.querySelector(".name").textContent = user.Username;
    clone.querySelector(".wins").textContent = user.Wins;
    clone.querySelector(".looses").textContent = user.Looses;
    clone.querySelector(".rating").textContent = user.Rating;
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
  });
}

/*---------------------------------------------------------------displaying table content-----------------------------------------------------------------*/
/*function get() {
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
      //console.log(data);
    });
}*/

/*function showInput(user) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector(".photoTable").src =
    "https://dantoto-eb44.restdb.io/media/" + user.Photo;
  clone.querySelector(".name").textContent = user.Username;
  clone.querySelector(".wins").textContent = user.Wins;
  clone.querySelector(".looses").textContent = user.Looses;
  clone.querySelector(".rating").textContent = user.Rating;
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
}*/

/*---------------------------------------------------------------deleting from database-----------------------------------------------------------------*/

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

//get();

/*-----------------------------------------------------------------modal-----------------------------------------------------------------*/
function showModal(id) {
  //console.log(id);

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
