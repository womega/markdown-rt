function urlCheck(url) {
    fetch(url, { mode: 'no-cors' }).then(r => {
            console.log(r);

            console.log('google is reachable');

        })
        .catch(e => {
            console.log('google is not there');
            return false;
        });
}

/*function urlCheck(url) {
    var state = false;

    var tester = new Image();
    tester.onload = function() {
        state = true;
        conditional(state);
    };
    tester.onerror = function() {
        state = false;
        conditional(state);
    };
    tester.src = url;

    function conditional(status) {
        if (status) {
            //state = status;
            //console.log("Hey, the image loaded correctly.");
            return true;
        } else {
            //state = status;
            //console.log("Bruh, the server is dead.");
        }
    }

    if (conditional(state)) {
        return state
    }
}*/