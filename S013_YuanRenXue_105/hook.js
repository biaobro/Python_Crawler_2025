// capture cookie setting
(function (){
    let cookieTemp = '';
    Object.defineProperty(document, 'cookie', {
        set: function (val) {
            debugger;
            console.log('Hook cookie setting ->: ',val)
            cookieTemp = val;
            return val
        },
        get: function (){
            return cookieTemp
        },
    });
})();

// capture setting of specific variable
(function () {
    Object.defineProperty(window, '_$ss', {
        set: function (val) {
          debugger;
          console.log(val);
          return val
        } ,
    });
})();