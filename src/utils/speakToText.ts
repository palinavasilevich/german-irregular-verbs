export const speakToText = (text: string): void => {
  const synth = window.speechSynthesis;

  if (!synth) {
    console.warn("No window.speechSynthesis available.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "de-DE";
  synth.speak(utterance);
};
