/*CMD
  command: /confirm_payment

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

let selectedPack = params; // بيستقبل رقم الباقة (مثلاً 35, 50, 100...)

if (!selectedPack) {
  Api.sendMessage({ text: "⚠︎ حدث خطأ، يرجى اختيار الباقة مرة أخرى." });
  Bot.runCommand("shipping");
  return;
}

// جدول أسعار الباقات بالنجوم (Telegram Stars)
let packPrices = {
  "35": { stars: 35, title: "باقة 35 نجمة", description: "شحن 35 نجمة تليجرام لحسابك فوراً" },
  "50": { stars: 50, title: "باقة 50 نجمة", description: "شحن 50 نجمة تليجرام لحسابك فوراً" },
  "100": { stars: 100, title: "باقة 100 نجمة", description: "شحن 100 نجمة تليجرام لحسابك فوراً" },
  "250": { stars: 250, title: "باقة 250 نجمة", description: "شحن 250 نجمة تليجرام لحسابك فوراً" },
  "500": { stars: 500, title: "باقة 500 نجمة", description: "شحن 500 نجمة تليجرام لحسابك فوراً" },
  "1000": { stars: 1000, title: "باقة 1000 نجمة", description: "شحن 1000 نجمة تليجرام لحسابك فوراً" }
};

let currentPack = packPrices[selectedPack] || { stars: parseInt(selectedPack), title: "باقة " + selectedPack + " نجمة", description: "شحن نجوم تليجرام" };

// إرسال فاتورة تليجرام الرسمية (Telegram Stars Invoice)
Api.sendInvoice({
  title: currentPack.title,
  description: currentPack.description,
  payload: "pack_" + selectedPack, // معرف داخلي للعملية
  provider_token: "", // تترك فارغة تماماً لمدفوعات Telegram Stars
  currency: "XTR", // عملة النجوم الرسمية في تليجرام
  prices: [
    { label: currentPack.title, amount: currentPack.stars } // السعر بالنجوم
  ],
  reply_markup: {
    inline_keyboard: [
      [
        { text: "★ دفع " + currentPack.stars + " نجمة الآن", pay: true } // زر الدفع الرسمي المدمج
      ],
      [
        { text: "↻ إلغاء والعودة", callback_data: "/shipping" }
      ]
    ]
  }
});

