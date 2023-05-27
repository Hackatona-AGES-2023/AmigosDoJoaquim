import { AIResponse } from ".";
import { quickStart } from "tts.js";

var word = document.getElementById("textarea");
var char = document.getElementById("chararea");

var temp = "";

async function WorkPlease() {
  try {
    const res = await axios.post('http://localhost:4000/chat', {
      input: word.value
    });
    char.readOnly = false;
    char.value = String(res.data[AIResponse]);
    char.readOnly = true; // Atualiza o valor do elemento "chararea"
  } catch (error) {
    console.error(error);
  }
  quickStart()
}

word.addEventListener("input", () => { // Usando o evento "input" em vez de "change"
  WorkPlease();
  console.log();
});
