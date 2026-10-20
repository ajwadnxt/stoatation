// Warn counts live in the framework's variable store, scoped per server+user.
const target = "$userID[$args[0]]";
const scope = `$serverID:${target}`;

export default [
  {
    name: "warn",
    code: `$onlyIf[$hasPermission[$serverID;$authorID;warn]==true;You don't have permission to warn members.]$onlyIf[$argsCount>0;Usage: warn @user [reason]]$onlyIf[${target}!=$authorID;You can't warn yourself.]$addVar[warns;1;${scope}]$sendMessage[⚠️ <@${target}> has been warned. They now have $getVar[warns;0;${scope}] warning(s).$newline Reason: $if[$argsCount>1;$restOf[$args;1];No reason given]]`,
  },
  {
    name: "warnings",
    code: `$onlyIf[$argsCount>0;Usage: warnings @user]$sendMessage[<@${target}> has $getVar[warns;0;${scope}] warning(s).]`,
  },
  {
    name: "clearwarns",
    code: `$onlyIf[$hasPermission[$serverID;$authorID;warn]==true;You don't have permission to do that.]$onlyIf[$argsCount>0;Usage: clearwarns @user]$deleteVar[warns;${scope}]$sendMessage[✅ Cleared warnings for <@${target}>.]`,
  },
  {
    name: "kick",
    code: `$onlyIf[$hasPermission[$serverID;$authorID;kick]==true;You need the Kick Members permission.]$onlyIf[$argsCount>0;Usage: kick @user]$onlyIf[${target}!=$authorID;You can't kick yourself.]$sendMessage[$kick[$serverID;${target}]]`,
  },
  {
    name: "ban",
    code: `$onlyIf[$hasPermission[$serverID;$authorID;ban]==true;You need the Ban Members permission.]$onlyIf[$argsCount>0;Usage: ban @user [reason]]$onlyIf[${target}!=$authorID;You can't ban yourself.]$sendMessage[$ban[$serverID;${target};$restOf[$args;1]]]`,
  },
];
