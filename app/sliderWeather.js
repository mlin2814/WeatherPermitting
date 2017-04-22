$( function() {
  $( "#slider-range-hot" ).slider({
    range: true,
    min: 0,
    max: 120,
    values: [ 85, 95 ],
    slide: function( event, ui ) {
      $( "#hot" ).val(ui.values[ 0 ] + " degrees - " + ui.values[ 1 ] + " degrees");
    }
  });
  $( "#hot" ).val($( "#slider-range-hot" ).slider( "values", 0 ) + " - " + $( "#slider-range-hot" ).slider( "values", 1 ) );
  });

$( function() {
  $( "#slider-range-warm" ).slider({
    range: true,
    min: 0,
    max: 120,
    values: [ 65, 75 ],
    slide: function( event, ui ) {
      $( "#warm" ).val(ui.values[ 0 ] + " degrees - " + ui.values[ 1 ] + " degrees");
    }
  });
  $( "#warm" ).val($( "#slider-range-warm" ).slider( "values", 0 ) + " - " + $( "#slider-range-warm" ).slider( "values", 1 ) );
  });

$( function() {
  $( "#slider-range-cool" ).slider({
    range: true,
    min: 0,
    max: 120,
    values: [ 45, 55 ],
    slide: function( event, ui ) {
      $( "#cool" ).val(ui.values[ 0 ] + " degrees - " + ui.values[ 1 ] + " degrees");
    }
  });
  $( "#cool" ).val($( "#slider-range-cool" ).slider( "values", 0 ) + " - " + $( "#slider-range-cool" ).slider( "values", 1 ) );
  });

$( function() {
  $( "#slider-range-cold" ).slider({
    range: true,
    min: 0,
    max: 120,
    values: [ 22, 32 ],
    slide: function( event, ui ) {
      $( "#cold" ).val(ui.values[ 0 ] + " degrees - " + ui.values[ 1 ] + " degrees");
    }
  });
  $( "#cold" ).val($( "#slider-range-cold" ).slider( "values", 0 ) + " - " + $( "#slider-range-cold" ).slider( "values", 1 ) );
  });