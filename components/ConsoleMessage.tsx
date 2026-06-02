"use client";

import { useEffect } from "react";

const LUIS = 
`░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓███████▓▒░
░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░
░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░
░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓██████▓▒░
░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░
░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░
░▒▓████████▓▒░▒▓██████▓▒░░▒▓█▓▒░▒▓███████▓▒░`;

const DIAZ = 
`░▒▓███████▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓████████▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░    ░▒▓██▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓████████▓▒░  ░▒▓██▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
░▒▓███████▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░`;

const GRAN = 
` ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒▒▓███▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░
 ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░`;

const ADOS = 
` ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░ ░▒▓███████▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░`;

function padLines(block: string, width: number): string[] {
  return block.split("\n").map((line) => {
    const pad = width - line.length;
    return pad > 0 ? line + " ".repeat(pad) : line;
  });
}

export default function ConsoleMessage() {
  useEffect(() => {
    const blocks = [LUIS, DIAZ, GRAN, ADOS];
    const allLines: string[] = [];

    // find max width across all blocks
    let maxWidth = 0;
    for (const block of blocks) {
      for (const line of block.split("\n")) {
        if (line.length > maxWidth) maxWidth = line.length;
      }
    }

    const boxWidth = maxWidth + 4; // 2 padding each side
    const hBorder = "+" + "─".repeat(boxWidth) + "+";
    const emptyLine = "│" + " ".repeat(boxWidth) + "│";

    allLines.push(hBorder);
    allLines.push(emptyLine);

    for (let b = 0; b < blocks.length; b++) {
      const lines = padLines(blocks[b], maxWidth);
      for (const line of lines) {
        allLines.push("│  " + line + "  │");
      }
      if (b < blocks.length - 1) {
        allLines.push(emptyLine);
      }
    }

    allLines.push(emptyLine);

    // add message lines
    const messages = [
      "hey ! thanks for peeking under",
      "the hood. built with next.js",
      "and too many espressos",
    ];
    for (const msg of messages) {
      const pad = boxWidth - msg.length;
      const left = Math.floor(pad / 2);
      const right = pad - left;
      allLines.push("│" + " ".repeat(left) + msg + " ".repeat(right) + "│");
    }

    allLines.push(emptyLine);
    allLines.push(hBorder);

    console.log(
      "%c" + allLines.join("\n"),
      "font-family: monospace; font-size: 10px; color: #007AFF; line-height: 1.2;"
    );
  }, []);

  return null;
}
