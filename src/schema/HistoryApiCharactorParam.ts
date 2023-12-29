import { z } from "zod";

export const HistoryApiCharactorParam = z.union([
  z.literal("SO"), // sol
  z.literal("KY"), // ky
  z.literal("MA"), // may
  z.literal("AX"), // axl

  z.literal("CH"), // chipp
  z.literal("PO"), // potemkin
  z.literal("FA"), // faust
  z.literal("MI"), // millia

  z.literal("ZA"), // zato
  z.literal("RA"), // ramlethaL
  z.literal("LE"), // leo
  z.literal("NA"), // nagoriyuki

  z.literal("GI"), // giovanna
  z.literal("AN"), // anji
  z.literal("IN"), // i-no
  z.literal("GO"), // goldlewis

  z.literal("JC"), // jack-o
  z.literal("HA"), // happy chaos
  z.literal("BA"), // baiken
  z.literal("TE"), // testament

  z.literal("BI"), // bridget
  z.literal("SI"), // sin
  z.literal("BE"), // bedman?
  z.literal("AS"), // asuka

  z.literal("JN"), // johnny
  z.literal("EL"), // elphelt
]);
