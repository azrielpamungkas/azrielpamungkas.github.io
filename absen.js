const base_url = "http://18.141.198.210:8000";
navigator.geolocation.getCurrentPosition((pos) => {
  gps = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  document.getElementById("locationStatus").innerHTML =
    "Dapat mengakses lokasi anda";
  // GET pertama kali untuk checking
  fetch(`${base_url}/student/submit/`, {
    headers: {
      Authorization: "Token 2171ed5591d71b24e7b88158412aadd9b2a6c1a5",
    },
  })
    .then(function (response) {
      // The API call was successful!
      if (response.ok) {
        return response.json();
        console.log("1");
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // This is the JSON from our response
      console.log(data);

      // Ketika Ada Kelas
      if (data.status_code === 11) {
        var element = document.getElementById("attendaceDiv");
        element.classList.remove("hidden");
        document.getElementById("subject").innerHTML = data.data.name;
        document.getElementById("teacher").innerHTML = data.data.teacher;
        document.getElementById("time").innerHTML = data.data.time;
      } else if (data.status_code === 14) {
        document.getElementById("subject").innerHTML = data.data.name;
        document.getElementById("teacher").innerHTML = data.data.teacher;
        document.getElementById("time").innerHTML = data.data.time;
        var element = document.getElementById("alreadyPresence");
        element.classList.remove("hidden");
      }
    })
    .catch(function (err) {
      // There was an error
    });
  // console.log(data);

  document
    .querySelector("#attendanceForm")
    .addEventListener("submit", function () {
      event.preventDefault();
      const tkn = this.elements.token;
      fetch(`${base_url}/student/submit/`, {
        method: "POST",
        body: JSON.stringify({
          token: tkn.value,
          lat: gps.lat,
          lng: gps.lng,
          status: "HADIR",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 2171ed5591d71b24e7b88158412aadd9b2a6c1a5",
        },
      })
        .then(function (response) {
          // The API call was successful!
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(function (data) {
          // This is the JSON from our response
          if (data.status_code !== 15) {
            var element = document.getElementById("alertAlert");
            element.classList.remove("hidden");
            document.getElementById("alert").innerHTML = data.message;
          } else if (data.status_code === 15) {
            var element = document.getElementById("alertAlertSuccess");
            element.classList.remove("hidden");
            document.getElementById("alertSuccess").innerHTML = data.message;
            setTimeout(function () {
              window.location.href = "absen.html"; //will redirect to your blog page (an ex: blog.html)
            }, 2000); //will call the function after 2 secs.
          }
          console.log(data);
        })
        .catch(function (err) {
          // There was an error
          console.warn("Something went wrong.", err);
        });
    });
});
