/*CMD
  command: /invite_friends
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: نظام الربح ✉
  group: 
CMD*/

let refLink = RefLib.getRefLink();

// حل احتياطي آمن لو الرابط لم يتم إنشاؤه
if (!refLink) {
  let botName = bot.name || "YourBotName"; 
  refLink = "https://t.me/" + botName + "?start=" + user.telegramid;
}

let msg = "❍ **نظام دعوة الأصدقاء (اربح 2 ⛁ لكل صديق)**\n\n";
msg += "⌖ **رابط الدعوة الخاص بك:**\n";
msg += "`" + refLink + "`\n\n";
msg += "✎𓂃 **طريقة الاستخدام:**\n";
msg += "قم بنشر الرابط بين أصدقائك وفي المجموعات، وكل شخص يدخل عبر رابطك ويبدأ البوت سيتم إضافتك نقطتين فوراً!\n\n";
msg += "☟ اضغط على الرابط لنسخه، أو شاركه مباشرة:";

let buttons = [
  [
    {
      text: "مشاركة الرابط مع الأصدقاء ↗️",
      url:
        "https://t.me/share/url?url=" +
        encodeURIComponent(refLink) +
        "&text=" +
        encodeURIComponent(
          "انضم إلينا في البوت واكسب نقاط واحصل على خدمات مميزة! 🎮🔥"
        )
    }
  ],
  [{ text: "↻ العودة للقائمة", callback_data: "/cancel" }]
];

Api.sendMessage({
  text: msg,
  reply_markup: { inline_keyboard: buttons },
  parse_mode: "Markdown"
});

