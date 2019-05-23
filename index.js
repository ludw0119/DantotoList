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

get();

function showInput(user) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("#photo").src =
    "https://dantoto-eb44.restdb.io/media/" + user.Photo;
  clone.querySelector("#name").textContent = user.Username;
  clone.querySelector("#wins").textContent = user.Wins;
  clone.querySelector("#looses").textContent = user.Looses;
  clone.querySelector("#rating").textContent = user.Rating;
  document.querySelector("table").appendChild(clone);
}
