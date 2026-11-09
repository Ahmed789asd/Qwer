/*CMD
  command: /buy_pack

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

let res = Libs.ResourcesLib.userRes("balance");

// طريقة مضمونة 100% لاستخراج رقم الباقة من الـ message.data أو الـ params
let selectedPack = params;
if (!selectedPack && message && message.data) {
  let parts = message.data.split(" ");
  if (parts.length > 1) {
    selectedPack = parts[1];
  }
}

if (!selectedPack) {
  Bot.runCommand("shipping");
  return;
}

// جدول الأسعار والباقات
let packPrices = {
  "35": { stars: 35, cost: 3 },
  "50": { stars: 50, cost: 3 },
  "100": { stars: 100, cost: 3 },
  "250": { stars: 250, cost: 3 },
  "500": { stars: 500, cost: 3 },
  "1000": { stars: 1000, cost: 3 }
};

let packInfo = packPrices[selectedPack] || { stars: selectedPack, cost: 3 };

// أزرار الفاتورة (ظبطنا زر الرجوع عشان ينادي على /shipping صح)
let invoiceButtons = [
  [
    { text: "✓ تأكيد ودفع الفاتورة", callback_data: "/confirm_payment " + selectedPack }
  ],
  [
    { text: "↻ رجوع لباقات الشحن", callback_data: "/shipping" }
  ]
];

// نص الفاتورة المفصلة
let invoiceMsg = "📄 **فاتورة طلب الشحن المباشر**\n\n" +
                 "━━━━━━━━━━━━━━━━━━━\n" +
                 "★ **المنتج / الباقة:** " + packInfo.stars + " نجمة\n" +
                 "⛁ **تكلفة التفعيل:** " + packInfo.cost + " ⛁\n" +
                 "⌨ **رصيدك الحالي:** " + res.value().toFixed(0) + " ⛁\n" +
                 "━━━━━━━━━━━━━━━━━━━\n" +
                 "✎ **حالة الفاتورة:** في انتظار التأكيد...\n\n" +
                 "☟ اضغط على زر التأكيد لإتمام العملية:";

let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: invoiceMsg,
    reply_markup: { inline_keyboard: invoiceButtons },
    parse_mode: "Markdown"
  });
} else {
  Api.sendMessage({
    text: invoiceMsg,
    reply_markup: { inline_keyboard: invoiceButtons },
    parse_mode: "Markdown"
  });
}

