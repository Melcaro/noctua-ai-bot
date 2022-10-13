import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { ask } from './ai.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log('Noctua is online 🦉');
});

client.on('messageCreate', async (message) => {
  const noctuaCommand = ['!noctua', '!Noctua'];

  if (noctuaCommand.includes(message.content.substring(0, 7))) {
    const prompt = message.content.substring(7);
    const answer = await ask(prompt);
    message.channel.send(answer);
  }
});

client.login(process.env.TOKEN);
