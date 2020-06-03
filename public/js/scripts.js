$(() => {
  const socket = io.connect('http://localhost:5050');
  
  $.getJSON('http://localhost:5050/session', (student) => {
    $.each(student, (key, val) => {
      console.log(val)
      let dispTime = `${val.time_in}`
      let estime = dispTime.substring(11,13) - 4
      dispTime = dispTime.substring(1, 10) + " " + estime + dispTime.substring(13, 16)
      $('#disp-ses').append(`<div class="container-ses"><h4>${val.name}</h4>
      <h4 class="sm">${val.email}</h4>
      <h4>${val.course}</h4>
      <h4>${dispTime}</h4>
      <button type="button" id="${val.id}" class="idNum" >End Session</button></div>`);
    })
  })
  $(document).on("click","button.idNum", function(){
    let idnumber = $('button.idNum').attr('id');
    let url = "http://localhost:5050/time/" + idnumber;
    alert(url)
    $.ajax({ url: url, 
    type: 'PUT',
    success: function(){
      location.reload(true); },
    error: function(result){alert("error " + result + " " + url)}
    });
  })
  $.getJSON('http://localhost:5050/stats', (stats) => {
    $.each(stats, (key, val) => {
      if (! val.IN_SESSION ){
      $('#in-ses').html(0)
      } else{
      $('#in-ses').html(val.IN_SESSION)
      }
      $('#comp-ses').html(val.COMPLETE)
      $('#stu-ses').html(val.STUDENT_COUNT)
    })
  })

  // New socket connected, display users count on page
  socket.on('users connected', function (data) {
    $('#usersConnected').html('Users connected: ' + data)
  })
  //new session was created, prompt for refresh
  socket.on('refresh', function (data) {
    console.log(data.note);
    $("#newRecords").css("display", "block");
  })

})

