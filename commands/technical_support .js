/*CMD
  command: technical_support 
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: الدعم الفني ☏
  group: 
CMD*/

let textMsg = "☏ **الدعم الفني والمساعدة المباشرة:**\n\n" +
              "إذا واجهتك أي مشكلة، أو لديك استفسار، أو تريد إرسال صور المشاكل والرسائل:\n\n" +
              "➔ **بوت الدعم المعتمد:** `@PlayPointSupportBot`\n\n" +
              "اضغط على الزر أدناه للانتقال مباشرة إلى بوت الدعم وترك رسالتك.";

// الأزرار: زرار فتح بوت الدعم (برابط خارجي) + زرار العودة للقائمة الرئيسية
let buttons = [
  [
    { text: "☏ فتح بوت الدعم الفني ↗", url: "http://t.me/PlayPointSupportBot" }
  ],
  [
    { text: "➔ العودة إلى القائمة الرئيسية", callback_data: "/cancel" }
  ]
];

// التحقق مما إذا كان الطلب ناتجاً عن ضغطة زر لتحديث الرسالة أو إرسالها رسالة جديدة
let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown",
    disable_web_page_preview: true
  });
} else {
  Api.sendMessage({
    text: textMsg,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "Markdown",
    disable_web_page_preview: true
  });
}

