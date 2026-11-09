/*CMD
  command: /pack_1000
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
  title: "شحن 1500 ⛁ عملة رصيد",
  description: "ستدفع 1000 نجمة (★) للحصول على 1500 ⛁ عملة رصيد مضافة لحسابك فوراً.",
  payload: "pack_1000",
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "باقة 1500 ⛁ عملة رصيد", amount: 1000 }],
  reply_markup: {
    inline_keyboard: [
      [{ text: "★ دفع 1000 نجمة الآن", pay: true }],
      [{ text: "↻ إلغاء", callback_data: "/cancel" }]
    ]
  }
});

