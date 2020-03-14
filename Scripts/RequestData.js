import {key} from "../ApiKeys";
const urlNearby = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=$latitude,$longitude&radius=1000&keyword=coffee|cafe|tea&type=cafe&key=${key}`;
const urlDetails = `https://maps.googleapis.com/maps/api/place/details/json?place_id=$id&fields=opening_hours&key=${key}`
const urlPhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=$photo_reference&key=${key}`
const urlDist = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=walking&origins=$origin&destinations=$dest&key=${key}`

/*CLASS*/

class Place {
  constructor() {
    this.id = "none";
    this.name = "none";
    this.address = "none";
    this.distance = "none";
    this.duration = "none";
    this.closetime = "none";
    this.opentime = "none";
    this.imageurl = "none";
    this.rating = "none";
    this.position = "none";
    this.ischain = "none";
  }
  //Properties**************************

  //position
  get position() { return this._position; }
  set position(value) { this._position = value; }

  //id
  get id() { return this._id; }
  set id(value) { this._id = value; }

  //Name
  get name() { return this._name; }
  set name(value) { this._name = value; }

  //Position
  get address() { return this._address; }
  set address(value) { this._address = value; }

  //Distance
  get distance() { return this._distance; }
  set distance(value) { this._distance = value; }

  //ischain
  get ischain() { return this._ischain; }
  set ischain(value) { this._ischain = value; }

  //Duration
  get duration() { return this._duration; }
  set duration(value) { this._duration = value; }

  //Closetime
  get closetime() { return this._closetime; }
  set closetime(value) { this._closetime = value; }

  //Opentime
  get opentime() { return this._opentime; }
  set opentime(value) { this._opentime = value; }

  //imageurl
  get imageurl() { return this._imageurl; }
  set imageurl(value) { this._imageurl = value; }

  //rating
  get rating() { return this._rating; }
  set rating(value) { this._rating = value; }

  //numbers of ratings by users
  get rates() { return this._rates; }
  set rates(value) { this._rates = value; }

  //Methods*****************************

  //get openhours in format xx:xx - yy:yy
  openhours() {
    if (this.opentime != "none" && this.closetime != "none") {
      var close = this.closetime.slice(0, 2) + ":" + this.closetime.slice(2, 4);
      var open = this.opentime.slice(0, 2) + ":" + this.opentime.slice(2, 4);
      return open + "-" + close;
    }
    return " "
  }

  timeleft() {
    if (this.opentime != "none" && this.closetime != "none") {
      var currentT = new Date();
      var closeT = createTime(this.closetime)
      var openT = createTime(this.opentime)
      var ndiff = closeT - currentT;
      var difference = Math.floor(ndiff / 1000 / 60);
      var result = "";
      
      //Check if after closing time
      if (difference < 0) {
        result = 0;
      } else {
        result = difference;
      }
      //Check if before opening time
      if (openT > currentT) {
        result = 0;
      }
      //Return "Closed", "Open Xm", "Open Xh Ym", "Open 9h>" depending on results
      if (result == 0) {
        return "Closed"
      }
      if (result < 60) {
        return "Open " + result + "m"
      }
      if (result > 60 && result < 540) {
        var hours = Math.floor(result / 60);
        var minutes = result % 60;
        return "Open " + hours + "h " + minutes + "m";
      }
      if (result >= 540) {
        return "Open 9h>";
      }
    }
    return "(No data)"
  }

  object_form() {
    var jsontext = `{"name":"${this.name}","ischain":"${this.ischain}","address":"${this.address}","distance":"${this.distance}","duration":"${this.duration}","imageurl":"${this.imageurl}","timeleft":"${this.timeleft()}","rating":"${this.rating}","rates":"${this.rates}","openhours":"${this.openhours()}"}`;
    var form = JSON.parse(jsontext);
    return form;
  }

  print_form() {
    let arr = [];
    arr.push("Name: " + this.name + ", " + this.address + "\n");
    arr.push("Travel: " + "(" + this.duration + ")" + this.distance + "\n");
    arr.push("Timeleft: " + this.timeleft() + "\n");
    arr.push("Open_Hours: " + this.openhours() + "\n");
    arr.push("Image: " + this.imageurl + "\n");
    arr.push("Rating: " + this.rating + ", (" + this.rates + ") \n\n");
    arr.push("Position: " + this.position + "\n");
    arr.push("Is chain?: " + this.ischain + "\n");
    return arr.join(",");
  }
};

/********************SUPPORTING FUNCTIONS*********************************/

//Creates a date object using time in format of HHMM
function createTime(time) {
  var date = new Date();
  var hour = parseInt(time.slice(0, 2));
  var minute = parseInt(time.slice(2, 4));
  date.setHours(hour, minute, 0, 0);
  return date;
}

//Returns true if value matches any values in array
function inArray(value, arr) {
  valueLower = value.toLowerCase();
  for (var i = 0; i < arr.length; i++) {
    comparisonLower = arr[i].toLowerCase();
    if (valueLower.includes(comparisonLower)) {
      return "true";
    }
  }
  return "false";
}

//Orders JSON object forms of places by distance, if they are a chain, and if they are open
function orderedPlaces(places) {
  var arr = [];
  for (var i = 0; i < places.length; i++) {
    arr.push(places[i].object_form());
  }
  var ordArr = [];
  var pairs = [];
  for (var i = 0; i < arr.length; i++) {
    pairs.push({ name: arr[i].name, index: i, ischain: arr[i].ischain, duration: arr[i].duration, open: (arr[i].timeleft != "Closed") ? 1 : 0, notchain: (arr[i].ischain != "true") ? 1 : 0 })
  }
  pairs.sort(function (a, b) {
    return a.duration - b.duration;
  });
  pairs.sort(function (a, b) {
    return b.open - a.open;
  });
  pairs.sort(function (a, b) {
    return b.notchain - a.notchain;
  });
  for (var i = 0; i < pairs.length; i++) {
    //console.log(pairs[i])
    ordArr.push(arr[pairs[i].index])
  }
  return ordArr;
}

//Returns a single string conjoining all given place address locations for use in distance matrix
function getLocations(places) {
  var locations = [];
  for (var i = 0; i < places.length; i++) {
    locations.push(places[i].position);
  }
  return locations.join("|");
}

/********************ASYNCHRONOUS FUNCTIONS**********************/

/*This function is the main entry point, it takes the component (this) 
 It uses the array of chains retrieved from the firebase database, and the device's location*/
async function getData(component) {
  //Get phone's current location
  var location = component.state.location
  let latitude = location.coords.latitude
  let longitude = location.coords.longitude

  //Retrieve data from google maps for nearby places
  var data = await retrieveNearbyData(latitude, longitude);

  //Create place objects using data
  var places = await convertDataToPlaces(data, component.state.chains);

  //Add opening and closing times to place objects
  await retrieveOpenHours(places);

  //Add duration and distance to place objects
  await retrieveDistances(places, latitude, longitude);

  var obj = {
    places: orderedPlaces(places),
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  };
  component.setState({ data: obj , status: "Search Results Ready - Touch Below"})
  //Uncomment for testing
  /*
  for (var i = 0; i < places.length; i++){
    console.log(i + ":\n" + places[i].print_form() + "\n");
  }*/
}

async function retrieveNearbyData(latitude, longitude) {
  try {
    var url = urlNearby.replace("$latitude", latitude).replace("$longitude", longitude);
    let response = await fetch(url);
    let responseJson = await response.json();
    console.log("Successfully retrieved Nearby Data....\n" + "JSON length: " + JSON.stringify(responseJson).length + "\n");
    return responseJson;
  } catch (error) {
    console.error('nearbyData Request failed', error);
    return "none";
  }
}

function convertDataToPlaces(data, chains) {
  let places = [];
  for (var i = 0; i < data.results.length; i++) {
    let place = new Place();
    place.name = data.results[i].name;
    place.ischain = inArray(data.results[i].name, chains);
    place.address = data.results[i].vicinity;
    place.id = data.results[i].place_id;
    place.position = data.results[i].geometry.location.lat + "," + data.results[i].geometry.location.lng;
    try {
      var url = urlPhoto.replace("$photo_reference", data.results[i].photos[0].photo_reference)
      place.imageurl = url;
    } catch {
      place.imageurl = "none";
    }
    place.rating = data.results[i].rating;
    place.rates = data.results[i].user_ratings_total;
    places.push(place);
  }
  console.log("Successfully converted into place objects....\n" + "Number of objects: " + places.length + "\n");
  return places;
}

async function retrieveOpenHours(places) {
  let day = new Date().getDay();
  for (var i = 0; i < places.length; i++) {
    let url = urlDetails.replace('$id', places[i].id);
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      places[i].closetime = responseJson.result.opening_hours.periods[day].close.time;
      places[i].opentime = responseJson.result.opening_hours.periods[day].open.time;
    } catch (error) {
      console.log('openHours Request failed', error);
    }
  }
  console.log("Successfully fetched openhours...\n");
}

async function retrieveDistances(places, latitude, longitude) {
  var origin = (latitude + "," + longitude);
  let url = urlDist.replace('$origin', origin).replace('$dest', getLocations(places));
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    for (var i = 0; i < places.length; i++) {
      console.log(places[i].name + ". " + "\n")
      //console.log("url: " + url + "\n");
      places[i].distance = responseJson.rows[0].elements[i].distance.text
      places[i].duration = Math.round(responseJson.rows[0].elements[i].duration.value / 60);
    }
    console.log("Successfully retrieved distances...\n");
  } catch (error) {
    console.error('retrieveDistances Request failed', error);
  }
}

export { getData };