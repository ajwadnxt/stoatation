import { StoatlyClient } from "stoatly.js";

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is online!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

const client = new StoatlyClient({ prefix: "." });

client.command({
  name: "ping",
  code: "Pong! \$ping ms", 
});

client.login(process.env.TOKEN);
