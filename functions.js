const PERMISSIONS = {
  kick: "KickMembers",
  ban: "BanMembers",
  warn: "KickMembers",
};

export function registerFunctions(client) {
  const raw = client.client;

  const getMember = (server, userID) =>
    server.getMember?.(userID) ?? server.members?.get?.(userID) ?? null;

  // $userID[<@ID> or ID] -> ID
  client.addFunction({
    name: "userID",
    execute: (args) => String(args[0] ?? "").replace(/[<@>]/g, "").trim(),
  });

  // $restOf[text;n] -> everything after the first n words (used for reasons)
  client.addFunction({
    name: "restOf",
    execute: (args) =>
      String(args[0] ?? "")
        .trim()
        .split(/\s+/)
        .slice(Number(args[1] ?? 1))
        .join(" "),
  });

  // $userName[id]
  client.addFunction({
    name: "userName",
    execute: (args) => raw.users.get(args[0])?.username ?? "Unknown user",
  });

  // $userInfo[id] -> multi-line summary
  client.addFunction({
    name: "userInfo",
    execute: (args) => {
      const user = raw.users.get(args[0]);
      if (!user) return "I couldn't find that user.";
      const created = user.createdAt?.toISOString?.().slice(0, 10) ?? "unknown";
      return [
        `**${user.username}**`,
        `ID: ${user.id}`,
        `Bot: ${user.bot ? "yes" : "no"}`,
        `Account created: ${created}`,
      ].join("\n");
    },
  });

  // $serverInfo[serverID] -> multi-line summary
  client.addFunction({
    name: "serverInfo",
    execute: (args) => {
      const server = raw.servers.get(args[0]);
      if (!server) return "This command only works in a server.";
      const members = server.members?.size ?? server.members?.length ?? "unknown";
      const channels = server.channels?.length ?? server.channels?.size ?? "unknown";
      const created = server.createdAt?.toISOString?.().slice(0, 10) ?? "unknown";
      return [
        `**${server.name}**`,
        `ID: ${server.id}`,
        `Members: ${members}`,
        `Channels: ${channels}`,
        `Created: ${created}`,
      ].join("\n");
    },
  });

  // $hasPermission[serverID;userID;action] -> "true"/"false"
  // action is one of: kick, ban, warn. Fails closed: any error means "false".
  client.addFunction({
    name: "hasPermission",
    execute: (args) => {
      try {
        const [serverID, userID, action] = args;
        const server = raw.servers.get(serverID);
        if (!server) return "false";
        if ((server.owner?.id ?? server.ownerId) === userID) return "true";
        const member = getMember(server, userID);
        if (!member) return "false";
        return String(Boolean(member.hasPermission(server, PERMISSIONS[action])));
      } catch (err) {
        console.error("hasPermission failed:", err);
        return "false";
      }
    },
  });

  // $kick[serverID;userID] -> result message
  client.addFunction({
    name: "kick",
    execute: async (args) => {
      try {
        const server = raw.servers.get(args[0]);
        const member = server && getMember(server, args[1]);
        if (!member) return "❌ That user isn't in this server.";
        await member.kick();
        return `✅ Kicked <@${args[1]}>.`;
      } catch (err) {
        return `❌ Couldn't kick that user: ${err.message ?? err}`;
      }
    },
  });

  // $ban[serverID;userID;reason?] -> result message
  client.addFunction({
    name: "ban",
    execute: async (args) => {
      try {
        const server = raw.servers.get(args[0]);
        if (!server) return "❌ This command only works in a server.";
        await server.banUser(args[1], { reason: args[2] || undefined });
        return `✅ Banned <@${args[1]}>.`;
      } catch (err) {
        return `❌ Couldn't ban that user: ${err.message ?? err}`;
      }
    },
  });
}
