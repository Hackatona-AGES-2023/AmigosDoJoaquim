const speak = document.querySelector("#textarea");
const microfone = document.querySelector("#microfone");


class SpeechApi {
  constructor() {
    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.speechApi = new SpeechToText();
    this.output = speak; // Atribui o elemento "speak" à propriedade "output"
    this.speechApi.continuous = true;
    this.speechApi.lang = "pt-BR";

    this.speechApi.onresult = (e) => {
      const resultIndex = e.resultIndex;
      const transcript = e.results[resultIndex][0].transcript.toUpperCase()
      speak.value = transcript; // Atualiza o conteúdo do elemento "output"

      this.post(transcript);
    };




    
  }

  start() {
    this.speechApi.start();
  }

  stop() {
    this.speechApi.stop();
  }

  async post(input){
    const res = await axios.post('http://localhost:4000/chat',{
      input
    });
    console.log(res.data);
  }
}


const speech = new SpeechApi();

microfone.addEventListener("mousedown", (e) => {
  speech.start();
});

microfone.addEventListener("mouseup", () => {
  speech.stop();
});
