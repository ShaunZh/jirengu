/*
 * @Author: Marte
 * @Date:   2017-06-27 14:31:55
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-07-02 22:33:48
 */

'use strict';



var city = "广州";
var cityId;
var updateBtn = $('.content__info--update>button').eq(0);
var weatherIcon = {
  duoyun: 'wi-day-cloudy',

};


function sendAjaxGetDate() {
  var xhr = $.ajax({
    url: 'http://jirenguapi.applinzi.com/weather.php',
    type: 'get',
    dataType: 'json',
    data: {
        city: city,
    }
  })
  .done(function(data) {
    let weather = [];
    weather = parseData(data['results'][0]['weather_data']);
    updateWeather(weather);
    if (updateBtn.hasClass('is-loading')) {
      updateBtn.removeClass('is-loading');
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}

function parseData(data) {
  let now = moment();
  let weatherArr = [];
  $.each(data, function(index, val){
    let tempArr = [], tempObj = {};

    tempArr = val['date'].split(' ');
    tempObj['day'] = tempArr[0];
    tempObj['date'] = now.add('days',index?1:0).format('MM月DD日');
    if (index === 0) {
      tempObj['cur_temperature'] = String(tempArr[2]).substr(4, 3);
    } else {

    }
    tempObj['temperature'] = val['temperature'];
    tempObj['weather'] = val['weather'];
    tempObj['wind'] = val['wind'];
    tempObj['dayPicture'] = val['dayPictureUrl'];
    tempObj['nightPicture'] = val['nightPictureUrl'];
    weatherArr.push(tempObj);
  });
  return weatherArr;
}

function updateWeather(data){
  let weatherItem = $('.sub-content__item');
  let updateTime = $('.content__info--update-time');
  let now = moment().format('HH:mm a');
  updateTime.text(now);
  $.each(weatherItem, function(index, val){

    let $this = $(this);
    $this.find('.day').text(data[index]['day']);
    if (index === 0){
      $this.find('.day').text('今天')
      $this.find('.weather-temp-cur').text(data[index]['cur_temperature']);
    }
    $this.find('.weather-temp').text(data[index]['temperature']);
    $this.find('.date').text(data[index]['date']);
    $this.find('.state').text(data[index]['weather']);
    $this.find('.weather-picture').attr('src', data[index]['dayPicture']);

  });


}

function buttonUpdateWeather(){
  updateBtn.on('click', function(e){
  sendAjaxGetDate();
  updateBtn.addClass('is-loading');
  });
}

cityId = getCityId('北京');

buttonUpdateWeather();
sendAjaxGetDate();



