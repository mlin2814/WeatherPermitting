$("#submit").on('click', function(event) {

  var userName = $( "#name" ).val().trim();
  var phoneNumber = $( "#phone" ).val();
  var zipCode = $( "#location" ).val();

  var hot = $( "#hot" ).val().split(" ");
  var hotMin = hot[0];
  var hotMax = hot[2];

  var warm = $( "#warm" ).val().split(" ");
  var warmMin = warm[0];
  var warmMax = warm[2];

  var cool = $( "#cool" ).val().split(" ");
  var coolMin = cool[0];
  var coolMax = cool[2];

  var cold = $( "#cold" ).val().split(" ");
  var coldMin = cold[0];
  var coldMax = cold[2];

  // AJAX Call to send data to post route
   $.ajax({
     url: '/add',
     type: 'POST',
     body: {
        userName: userName,
        phoneNumber: phoneNumber,
        zipCode: zipCode,
        coldMin: coldMin,
        coldMax: coldMax,
        coolMin: coolMin,
        coolMax: coolMax,
        warmMin: warmMin,
        warmMax: warmMax,
        hotMin: hotMin,
        hotMax: hotMax
     }
   })
   .done(function() {
     // Refresh the Window after the call is done
     console.log('got it');
   });
});