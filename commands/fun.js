export default [
  {
    name: "8ball",
    code: `$onlyIf[$argsCount>0;Ask me a question first!]🎱 $randomText[Yes, definitely.;It is certain.;Most likely.;Ask again later.;I can't predict that right now.;Don't count on it.;My sources say no.;Very doubtful.]`,
  },
  {
    name: "dice",
    aliases: ["roll"],
    code: `$onlyIf[$argsCount==0||$args[0]>=2;Pick a die with 2 or more sides!]$if[$argsCount==0;🎲 You rolled a $random[1;6]!;🎲 You rolled a $random[1;$args[0]] on a d$args[0]!]`,
  },
  {
    name: "coinflip",
    aliases: ["flip"],
    code: "🪙 $randomText[Heads!;Tails!]",
  },
  {
    name: "joke",
    code: `$randomText[Why do programmers prefer dark mode? Because light attracts bugs.;I would tell you a UDP joke, but you might not get it.;There are 10 kinds of people: those who understand binary and those who don't.;A SQL query walks into a bar, walks up to two tables and asks: can I join you?;Why did the developer go broke? He used up all his cache.]`,
  },
];
