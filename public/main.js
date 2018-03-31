const celsius = "°C";

function visualize(data){
  $(".weekly").append(`<p>Weekly temperature range in ${data.city}, ${data.country}:</p> <p class="period">${data.minPeriodTemp}${celsius} &mdash; ${data.maxPeriodTemp}${celsius}</p>`);
  data.forecasts.forEach(day => {
    let img = $("<img/>")
    let imgUrl = `https://openweathermap.org/img/w/${day.weatherIcon}.png`;
    img.attr("src", imgUrl);
    let content = `
    <p>${day.date}</p>
    <p>${day.minDailyTemp}${celsius} &mdash; ${day.maxDailyTemp}${celsius}</p>
    <p>${day.weatherDesc}</p>
    `
    let childNode = $('<div/>', {
    class: 'forecast',
    html: content
    });
    childNode.append(img);
    $(".forecasts").append(childNode);
  })
}

$(document).keypress(function(e) {
  var key = e.which || e.keyCode;
    if (key === 13) { 
      $(".weekly").empty();
      $(".forecasts").empty();
      let query = $("#inpt_search").val();
      $.getJSON( "http://127.0.0.1:8080/api/forecast/" + query)
      .done(function(data){
          console.log(data);
          visualize(data);
      })
      $("#inpt_search").val('').blur();
    }
});

$("#inpt_search").on('focus', function () {
	$(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function () {
	if($(this).val().length == 0)
		$(this).parent('label').removeClass('active');
});