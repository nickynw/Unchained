

function fakeData(component){
    var chains = component.state.chains;
    var arr = [];
    arr.push(createFake(chains, "Costa", "0.4 mi", "1", "1h 30m", "Liverpool street, Super long lane, Powervielle", 3, 15, "07:00-15:00"));
    arr.push(createFake(chains, "Georgie's", "2 mi", "2", "50m", "Manor road north, Hinchley Wood", 5, 20, "07:00-15:00"));
    arr.push(createFake(chains, "Pret", "0.5 mi", "3", "25m", "Alexandra road south of the long name river, Bristol", 3, 50, "07:00-15:00"));
    arr.push(createFake(chains, "Cocoa Shop", "1.1 mi", "4", "Closed", "Streetwise avenue, the 5th", 4.5, 100, "07:00-15:00"));
    arr.push(createFake(chains, "Fantastic Cafe", "0.1 mi", "5", "Closed", "Bishbash boshville, South Boom, Horrorville", 4.5, 100, "07:00-15:00"));
    arr.push(createFake(chains, "Costa2", "0.4 mi", "6", "Closed", "Liverpool street, Little old lady lane", 3, 15, "07:00-15:00"));
    arr.push(createFake(chains, "Mega coffee", "2 mi", "7", "50m", "Manor road north, Hinchley Wood", 5, 20, "07:00-15:00"));
    arr.push(createFake(chains, "Pret2", "0.5 mi", "8", "Closed", "Alexandra road south of the long name river, Bristol", 3, 50, "07:00-15:00"));
    arr.push(createFake(chains, "Cocoa Shop2", "1.1 mi", "9", "Closed", "Streetwise avenue, the 5th, Nearby the valley with the really long name.", 4.5, 100, "07:00-15:00"));
    arr.push(createFake(chains, "Body Shop2", "0.1 mi", "10", "0m", "Bishbash boshville, South Boom, Horrorville", 4.5, 100, "07:00-15:00"));
    arr.push(createFake(chains, "Costa3", "0.4 mi", "11", "Closed", "Liverpool street, Super long lane, Powervale", 3, 15, "07:00-15:00"));
    arr.push(createFake(chains, "Chicken Cottage", "2 mi", "12", "(No data)", "Manor road north, Hinchley Wood", 5, 20, "07:00-15:00"));
    arr.push(createFake(chains, "Pret4", "0.5 mi", "13", "25m", "Lodge street, Castlehaven road", 3, 50, "07:00-15:00"));
    arr.push(createFake(chains, "Honest Cafe", "1.1 mi", "14", "Closed", "Streetwise avenue, the 5th", 4.5, 100, "07:00-15:00"));
    arr.push(createFake(chains, "Covfefe shop", "0.1 mi", "15", "0m", "Bishbash boshville, South Boom, Horrorville", 4.5, 100, "07:00-15:00"));

    var obj = {
      places: orderedArr(arr),
      latitude: 0,
      longitude: 0,
    };
    component.setState({status:"Ready"})
    return obj
  }

  function orderedArr(arr){
    var ordArr = [];
    var pairs = [];
    for(var i = 0; i < arr.length; i++){
        pairs.push({index: i, duration: arr[i].duration, open: (arr[i].timeleft!="Closed") ? 1: 0, notchain: (arr[i].ischain!="true") ? 1:0})
    }
    pairs.sort(function(a, b) {
      return a.duration - b.duration;
    });
    pairs.sort(function(a, b) {
      return b.notchain - a.notchain;
    });
    pairs.sort(function(a, b) {
      return  b.open - a.open;
    });
    for(var i = 0; i < pairs.length; i++){
      ordArr.push(arr[pairs[i].index])
    }
    return ordArr;
  }

  function createFake(chains, name, distance, duration, timeleft, address, rating, rates, openhours){
    var ischain = inArray(name, chains);
    var image = "none";
    return JSON.parse(`{"ischain":"${ischain}","name":"${name}","distance":"${distance}","duration":"${duration}","address":"${address}","timeleft":"${timeleft}","imageurl":"${image}","rating":"${rating}","rates":"${rates}","openhours":"${openhours}"}`)
  }

  function inArray(value, arr){
    for(var i = 0; i < arr.length; i++){
      if(value.includes(arr[i])){
        return true;
      }
    }
    return false;
  }

  export {fakeData};