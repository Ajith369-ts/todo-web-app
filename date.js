
module.exports.getDate =  function(){

    let options = {
        weekday: 'long',
    };
    let d = new Date();
    
    return d.toLocaleDateString("en-US", options);

}

module.exports.getDay =  function(){

    let options = {
        day: 'numeric'
    };
    let d = new Date();
    
    return d.toLocaleDateString("en-US", options);

}

module.exports.getMonth =  function(){

    let options = {
        month: 'long'
    };
    let d = new Date();
    
    return d.toLocaleDateString("en-US", options);

}

module.exports.getYear =  function(){

    let options = {
        year: 'numeric'
    };
    let d = new Date();
    
    return d.toLocaleDateString("en-US", options);

}

// we can make multiple functions by doing this --> module.exports.getDay = function(){}.....