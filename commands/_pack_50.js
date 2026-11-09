/*CMD
  command: /pack_50
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

Api.sendInvoice({
  title: "شحن 55 ⛁ عملة رصيد",
  description: "ستدفع 50 نجمة (★) للحصول على 55 ⛁ عملة رصيد مضافة لحسابك فوراً.",
  payload: "pack_50",
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "باقة 55 ⛁ عملة رصيد", amount: 50 }],
  reply_markup: {
    inline_keyboard: [
      [{ text: "★ دفع 50 نجمة الآن", pay: true }],
      [{ text: "↻ إلغاء", callback_data: "/cancel" }]
    ]
  }
});

