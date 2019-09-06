function secondsToFinalTime(sec) {
    var _sec = sec;
    var minutes = Math.floor(_sec / 60);
    var seconds = _sec - minutes * 60;
    seconds = seconds.toFixed(0);
    var finalTime = minutes + ':' + seconds;
    return finalTime;
}
