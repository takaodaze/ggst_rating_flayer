import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { DISCORD_TOKEN } from "./secret";

// https://old.discordjs.dev/#/docs/discord.js/14.14.1/class/TextChannel?scrollTo=send
// https://old.discordjs.dev/#/docs/discord.js/14.14.1/class/Embed
// https://qiita.com/nedew/items/4e0c20c1a89e983a6992

// const greenColor = 0x008000;
const redColor = 0xdc143c;

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
discordClient.once("ready", async (readyClient) => {
  const channel = readyClient.channels.cache.get("1189317480628359278");

  if (channel instanceof TextChannel) {
    channel.send({
      embeds: [
        {
          color: redColor,
          title: "博多ソル=バッドガイ が対戦してたみたいです",
          fields: [
            {
              name: "使用キャラクター",
              value: "ソル・バッドガイ",
            },
            {
              name: "相手キャラクター",
              value: "アクセル・ロウ",
              inline: true,
            },
            {
              name: "相手プレイヤー",
              value: "マツコング元帥",
              inline: true,
            },
            {
              name: "階層",
              value: "8F",
            },
            {
              name: "WIN - LOSE",
              value: "4 - 2",
            },
          ],
        },
      ],
    });
  }

  readyClient.destroy();
});

discordClient.login(DISCORD_TOKEN);
