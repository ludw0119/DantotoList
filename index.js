let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modalClose");
let deactivatedList = [];
let arrayOfUsers = [];

//prototype object
const userObject = {
  Photo: "-user photo-",
  Username: "-user name-",
  Password: "-user password-",
  Wins: "-wins-",
  Looses: "-looses-",
  Rating: "-rating-",
  Fullname: "-fullname-",
  Email: "-email-",
  Telephone: "-telephone-",
  Address: "-address-",
  Id: "-id-"
};

/*------------------------------------------------------------------------making object---------------------------------------------------------------------*/

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
    newUserObject.id = user._id;
    arrayOfUsers.push(newUserObject);
    //console.log(user.Username);
    //console.log(newUserObject.username);
  });
  displayUsers(arrayOfUsers);
}

/*---------------------------------------------------------------displaying table 1 content - with object-----------------------------------------------------------------*/

function displayUsers(arrayOfUsers) {
  document.querySelectorAll(".tableRow").forEach(item => {
    item.remove(); //the rows need to deleted before displaying users, because otherwise they are duplicated if the function is called 2 or more times in the code
  });
  arrayOfUsers.forEach(user => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    //console.log(clone);

    if (user.photo === "https://dantoto-eb44.restdb.io/media/") {
      clone.querySelector(".photoTable").src = "images/noPhoto.png";
    } else {
      clone.querySelector(".photoTable").src = user.photo;
    }

    clone.querySelector(".name").textContent = user.username;
    clone.querySelector(".wins").textContent = user.wins;
    clone.querySelector(".looses").textContent = user.looses;
    clone.querySelector(".rating").textContent = user.rating;
    let removeButtonId = "removeButton" + user.id;
    clone.querySelector(".removeButton").id = removeButtonId;
    let removeButtonObject = clone.querySelector(".removeButton");
    removeButtonObject.addEventListener("click", e => {
      showWarning(user.id);
    });
    clone.querySelector(".warningWrapper").id = "warningWrapper" + user.id;

    //console.log(user.id);
    let rows = clone.querySelectorAll(".row");
    rows.forEach(row => {
      row.addEventListener("click", e => {
        showModal(user.id);
      });
    });

    /*let deleteBins = clone.querySelectorAll(".removeButton");
    deleteBins.forEach(bin => {
      console.log(user.id);
      bin.addEventListener("click", showWarning(user.id));
    });*/

    let warningCloses = clone.querySelectorAll(".warningClose");
    warningCloses.forEach(warningClose => {
      warningClose.addEventListener("click", e => {
        hideWarning(user.id);
      });
    });

    /*clone.querySelector(".removeButton").addEventListener("click", e => {
      e.target.parentElement.parentElement.remove();
      deleteTask(user._id); //wywołanie funkcji "detete task"
      //console.log(task._id);
    });*/

    let deleteButtons = clone.querySelectorAll(".deleteButton");
    deleteButtons.forEach(delButton => {
      delButton.addEventListener("click", e => {
        deleteUser(user.id);
      });
    });

    document.querySelector("#table1").appendChild(clone);
  });
}

function showWarning(id) {
  let devID = "#warningWrapper" + id;
  document.querySelector(devID).style.display = "block";
  //alert("warning alert");
}

function hideWarning(id) {
  let devID = "#warningWrapper" + id;
  document.querySelector(devID).style.display = "none";
}

/*---------------------------------------------------------------displaying table 2 content - with object-----------------------------------------------------------------*/

function displayDeactivated(deactivatedList) {
  /*document.querySelectorAll(".tableRow").forEach(item => {
    item.remove(); //the rows need to deleted before displaying users, because otherwise they are duplicated if the function is called 2 or more times in the code
  });*/
  deactivatedList.forEach(user => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    //console.log(clone);

    clone.querySelector(".photoTable").src = user.photo;
    clone.querySelector(".name").textContent = user.username;
    clone.querySelector(".wins").textContent = user.wins;
    clone.querySelector(".looses").textContent = user.looses;
    clone.querySelector(".rating").textContent = user.rating;
    clone.querySelector(".removeButton").id = "removeButton" + user.id;
    //clone.querySelector(".removeButton").addEventListener("click", e => {
    //deleteTask(user.id); //wywołanie funkcji "detete task"
    //console.log(task._id);
    //});
    //console.log(user.id);
    let rows = clone.querySelectorAll(".row");
    rows.forEach(row => {
      row.addEventListener("click", e => {
        showModal(user.id);
      });
    });
    document.querySelector("#table2").appendChild(clone);
    document.querySelector("#table2Wrapper").classList.remove("invisible");
  });
}

/*---------------------------------------------------------------displaying table 1 content - without object-----------------------------------------------------------------*/
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

function deleteUser(id) {
  //deleting from the database
  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {});
  //deleting from the object
  let obj = arrayOfUsers.splice(findById(id), 1);
  //console.log(obj);
  //updating the table view
  hideWarning(id);
  displayUsers(arrayOfUsers);
}

function findById(id) {
  return arrayOfUsers.findIndex(obj => obj.id === id); //the function finds ID of a user in the object (ID in function "deleteTask" argument is an ID number from the database (different than in object)
}

/*---------------------------------------------------------------------modal---------------------------------------------------------------------------*/
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
      let button = document.querySelector("#deactivateButton");
      console.log(data);
      photo.src = "https://dantoto-eb44.restdb.io/media/" + data.Photo;
      username.textContent = data.Username;
      fullname.textContent = data.Fullname;
      email.textContent = data.Email;
      telephone.textContent = data.Telephone;
      address.textContent = data.Address;

      modalClose.onclick = function() {
        hideModal();
      };
      button.onclick = function() {
        deactivateUser(id);
      };
    });
}

function hideModal() {
  modal.classList.add("invisible");
}

function deactivateUser(id) {
  let rowNo = findById(id);
  deactivatedList.push(arrayOfUsers[rowNo]);
  let obj = arrayOfUsers.splice(rowNo, 1); //the variable has a value of a number so it can be used as index in splice
  displayUsers(arrayOfUsers);
  hideModal();
  displayDeactivated(deactivatedList);
}

//let deleteBtn = document.querySelector("#deleteButton");
//  deleteBtn.addEventListener("click", deleteTask(user.id));
