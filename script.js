fetch("http://18.141.198.210:8000/student/", {
  headers: {
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
    console.log(data);

    const empty = Object.keys(data.data.current_lecture).length;
    if (empty === 0) {
      return false;
    } else {
      const subject = (document.getElementById("subject").innerHTML =
        data.data.current_lecture.subject);
      const teacher = (document.getElementById("teacher").innerHTML =
        data.data.current_lecture.teacher);
      const time = (document.getElementById("time").innerHTML =
        data.data.current_lecture.time);
    }
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });
