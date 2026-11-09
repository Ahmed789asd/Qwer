/*CMD
  command: /pack_500
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
  title: "شحن 700 ⛁ عملة رصيد",
  description: "ستدفع 500 نجمة (★) للحصول على 700 ⛁ عملة رصيد مضافة لحسابك فوراً.",
  payload: "pack_500",
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "باقة 700 ⛁ عملة رصيد", amount: 500 }],
  reply_markup: {
    inline_keyboard: [
      [{ text: "★ دفع 500 نجمة الآن", pay: true }],
      [{ text: "↻ إلغاء", callback_data: "/cancel" }]
    ]
  }
});

