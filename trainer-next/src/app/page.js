"use client";

import { useEffect, useRef } from "react";

const verbs = [
  {
    id: "byt",
    ru: "Ññ¥<¥'¥O",
    de: "sein",
    note: "ƒsÿ PrÇÏsens wird weggelassen (Ñî ¥?¥'¥ŸÑïÑæÑ«¥').",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["Ññ¥<Ñ¯", "Ññ¥<Ñ¯Ñø", "Ññ¥<Ñ¯Ñó", "Ññ¥<Ñ¯Ñ÷"],
  },
  {
    id: "moch",
    ru: "Ñ¬Ñó¥Î¥O",
    de: "kÇônnen",
    pres: [
      "Ñ¬ÑóÑü¥Ÿ",
      "Ñ¬ÑóÑôÑæ¥^¥O",
      "Ñ¬ÑóÑôÑæ¥'",
      "Ñ¬ÑóÑôÑæÑ¬",
      "Ñ¬ÑóÑôÑæ¥'Ñæ",
      "Ñ¬ÑóÑü¥Ÿ¥'",
    ],
    past: ["Ñ¬ÑóÑü", "Ñ¬ÑóÑüÑ¯Ñø", "Ñ¬ÑóÑüÑ¯Ñó", "Ñ¬ÑóÑüÑ¯Ñ÷"],
  },
  {
    id: "hotet",
    ru: "¥.Ñó¥'Ñæ¥'¥O",
    de: "wollen",
    pres: [
      "¥.Ñó¥Î¥Ÿ",
      "¥.Ñó¥ÎÑæ¥^¥O",
      "¥.Ñó¥ÎÑæ¥'",
      "¥.Ñó¥'Ñ÷Ñ¬",
      "¥.Ñó¥'Ñ÷¥'Ñæ",
      "¥.Ñó¥'¥?¥'",
    ],
    past: ["¥.Ñó¥'ÑæÑ¯", "¥.Ñó¥'ÑæÑ¯Ñø", "¥.Ñó¥'ÑæÑ¯Ñó", "¥.Ñó¥'ÑæÑ¯Ñ÷"],
  },
  {
    id: "idti",
    ru: "Ñ÷Ñï¥'Ñ÷",
    de: "gehen (jetzt)",
    pres: ["Ñ÷Ñï¥Ÿ", "Ñ÷Ñï¥'¥^¥O", "Ñ÷Ñï¥'¥'", "Ñ÷Ñï¥'Ñ¬", "Ñ÷Ñï¥'¥'Ñæ", "Ñ÷Ñï¥Ÿ¥'"],
    past: ["¥^¥'Ñ¯", "¥^Ñ¯Ñø", "¥^Ñ¯Ñó", "¥^Ñ¯Ñ÷"],
  },
  {
    id: "poyti",
    ru: "Ñ¨ÑóÑû¥'Ñ÷",
    de: "losgehen",
    note: "ƒsÿ perfektiv, kein PrÇÏsens",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["Ñ¨Ñó¥^¥'Ñ¯", "Ñ¨Ñó¥^Ñ¯Ñø", "Ñ¨Ñó¥^Ñ¯Ñó", "Ñ¨Ñó¥^Ñ¯Ñ÷"],
  },
  {
    id: "delat",
    ru: "ÑïÑæÑ¯Ñø¥'¥O",
    de: "machen",
    pres: [
      "ÑïÑæÑ¯Ñø¥Z",
      "ÑïÑæÑ¯ÑøÑæ¥^¥O",
      "ÑïÑæÑ¯ÑøÑæ¥'",
      "ÑïÑæÑ¯ÑøÑæÑ¬",
      "ÑïÑæÑ¯ÑøÑæ¥'Ñæ",
      "ÑïÑæÑ¯Ñø¥Z¥'",
    ],
    past: ["ÑïÑæÑ¯ÑøÑ¯", "ÑïÑæÑ¯ÑøÑ¯Ñø", "ÑïÑæÑ¯ÑøÑ¯Ñó", "ÑïÑæÑ¯ÑøÑ¯Ñ÷"],
  },
  {
    id: "sdelat",
    ru: "¥?ÑïÑæÑ¯Ñø¥'¥O",
    de: "machen (fertig)",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["¥?ÑïÑæÑ¯ÑøÑ¯", "¥?ÑïÑæÑ¯ÑøÑ¯Ñø", "¥?ÑïÑæÑ¯ÑøÑ¯Ñó", "¥?ÑïÑæÑ¯ÑøÑ¯Ñ÷"],
  },
  {
    id: "govorit",
    ru: "ÑüÑóÑýÑó¥?Ñ÷¥'¥O",
    de: "sprechen",
    pres: [
      "ÑüÑóÑýÑó¥?¥Z",
      "ÑüÑóÑýÑó¥?Ñ÷¥^¥O",
      "ÑüÑóÑýÑó¥?Ñ÷¥'",
      "ÑüÑóÑýÑó¥?Ñ÷Ñ¬",
      "ÑüÑóÑýÑó¥?Ñ÷¥'Ñæ",
      "ÑüÑóÑýÑó¥?¥?¥'",
    ],
    past: ["ÑüÑóÑýÑó¥?Ñ÷Ñ¯", "ÑüÑóÑýÑó¥?Ñ÷Ñ¯Ñø", "ÑüÑóÑýÑó¥?Ñ÷Ñ¯Ñó", "ÑüÑóÑýÑó¥?Ñ÷Ñ¯Ñ÷"],
  },
  {
    id: "skazat",
    ru: "¥?Ñ§ÑøÑúÑø¥'¥O",
    de: "sagen",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["¥?Ñ§ÑøÑúÑøÑ¯", "¥?Ñ§ÑøÑúÑøÑ¯Ñø", "¥?Ñ§ÑøÑúÑøÑ¯Ñó", "¥?Ñ§ÑøÑúÑøÑ¯Ñ÷"],
  },
  {
    id: "znat",
    ru: "ÑúÑ«Ñø¥'¥O",
    de: "wissen / kennen",
    pres: [
      "ÑúÑ«Ñø¥Z",
      "ÑúÑ«ÑøÑæ¥^¥O",
      "ÑúÑ«ÑøÑæ¥'",
      "ÑúÑ«ÑøÑæÑ¬",
      "ÑúÑ«ÑøÑæ¥'Ñæ",
      "ÑúÑ«Ñø¥Z¥'",
    ],
    past: ["ÑúÑ«ÑøÑ¯", "ÑúÑ«ÑøÑ¯Ñø", "ÑúÑ«ÑøÑ¯Ñó", "ÑúÑ«ÑøÑ¯Ñ÷"],
  },
  {
    id: "videt",
    ru: "ÑýÑ÷ÑïÑæ¥'¥O",
    de: "sehen",
    pres: [
      "ÑýÑ÷Ñô¥Ÿ",
      "ÑýÑ÷ÑïÑ÷¥^¥O",
      "ÑýÑ÷ÑïÑ÷¥'",
      "ÑýÑ÷ÑïÑ÷Ñ¬",
      "ÑýÑ÷ÑïÑ÷¥'Ñæ",
      "ÑýÑ÷Ñï¥?¥'",
    ],
    past: ["ÑýÑ÷ÑïÑæÑ¯", "ÑýÑ÷ÑïÑæÑ¯Ñø", "ÑýÑ÷ÑïÑæÑ¯Ñó", "ÑýÑ÷ÑïÑæÑ¯Ñ÷"],
  },
  {
    id: "dumat",
    ru: "Ñï¥ŸÑ¬Ñø¥'¥O",
    de: "denken",
    pres: [
      "Ñï¥ŸÑ¬Ñø¥Z",
      "Ñï¥ŸÑ¬ÑøÑæ¥^¥O",
      "Ñï¥ŸÑ¬ÑøÑæ¥'",
      "Ñï¥ŸÑ¬ÑøÑæÑ¬",
      "Ñï¥ŸÑ¬ÑøÑæ¥'Ñæ",
      "Ñï¥ŸÑ¬Ñø¥Z¥'",
    ],
    past: ["Ñï¥ŸÑ¬ÑøÑ¯", "Ñï¥ŸÑ¬ÑøÑ¯Ñø", "Ñï¥ŸÑ¬ÑøÑ¯Ñó", "Ñï¥ŸÑ¬ÑøÑ¯Ñ÷"],
  },
  {
    id: "brat",
    ru: "Ññ¥?Ñø¥'¥O",
    de: "nehmen",
    pres: [
      "ÑñÑæ¥?¥Ÿ",
      "ÑñÑæ¥?¥'¥^¥O",
      "ÑñÑæ¥?¥'¥'",
      "ÑñÑæ¥?¥'Ñ¬",
      "ÑñÑæ¥?¥'¥'Ñæ",
      "ÑñÑæ¥?¥Ÿ¥'",
    ],
    past: ["Ññ¥?ÑøÑ¯", "Ññ¥?ÑøÑ¯Ñø", "Ññ¥?ÑøÑ¯Ñó", "Ññ¥?ÑøÑ¯Ñ÷"],
  },
  {
    id: "vzyat",
    ru: "ÑýÑú¥?¥'¥O",
    de: "nehmen",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["ÑýÑú¥?Ñ¯", "ÑýÑú¥?Ñ¯Ñø", "ÑýÑú¥?Ñ¯Ñó", "ÑýÑú¥?Ñ¯Ñ÷"],
  },
  {
    id: "dat",
    ru: "ÑïÑø¥'¥O",
    de: "geben",
    note: "ƒsÿ unregelmÇÏÇYig",
    pres: [
      "ÑïÑøÑ¬",
      "ÑïÑø¥^¥O",
      "ÑïÑø¥?¥'",
      "ÑïÑøÑïÑ÷Ñ¬",
      "ÑïÑøÑïÑ÷¥'Ñæ",
      "ÑïÑøÑï¥Ÿ¥'",
    ],
    past: ["ÑïÑøÑ¯", "ÑïÑøÑ¯Ñø", "ÑïÑøÑ¯Ñó", "ÑïÑøÑ¯Ñ÷"],
  },
  {
    id: "zhdat",
    ru: "ÑôÑïÑø¥'¥O",
    de: "warten",
    pres: ["ÑôÑï¥Ÿ", "ÑôÑï¥'¥^¥O", "ÑôÑï¥'¥'", "ÑôÑï¥'Ñ¬", "ÑôÑï¥'¥'Ñæ", "ÑôÑï¥Ÿ¥'"],
    past: ["ÑôÑïÑøÑ¯", "ÑôÑïÑøÑ¯Ñø", "ÑôÑïÑøÑ¯Ñó", "ÑôÑïÑøÑ¯Ñ÷"],
  },
  {
    id: "priyti",
    ru: "Ñ¨¥?Ñ÷Ñû¥'Ñ÷",
    de: "ankommen",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["Ñ¨¥?Ñ÷¥^¥'Ñ¯", "Ñ¨¥?Ñ÷¥^Ñ¯Ñø", "Ñ¨¥?Ñ÷¥^Ñ¯Ñó", "Ñ¨¥?Ñ÷¥^Ñ¯Ñ÷"],
  },
  {
    id: "uyti",
    ru: "¥ŸÑû¥'Ñ÷",
    de: "weggehen",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["¥Ÿ¥^¥'Ñ¯", "¥Ÿ¥^Ñ¯Ñø", "¥Ÿ¥^Ñ¯Ñó", "¥Ÿ¥^Ñ¯Ñ÷"],
  },
  {
    id: "prihodit",
    ru: "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷¥'¥O",
    de: "kommen",
    pres: [
      "Ñ¨¥?Ñ÷¥.ÑóÑô¥Ÿ",
      "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷¥^¥O",
      "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷¥'",
      "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷Ñ¬",
      "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷¥'Ñæ",
      "Ñ¨¥?Ñ÷¥.ÑóÑï¥?¥'",
    ],
    past: ["Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷Ñ¯", "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷Ñ¯Ñø", "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷Ñ¯Ñó", "Ñ¨¥?Ñ÷¥.ÑóÑïÑ÷Ñ¯Ñ÷"],
  },
  {
    id: "spat",
    ru: "¥?Ñ¨Ñø¥'¥O",
    de: "schlafen",
    pres: [
      "¥?Ñ¨Ñ¯¥Z",
      "¥?Ñ¨Ñ÷¥^¥O",
      "¥?Ñ¨Ñ÷¥'",
      "¥?Ñ¨Ñ÷Ñ¬",
      "¥?Ñ¨Ñ÷¥'Ñæ",
      "¥?Ñ¨¥?¥'",
    ],
    past: ["¥?Ñ¨ÑøÑ¯", "¥?Ñ¨ÑøÑ¯Ñø", "¥?Ñ¨ÑøÑ¯Ñó", "¥?Ñ¨ÑøÑ¯Ñ÷"],
  },
  {
    id: "est",
    ru: "Ñæ¥?¥'¥O",
    de: "essen / es gibt",
    note: "ƒsÿ zwei Bedeutungen",
    pres: ["ÑæÑ¬", "Ñæ¥^¥O", "Ñæ¥?¥'", "ÑæÑïÑ÷Ñ¬", "ÑæÑïÑ÷¥'Ñæ", "ÑæÑï¥?¥'"],
    past: ["ÑæÑ¯", "ÑæÑ¯Ñø", "ÑæÑ¯Ñó", "ÑæÑ¯Ñ÷"],
  },
  {
    id: "rab",
    ru: "¥?ÑøÑñÑó¥'Ñø¥'¥O",
    de: "arbeiten",
    pres: [
      "¥?ÑøÑñÑó¥'Ñø¥Z",
      "¥?ÑøÑñÑó¥'ÑøÑæ¥^¥O",
      "¥?ÑøÑñÑó¥'ÑøÑæ¥'",
      "¥?ÑøÑñÑó¥'ÑøÑæÑ¬",
      "¥?ÑøÑñÑó¥'ÑøÑæ¥'Ñæ",
      "¥?ÑøÑñÑó¥'Ñø¥Z¥'",
    ],
    past: ["¥?ÑøÑñÑó¥'ÑøÑ¯", "¥?ÑøÑñÑó¥'ÑøÑ¯Ñø", "¥?ÑøÑñÑó¥'ÑøÑ¯Ñó", "¥?ÑøÑñÑó¥'ÑøÑ¯Ñ÷"],
  },
  {
    id: "smotret",
    ru: "¥?Ñ¬Ñó¥'¥?Ñæ¥'¥O",
    de: "anschauen",
    pres: [
      "¥?Ñ¬Ñó¥'¥?¥Z",
      "¥?Ñ¬Ñó¥'¥?Ñ÷¥^¥O",
      "¥?Ñ¬Ñó¥'¥?Ñ÷¥'",
      "¥?Ñ¬Ñó¥'¥?Ñ÷Ñ¬",
      "¥?Ñ¬Ñó¥'¥?Ñ÷¥'Ñæ",
      "¥?Ñ¬Ñó¥'¥?¥?¥'",
    ],
    past: ["¥?Ñ¬Ñó¥'¥?ÑæÑ¯", "¥?Ñ¬Ñó¥'¥?ÑæÑ¯Ñø", "¥?Ñ¬Ñó¥'¥?ÑæÑ¯Ñó", "¥?Ñ¬Ñó¥'¥?ÑæÑ¯Ñ÷"],
  },
  {
    id: "posmotret",
    ru: "Ñ¨Ñó¥?Ñ¬Ñó¥'¥?Ñæ¥'¥O",
    de: "ansehen",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: [
      "Ñ¨Ñó¥?Ñ¬Ñó¥'¥?ÑæÑ¯",
      "Ñ¨Ñó¥?Ñ¬Ñó¥'¥?ÑæÑ¯Ñø",
      "Ñ¨Ñó¥?Ñ¬Ñó¥'¥?ÑæÑ¯Ñó",
      "Ñ¨Ñó¥?Ñ¬Ñó¥'¥?ÑæÑ¯Ñ÷",
    ],
  },
  {
    id: "slushat",
    ru: "¥?Ñ¯¥Ÿ¥^Ñø¥'¥O",
    de: "zuhÇôren",
    pres: [
      "¥?Ñ¯¥Ÿ¥^Ñø¥Z",
      "¥?Ñ¯¥Ÿ¥^ÑøÑæ¥^¥O",
      "¥?Ñ¯¥Ÿ¥^ÑøÑæ¥'",
      "¥?Ñ¯¥Ÿ¥^ÑøÑæÑ¬",
      "¥?Ñ¯¥Ÿ¥^ÑøÑæ¥'Ñæ",
      "¥?Ñ¯¥Ÿ¥^Ñø¥Z¥'",
    ],
    past: ["¥?Ñ¯¥Ÿ¥^ÑøÑ¯", "¥?Ñ¯¥Ÿ¥^ÑøÑ¯Ñø", "¥?Ñ¯¥Ÿ¥^ÑøÑ¯Ñó", "¥?Ñ¯¥Ÿ¥^ÑøÑ¯Ñ÷"],
  },
  {
    id: "ponimat",
    ru: "Ñ¨ÑóÑ«Ñ÷Ñ¬Ñø¥'¥O",
    de: "verstehen",
    pres: [
      "Ñ¨ÑóÑ«Ñ÷Ñ¬Ñø¥Z",
      "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑæ¥^¥O",
      "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑæ¥'",
      "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑæÑ¬",
      "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑæ¥'Ñæ",
      "Ñ¨ÑóÑ«Ñ÷Ñ¬Ñø¥Z¥'",
    ],
    past: ["Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑ¯", "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑ¯Ñø", "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑ¯Ñó", "Ñ¨ÑóÑ«Ñ÷Ñ¬ÑøÑ¯Ñ÷"],
  },
  {
    id: "ponyat",
    ru: "Ñ¨ÑóÑ«¥?¥'¥O",
    de: "verstehen",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["Ñ¨ÑóÑ«¥?Ñ¯", "Ñ¨ÑóÑ«¥?Ñ¯Ñø", "Ñ¨ÑóÑ«¥?Ñ¯Ñó", "Ñ¨ÑóÑ«¥?Ñ¯Ñ÷"],
  },
  {
    id: "pomoch",
    ru: "Ñ¨ÑóÑ¬Ñó¥Î¥O",
    de: "helfen",
    note: "ƒsÿ perfektiv",
    pres: ["ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\"", "ƒ?\""],
    past: ["Ñ¨ÑóÑ¬ÑóÑü", "Ñ¨ÑóÑ¬ÑóÑüÑ¯Ñø", "Ñ¨ÑóÑ¬ÑóÑüÑ¯Ñó", "Ñ¨ÑóÑ¬ÑóÑüÑ¯Ñ÷"],
  },
];

export default function Home() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = "";

    let completedCount = 0;

    function getErrors(id) {
      return Number(localStorage.getItem("err_" + id)) || 0;
    }
    function addError(id) {
      localStorage.setItem("err_" + id, getErrors(id) + 1);
    }

    const resetAll = document.getElementById("reset-counters");
    if (resetAll) {
      resetAll.addEventListener("click", () => {
        verbs.forEach((v) => localStorage.removeItem("err_" + v.id));
        document.querySelectorAll(".counter").forEach((c) => {
          c.textContent = "Fehler: 0";
        });
      });
    }

    verbs.forEach((v) => {
      const div = document.createElement("div");
      div.className = "verb";

      const header = document.createElement("div");
      header.className = "header";
      const left = document.createElement("div");
      const ru = document.createElement("div");
      ru.className = "ru";
      ru.textContent = v.ru;
      const de = document.createElement("div");
      de.className = "de";
      de.textContent = v.de;
      const counter = document.createElement("div");
      counter.className = "counter";
      counter.id = "err_" + v.id;
      counter.textContent = "Fehler: " + getErrors(v.id);
      left.appendChild(ru);
      left.appendChild(de);
      left.appendChild(counter);
      const btnToggle = document.createElement("button");
      btnToggle.textContent = "Çoben";
      header.appendChild(left);
      header.appendChild(btnToggle);
      div.appendChild(header);

      const forms = document.createElement("div");
      forms.className = "forms";
      if (v.note) {
        const note = document.createElement("div");
        note.className = "note";
        note.textContent = v.note;
        forms.appendChild(note);
      }

      const presTitle = document.createElement("strong");
      presTitle.textContent = "PrÇÏsens";
      forms.appendChild(presTitle);
      ["¥?", "¥'¥<", "ÑóÑ«/ÑóÑ«Ñø", "Ñ¬¥<", "Ñý¥<", "ÑóÑ«Ñ÷"].forEach((p, i) => {
        const row = document.createElement("div");
        row.className = "row";
        const label = document.createElement("label");
        label.textContent = p;
        const input = document.createElement("input");
        input.setAttribute("data-sol", v.pres[i]);
        input.setAttribute("lang", "ru");
        input.setAttribute("inputmode", "text");
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocapitalize", "off");
        if (v.pres[i] === "ƒ?\"") {
          input.value = "ƒ?\"";
          input.disabled = true;
        }
        row.appendChild(label);
        row.appendChild(input);
        forms.appendChild(row);
      });

      const pastTitle = document.createElement("strong");
      pastTitle.textContent = "Vergangenheit";
      forms.appendChild(pastTitle);
      ["Ñ¬", "Ñô", "Ñ«", "Ñ¬Ñ«"].forEach((p, i) => {
        const row = document.createElement("div");
        row.className = "row";
        const label = document.createElement("label");
        label.textContent = p;
        const input = document.createElement("input");
        input.setAttribute("data-sol", v.past[i]);
        input.setAttribute("lang", "ru");
        input.setAttribute("inputmode", "text");
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocapitalize", "off");
        if (v.past[i] === "ƒ?\"") {
          input.value = "ƒ?\"";
          input.disabled = true;
        }
        row.appendChild(label);
        row.appendChild(input);
        forms.appendChild(row);
      });

      const btnCheck = document.createElement("button");
      btnCheck.textContent = "ÇoberprÇ¬fen";
      btnCheck.addEventListener("click", () => {
        if (btnCheck.textContent === "ÇoberprÇ¬fen") {
          let err = false;
          forms.querySelectorAll("input").forEach((i) => {
            if (i.dataset.sol === "ƒ?\"") {
              return;
            }
            if (i.value.trim() === i.dataset.sol) {
              i.className = "correct";
            } else {
              const correct = i.dataset.sol;
              const userInput = i.value.trim();
              const container = document.createElement("div");
              container.className = "correction";
              container.dataset.sol = i.dataset.sol;
              for (let j = 0; j < correct.length; j++) {
                const span = document.createElement("span");
                span.textContent = correct[j];
                if (userInput[j] && userInput[j] === correct[j]) {
                  span.style.color = "green";
                } else {
                  span.style.color = "red";
                }
                container.appendChild(span);
              }
              i.parentNode.replaceChild(container, i);
              err = true;
            }
          });
          if (err) {
            addError(v.id);
            document.getElementById("err_" + v.id).textContent =
              "Fehler: " + getErrors(v.id);
          } else {
            div.classList.add("completed");
            completedCount++;
            if (completedCount === verbs.length) {
              document.getElementById("congrats").style.display = "block";
              setTimeout(() => location.reload(), 3000);
            }
          }
          btnCheck.textContent = "Leeren";
        } else {
          forms.querySelectorAll("input").forEach((i) => {
            i.value = "";
            i.className = "";
          });
          forms.querySelectorAll(".correction").forEach((c) => {
            const input = document.createElement("input");
            input.setAttribute("data-sol", c.dataset.sol);
            input.setAttribute("lang", "ru");
            input.setAttribute("inputmode", "text");
            input.setAttribute("autocomplete", "off");
            input.setAttribute("autocapitalize", "off");
            if (c.dataset.sol === "ƒ?\"") {
              input.value = "ƒ?\"";
              input.disabled = true;
            }
            c.parentNode.replaceChild(input, c);
          });
          btnCheck.textContent = "ÇoberprÇ¬fen";
        }
      });
      forms.appendChild(btnCheck);

      div.appendChild(forms);
      app.appendChild(div);

      btnToggle.addEventListener("click", () => {
        const isOpen = forms.style.display === "block";
        forms.style.display = isOpen ? "none" : "block";
        btnToggle.textContent = isOpen ? "Çoben" : "SchlieÇYen";
        if (isOpen && div.classList.contains("completed")) {
          div.style.display = "none";
        }
      });
    });
  }, []);

  return (
    <div>
      <h1>Russische Alltagsverben ƒ?\" Set 1 (30)</h1>
      <p className="note">
        Erst Grundform ƒÅ&apos; dann Formen Çôffnen ƒÅ&apos; eingeben ƒÅ&apos; Ç¬berprÇ¬fen.
        <br />
        Fehler werden pro Verb gespeichert.
        <br />
      </p>

      <div
        id="congrats"
        style={{
          display: "none",
          textAlign: "center",
          fontSize: "1.5rem",
          margin: "2rem 0",
        }}
      >
        GlÇ¬ckwunsch! Alle Verben korrekt gelernt.
      </div>

      <div style={{ margin: "0.5rem 0 1rem 0" }}>
        <button id="reset-counters">Alle Counter zuruecksetzen</button>
      </div>

      <div id="app"></div>

      <style jsx global>{`
        body {
          font-family: system-ui, sans-serif;
          padding: 1rem;
        }
        h1 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }
        .verb {
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 1rem;
          padding: 0.6rem;
        }
        @media (min-width: 1100px) {
          .verb {
            font-size: 0.95rem;
          }
        }
        .forms {
          max-height: 70vh;
          overflow-y: auto;
        }
        #app {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .verb {
          flex: 1 1 300px;
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 0.6rem;
          background: #fff;
        }
        @media (min-width: 700px) {
          #app {
          }
        }
        @media (min-width: 1100px) {
          #app {
          }
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ru {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .de {
          color: #444;
        }
        button {
          padding: 0.3rem 0.6rem;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .forms {
          display: none;
          margin-top: 0.5rem;
          max-height: 70vh;
          overflow-y: auto;
        }
        .row {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 0.4rem;
          margin-bottom: 0.3rem;
        }
        label {
          text-align: right;
        }
        input {
          width: 100%;
          padding: 0.2rem;
          box-sizing: border-box;
          font-size: 16px;
        }
        .correct {
          background: #c8f7c5;
        }
        .wrong {
          background: #f7c5c5;
        }
        .correction {
          background: #f7c5c5;
          border: 1px solid #ccc;
          padding: 0.2rem;
          font-family: inherit;
          font-size: inherit;
          display: inline-block;
          width: 100%;
          box-sizing: border-box;
        }
        .note {
          font-size: 0.75rem;
          color: #666;
          margin-bottom: 0.4rem;
        }
        .counter {
          font-size: 0.75rem;
          color: #900;
        }
      `}</style>
    </div>
  );
}
