export default [
  {
    name: "ping",
    code: "Pong! $ping ms",
  },
  {
    name: "userinfo",
    aliases: ["whois"],
    code: "$sendMessage[$userInfo[$if[$argsCount>0;$userID[$args[0]];$authorID]]]",
  },
  {
    name: "serverinfo",
    aliases: ["server"],
    code: "$onlyIf[$serverID!=;Use this in a server, not a DM.]$sendMessage[$serverInfo[$serverID]]",
  },
  {
    name: "say",
    aliases: ["echo"],
    code: "$onlyIf[$argsCount>0;Give me something to say!]$sendMessage[$args]",
  },
  {
    name: "help",
    code: "$sendMessage[**Utility:** $prefix$newline ping, userinfo [@user], serverinfo, say <text>$newline**Fun:** 8ball <question>, dice [sides], joke, coinflip$newline**Moderation:** warn, warnings, clearwarns, kick, ban (all take @user [reason])]",
  },
];
