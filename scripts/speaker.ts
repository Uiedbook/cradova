export const Speaker: Record<string, Function> = {};

Speaker.speak = function (
  text: string | undefined,
  language = "en",
  volume = 1,
  rate = 1,
  pitch = 1
) {
  // common languages (not supported by all browsers)
  // en - english,  it - italian, fr - french,  de - german, es - spanish
  // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.volume = volume;
  utterance.rate = rate;
  utterance.pitch = pitch;
  speechSynthesis.speak(utterance);
};

Speaker.stop = () => {
  return speechSynthesis && speechSynthesis.cancel();
};
