import { z } from "zod";
import { DuelData } from "./Schema/DuelData";
import { CharactorCode } from "./Schema/CharactorCode";
import { Client, TextChannel } from "discord.js";

const GREEN_COLOR = 0x008000;
const RED_COLOR = 0xdc143c;
const CHANNEL_ID = "1189317480628359278";

const convReadableCharactor = (charactor: z.infer<typeof CharactorCode>) => {
  if (charactor === "SO") {
    return "Sol";
  } else if (charactor === "KY") {
    return "Ky";
  } else if (charactor === "MA") {
    return "May";
  } else if (charactor === "AX") {
    return "Axl";
  } else if (charactor === "CH") {
    return "Chipp";
  } else if (charactor === "PO") {
    return "Potemkin";
  } else if (charactor === "FA") {
    return "Faust";
  } else if (charactor === "MI") {
    return "Millia";
  } else if (charactor === "ZA") {
    return "Zato";
  } else if (charactor === "RA") {
    return "Ramlethal";
  } else if (charactor === "LE") {
    return "Leo";
  } else if (charactor === "NA") {
    return "Nagoriyuki";
  } else if (charactor === "GI") {
    return "Giovanna";
  } else if (charactor === "AN") {
    return "Anji";
  } else if (charactor === "IN") {
    return "I-No";
  } else if (charactor === "GO") {
    return "Goldlewis";
  } else if (charactor === "JC") {
    return "Jack-O";
  } else if (charactor === "HA") {
    return "Happy Chaos";
  } else if (charactor === "BA") {
    return "Baiken";
  } else if (charactor === "TE") {
    return "Testament";
  } else if (charactor === "BI") {
    return "Bridget";
  } else if (charactor === "SI") {
    return "Sin";
  } else if (charactor === "BE") {
    return "Bedman";
  } else if (charactor === "AS") {
    return "Asuka";
  } else if (charactor === "JN") {
    return "Johnny";
  } else if (charactor === "EL") {
    return "Elphelt";
  } else {
    const n: never = charactor;
    return n;
  }
};

export const sendResultMessage = (
  client: Client,
  myself: { name: string; charactor: z.infer<typeof CharactorCode> },
  duelData: z.infer<typeof DuelData>,
) => {
  const channel = client.channels.cache.get(CHANNEL_ID);

  if (channel instanceof TextChannel) {
    channel.send({
      embeds: [createMessage(myself, duelData)],
    });
  } else {
    throw new Error("channel is not TextChannel");
  }
};

const createMessage = (
  myself: { name: string; charactor: z.infer<typeof CharactorCode> },
  duelData: z.infer<typeof DuelData>,
) => {
  const content = {
    color: duelData.ratingChangeDirection === "+" ? GREEN_COLOR : RED_COLOR,
    title: `${myself.name} が対戦してたみたいです`,
    fields: [
      {
        name: "使用キャラクター",
        value: convReadableCharactor(myself.charactor),
      },
      {
        name: "相手キャラクター",
        value: duelData.opponentCharater,
        inline: true,
      },
      {
        name: "相手プレイヤー",
        value: duelData.opponentPlayerName,
        inline: true,
      },
      {
        name: "階層",
        value: duelData.floor,
      },
      {
        name: "WIN - LOSE",
        value: `${duelData.win} - ${duelData.lose}`,
      },
    ],
  };
  return content;
};
