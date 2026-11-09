/*CMD
  command: /pack_35
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
  title: "شحن 35 ⛁ عملة رصيد",
  description: "ستدفع 35 نجمة (★) للحصول على 35 ⛁ عملة رصيد مضافة لحسابك فوراً.",
  payload: "pack_35",
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "باقة 35 ⛁ عملة رصيد", amount: 35 }],
  reply_markup: {
    inline_keyboard: [
      [{ text: "★ دفع 35 نجمة الآن", pay: true }],
      [{ text: "↻ إلغاء", callback_data: "/cancel" }]
    ]
  }
});

