/*CMD
  command: Instructions and conditions
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: التعليمات والشروط 𓍝
  group: 
CMD*/

let textMsg = "☼ **دليل تفعيل نقاط التشغيل (Google Play Points):**\n\n" +
              "1 **تجهيز الحساب:**\n" +
              "تأكد من أن حساب جوجل الخاص بك جاهز ونشط للاستخدام.\n\n" +
              "2 **اختيار الدولة وإرسال الحساب:**\n" +
              "اختر الدولة المطلوبة من البوت وأرسل بيانات الحساب بالصيغة: `email---password ✎𓂃`\n\n" +
              "3 **المزامنة السحابية الفورية:**\n" +
              "يقوم النظام بمعالجة وتفعيل نقاط التشغيل مع خوادم Google خلال ثوانٍ.\n\n" +
              "4 **استلام ونيل المكافآت:**\n" +
              "افتح متجر Play على هاتفك وتحقق من حساب نقاط التشغيل خاصتك بك مباشرة!\n\n" +
              "✉ [اضغط هنا لفتح صفحة Google Play Points](https://play.google.com/store/points)\n\n" +
              "⚲ **ملاحظات هامة:**\n" +
              "• يجب أن يكون الحساب مسجلاً على هاتفك في متجر Google وليس محظوراً من جوجل.\n" +
              "• يجب أن يكون حساب Google صالحاً للاستخدام، نشطاً وغير مقيّد.\n" +
              "• لا يتم حفظ أو تخزين كلمات المرور نهائياً، والمعالجة سحابية وفورية لتنفيذ الخدمة فقط.\n" +
              "• في حال طلب التحقق، اضغط رقم المطابقة الذي يظهره لك البوت على شاشة هاتفك.";

let buttons = [
  [
    { text: "الدعم الفني ☏", url: "http://t.me/PlayPointSupportBot" },
    { text: "فتح Play Store ", url: "https://play.google.com" }
  ],
  [
    { text: "☄︎ تفعيل نقاط التشغيل", callback_data: "the_job" }
  ]
];

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

