import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import express from "express";
import cors from 'cors'


const app = express()
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const configuration = new Configuration({
    apiKey: ""
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var history = [];

history.push({
    role: 'system',
    content: 'Você é um professor tentando ensinar uma criança à ler e escrever. Faça apenas uma pergunta por resposta e só passe para o próximo nível de complexidade quando o aluno apresentar ter absorvido o conteúdo, mesmo que ele precise realizar várias tarefas, mas sempre ajude com dicas. Comece pelo alfabeto, depois passe para as vogais, depois consoantes, depois silabas e então palavras completas. Lembre-se que está falando com uma criança, então seja divertido, animado e simpático. Não use músicas ou canções. Você não pode utilizar palavras ou temas que sejam inadequados para crianças.'
})

export var AIResponse;

userInterface.prompt();

app.post('/chat', async (req, res) => {
    const input = req.body.input;
    history.push({ role: "user", content: input });
    const { data } = await openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: history,
        })
    history.push(data.choices[0].message);
    AIResponse = data.choices[0].message.content;
    res.send({
        AIResponse
    })
})

app.listen(4000, () => {
    console.log('Example app listening on port 4000!')
})