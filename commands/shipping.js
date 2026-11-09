/*CMD
  command: shipping
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: الرصيد أو الشحن ⛁
  group: 
CMD*/

let pts = Libs.ResourcesLib.userRes("point");

let buttons = [
  [
    { text: "35 ⛁ • 35 ☆", callback_data: "/pack_35" },
    { text: "55 ⛁ • 50 ☆", callback_data: "/pack_50" }
  ],
  [
    { text: "120 ⛁ • 100 ☆", callback_data: "/pack_100" },
    { text: "320 ⛁ • 250 ☆", callback_data: "/pack_250" }
  ],
  [
    { text: "700 ⛁ • 500 ☆", callback_data: "/pack_500" },
    { text: "1500 ⛁ • 1000 ☆", callback_data: "/pack_1000" }
  ],
  [
    { text: "⚿ مشاركة توكنات (رابط مباشر)", callback_data: "/share_tokens" }
  ],
  [
    { text: "✉ ربح رصيد مجاناً", callback_data: "Profit_system" }
  ],
  [
    { text: "➔ إلغاء", callback_data: "/cancel" }
  ]
];

let textMsg = "$ **شحن الرصيد والتوكنات**\n\n" +
              "❀˖° **رصيدك الحالي:** " + pts.value().toFixed(0) + " ⛁\n" +
              "⦿ **تكلفة التفعيل:** 3 ⛁\n\n" +
              "☆ **اختر باقة الشحن المباشر:**";

let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown"
  });
} else {
  Api.sendMessage({
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown"
  });
}

