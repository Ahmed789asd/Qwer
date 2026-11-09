/*CMD
  command: /pack_100
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
  title: "شحن 120 ⛁ عملة رصيد",
  description: "ستدفع 100 نجمة (★) للحصول على 120 ⛁ عملة رصيد مضافة لحسابك فوراً.",
  payload: "pack_100",
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "باقة 120 ⛁ عملة رصيد", amount: 100 }],
  reply_markup: {
    inline_keyboard: [
      [{ text: "★ دفع 100 نجمة الآن", pay: true }],
      [{ text: "↻ إلغاء", callback_data: "/cancel" }]
    ]
  }
});

