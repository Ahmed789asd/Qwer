/*CMD
  command: /how_it_works
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let textMsg = "⌛︎ **كيف تؤكد حسابك بخطوات بسيطة؟**\n\n" +
              "① **إشعار التأكيد:** ستصلك رسالة أو إشعار فوري على شاشة هاتفك المرتبط بالحساب (مثل: `Check your phone`).\n" +
              "② **رقم المطابقة:** سيظهر لك هنا في البوت رقم مكون من خانتين (مثلاً: **42**).\n" +
              "③ **الموافقة الفورية:** افتح إشعار الهاتف، وابحث عن نفس الرقم واضغط عليه لتأكيد الدخول.\n\n" +
              "ϟ **بمجرد إتمام هذه الخطوة، سيكمل البوت العمليات تلقائياً بالكامل!**\n\n" +
              "⚠︎ **ملاحظات هامة لضمان نجاح العملية:**\n" +
              "• تأكد أن الحساب سليم تماماً وليس لديه أي مشاكل أو حظر مسبق في متجر Google Play.\n" +
              "• نظراً لأن حسابات جوجل الجديدة قد تكون عرضة للتحقق الأمني المكثف، يُنصح بشدة بتفعيل **التحقق بخطوتين (2FA)** وربط رقم هاتف صحيح بالحساب لحمايته من القفل.\n" +
              "• نعدك بأن كلمة المرور **لا تُحفظ أو تُخزن نهائياً** في أي قاعدة بيانات، فحسابك في أمان تام.";

let buttons = [
  [
    { text: "✖ إلغاء", callback_data: "/cancel" }
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

