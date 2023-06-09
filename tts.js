
// const textToSpeech = require('@google-cloud/text-to-speech');
import { AIResponse} from './index.js'
import textToSpeech from '@google-cloud/text-to-speech'
// dot env

// require('dotenv').config()
import fs from 'fs';
import util from 'util'
// const fs = require('fs');
// const util = require('util');

const client = new textToSpeech.TextToSpeechClient();


export async function quickStart(phrase) {

  // Construct the request
  const request = {
    "audioConfig": {
      "audioEncoding": "LINEAR16",
      "effectsProfileId": [
        "small-bluetooth-speaker-class-device"
      ],
      "pitch": 1.2,
      "speakingRate": 1.15
    },
    "input": {
      "text": phrase
    },
    "voice": {
      "languageCode": "pt-BR",
      "name": "pt-BR-Neural2-A"
    }
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

