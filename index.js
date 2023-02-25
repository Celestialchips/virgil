require("dotenv").config({ path: "../.env" });
const org = process.env['org'];
const virgil = process.env['Virgil'];
const OpenAIapi = process.env['OpenAIAPI'];
// comment me

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: OpenAIapi,
});
const openai = new OpenAIApi(configuration)

client.on('messageCreate', async(message)=>{
  try{
    if (message.author.bot) return
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message.content,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    message.reply(`${response.data.choices[0].text}`)
  } catch (error){
    console.log(error)
  }
})

client.login(virgil)
