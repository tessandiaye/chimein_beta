/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
initialize: function() {
    console.log('initialize!');
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    console.log('bindEvents!');
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    //        app.receivedEvent('deviceready');
    
    console.log('onDeviceReady started');
    
    $('#pagetwo').click(function() {
                        console.log('clicked');
                        });
    
    // local database
    //         var jsonSource = 'chimein0323.json';
    
    // or: Heroku database
    var jsonSource = 'https://chimeinnycapi.herokuapp.com/data/chimeinlatest.json';
    //        debugger;
    $.get(jsonSource, function( data ) {
          console.log('got json from',jsonSource,'json:',data);
          // console.log(data);
          app.createMap(data);
          console.log ('got map', map);
          //              app.initSlider();
          }).fail(function(error){
                  //   debugger;
                  console.log('failed to load json with error:',error);
                  }).always(function(){
                            console.log('finished loading JSON');
                            });
}, // >>> END OF onDeviceREeady FUNCTION <<< //
    
createMap: function(data){
    //debugger;
    
    var concertsArray = new Array();
    
    var map = null;
    var myFeaturesLayer = null;
    
    // console.log('creatingMap with data:',data);
    L.mapbox.accessToken = 'pk.eyJ1IjoidGVzc2FuZGlheWUiLCJhIjoiWEQ5b09lOCJ9._EmH5rP4_aAR4w11TKxv6A';
    var geolocate = document.getElementById('geolocate');
    console.log (geolocate);
    // debugger;
//    map = L.mapbox.map('map', 'tessandiaye.0855ba07', {attributionControl: false})
//    .setView([40.740069, -73.967581], 12);
    map = L.mapbox.map('map', 'tessandiaye.m3l2eh23', {attributionControl: false})
    .setView([40.740069, -73.967581], 12);
    
    
    // The GeoJSON representing a point feature with a property of 'video' for the Youtube iframe
    // coordinates here are in longitude, latitude order because
    // x, y is the standard for GeoJSON and many formats
    
    for(var i=0;i<data.length;i++){
        var allConcerts = {
        type: 'Feature',
        properties: {
            // title: "Test",
        title: data[i].ArtistName,
        venue: data[i].Venue,
        price: data[i].Price,
        date: data[i].ConcertDate,
        hour: data[i].Show,
            // video: '<iframe width="180" height="115" src="https://www.youtube.com/embed/JVlWrYx1ARQ" frameborder="0" allowfullscreen></iframe><p>:: '+data[i].ArtistName +'<p>::' +data[i].ConcertDate +'</p>',
        video: '<iframe width="180" height="115" src="https://www.youtube.com/embed/FOFMMMdQeaE" frameborder="0" allowfullscreen></iframe>', 
        value: data[i].value
        },
            
        geometry: {
        type: 'Point',
        coordinates: [data[i].Longitude,data[i].Latitude]
        }
        }
        
        concertsArray.push(allConcerts);
    }
    
    var geoJson = {
    features: concertsArray
    };
    
//  METHOD 1: CSS MARKERS METHOD
    
    var myIcon = L.divIcon({
                           className: 'my-div-icon',
                           iconSize: [10, 10]
                           });
    // you can set .my-div-icon styles in CSS
    
    L.marker([40.717906, -73.94], {icon: myIcon}).addTo(map);
    L.marker([40.780778, -73.981062], {icon: myIcon}).addTo(map);
    L.marker([40.733676, -74.002705], {icon: myIcon}).addTo(map);
    
    // CSS ICON METHOD
    
    // Define an icon called cssIcon
    var cssIcon = L.divIcon({
                            // Specify a class name we can refer to in CSS.
                            className: 'css-icon',
                            // Set marker width and height
                            iconSize: [10, 10]
                            });
    
    
    myFeaturesLayer = L.mapbox.featureLayer(geoJson,{
                                            pointToLayer: function(feature,lonlat) {
                                            return L.marker(lonlat, {icon: cssIcon});
                                            }
                                            }).addTo(map);
    
    
    
    
    
    //  METHOD 2: LEAFLET MARKERS METHOD
    
//    myFeaturesLayer = L.mapbox.featureLayer(geoJson,{
//                                            pointToLayer: function(feature, lonlat) {
//                                            var color = getColor(feature.properties.title);
//                                            return L.circleMarker(lonlat, {
//                                                                  fillColor: color,
//                                                                  fillOpacity: 1,
//                                                                  radius: 3,
//                                                                  stroke: true,
//                                                                  color: color,
//                                                                  weight: 6,
//                                                                  opacity: 0.6
//                                                                  });
//                                            }
//                                            }).addTo(map);
//    
//    
//    function getColor(title){
//        var yellow = '#f4eb66';
//        var red = '#f03';
//        var green = '#70f466';
//        var turquoise = '#67daf4';
//        
//        if(title=="Pokey LaFarge Caroline Rose") return yellow; // DAY 3
//        if(title=="ZZZs/ Palberta/ Dead Tenants/ Big Neck Police/ bbigpigg") return green; // DAY 1
//        if(title=="Fred Thomas") return red; // DAY 1
//        
//        else return turquoise;
//        
//        
//    }
//    
    
    // >>> GEOLOCATION <<<< // - may have to use window.onload = function(){ };
    
    if (!navigator.geolocation) {
        geolocate.innerHTML = 'Geolocation is not available';
    } else {
        geolocate.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            map.locate();
        };
    }
    
    // Once we've got a position, zoom and center the map
    // on it, and add a single marker.
    map.on('locationfound', function(e) {
           console.log('locationfound');
           map.fitBounds(e.bounds);
           
           myLayer.setGeoJSON({
                              type: 'Feature',
                              geometry: {
                              type: 'Point',
                              coordinates: [e.latlng.lng, e.latlng.lat]
                              },
                              properties: {
                              'title': 'Here I am!',
                              'marker-color': '#ff8888',
                              'marker-symbol': 'star'
                              }
                              });
           
           // And hide the geolocation button
           geolocate.parentNode.removeChild(geolocate);
           });
    
    // If the user chooses not to allow their location
    // to be shared, display an error message.
    map.on('locationerror', function() {
           geolocate.innerHTML = 'Position could not be found';
           });
    
    
    var myLayer = L.mapbox.featureLayer().addTo(map);
    
    
    // >>> POPUP <<<< //
    
    // Add the iframe in a marker tooltip using the custom feature properties
    myFeaturesLayer.on('layeradd', function(e) {
                       var marker = e.layer,
                       feature = marker.feature;
                       
                       
                       
                       // Create custom popup content from the GeoJSON property 'video'
                       // var popupContent = feature.properties.video;
                       
                       var popupContent =
                       
                       '<p>' + feature.properties.title + '<br>' +
                       feature.properties.video + '<br>' +
                       feature.properties.venue + '<br>' +
                       feature.properties.date + '<br>' +
                       feature.properties.hour + '<br>' +
                       feature.properties.price + '<br>' +
                       '<div class="save-concert" data-title="' +  feature.properties.title + '">save this concert</div>' + '<br>' +
                       
                       '<\/p>';
                       
                       //                    <form action="https://chimeinnycapi.herokuapp.com/api/handleUserLogin" method="post" >
                       //                               <input type="checkbox" name="thisConcert" value="concerts"> save this concert <br>
                       //                                <input type="submit" value="Submit">
                       //                    </form> ;
                       
                       
                       // bind the popup to the marker http://leafletjs.com/reference.html#popup
                       marker.bindPopup(popupContent,{
                                        closeButton: false,
                                        minWidth: 220
                                        });
                       });
    
    $('body').on('click', '.save-concert', function (e) {
                 var $target = $(e.currentTarget);
                 var title = $target.data('title');
                 console.log('save concert', title);
                 // $.post(URL, {})  > https://api.jquery.com/jquery.post/
                 
                 var userId = window.localStorage.getItem("userId");
                 var username = window.localStorage.getItem("username");
                 
                 var postThisData = {
                    title:title,
                    username: username,
                    facebookId :userId
                    //facebookId: user.id,

                 };
                 
                console.log(postThisData);
                 
                 var posting = $.post('https://chimeinnycapi.herokuapp.com/api/savedConcerts', postThisData);
                 console.log(posting);
                 posting.done(function( data ) {
                              //var content = $( data ).find( "#pagefive" );
                              $('body.save-concert').append(data.result);
                               console.log(data.result);
                               $("#result").append(title);
                              });
                 });

    
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date(2015, 4, 4); // mois en javascript commence à 0.
    var dates = [];
    for (var i = 0; i < 14; i++) {
        dates.push(days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate());
        date.setDate(date.getDate() + 1);
    }
    
    
    $(function() {
      $( "#slider" ).slider({
                            value:1,
                            min: 1,
                            max: 14,
                            step: 1,
                            slide: function( event, ui ) {
                            
                            var todaysConcerts = new Array();
                            console.log(todaysConcerts);
                            
                            
                            $( "#date" ).val( dates[ui.value -1] );
                            var newValue = ui.value;
                            console.log(newValue);
                            for(var i=0;i<concertsArray.length;i++) {
                            var thisConcert = concertsArray[i];
                            if(thisConcert.properties.value===newValue){
                            // show thisConcert
                            console.log(thisConcert);
                            // JQUERY WAY - $('#thisConcert').show()
                            todaysConcerts.push(thisConcert);
                            }
                            else{
                            // hide thisConcert
                            }
                            }
                            
                            var todaysGeoJSON = {
                            features: todaysConcerts
                            };
                            
                            myFeaturesLayer.setGeoJSON(todaysGeoJSON);
                            
                            }
                            });
      $( "#date" ).val( dates[$( "#slider" ).slider( "value" ) - 1] );
      });
    
}, // >>> END OF createMap FUNCTION <<< //
    
    
initSoundcloud: function(){
    var widgetIframe = document.getElementById('sc-widget'),
    widget       = SC.Widget(widgetIframe),
    newSoundUrl = 'http://api.soundcloud.com/tracks/13692671';
    
    console.log(newSoundUrl);
    
    widget.bind(SC.Widget.Events.READY, function() {
                // load new widget
                widget.bind(SC.Widget.Events.FINISH, function() {
                            widget.load(newSoundUrl, {
                                        show_artwork: false
                                        });
                            });
 
                });
}, // >>> END OF initSouncloud FUNCTION <<< //
    
    
    // Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    
    console.log('Received Event: ' + id);
            }
    
}; // >>> END OF app FUNCTION <<< //

