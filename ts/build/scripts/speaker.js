define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Speaker = {};
    Speaker.speak = function (text, language, volume, rate, pitch) {
        if (language === void 0) { language = "en"; }
        if (volume === void 0) { volume = 1; }
        if (rate === void 0) { rate = 1; }
        if (pitch === void 0) { pitch = 1; }
        // common languages (not supported by all browsers)
        // en - english,  it - italian, fr - french,  de - german, es - spanish
        // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.volume = volume;
        utterance.rate = rate;
        utterance.pitch = pitch;
        speechSynthesis.speak(utterance);
    };
    Speaker.stop = function () {
        return speechSynthesis && speechSynthesis.cancel();
    };
    exports["default"] = Speaker;
});
//# sourceMappingURL=speaker.js.map