function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

function metersToMiles(meters) {
    return (meters / 1609.344).toFixed(2);
}

function secondsToTime(seconds) {
    let h, m;
    let out = [];
    if (seconds / 3600 > 1) {
        h = Math.floor(seconds / 3600);
        seconds = seconds - h * 3600;
        out.push(h + 'h');
    }
    m = Math.floor(seconds / 60);
    out.push(m + 'm');
    return out.join(' ');
}

export { debounce, metersToMiles, secondsToTime };
