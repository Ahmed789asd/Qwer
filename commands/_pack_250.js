/*CMD
  command: /pack_250
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
  title: "شحن 320 ⛁ عملة رصيد",
  description: "ستدفع 250 نجمة (★) للحصول على 320 ⛁ عملة رصيد مضافة لحسابك فوراً.",
  payload: "pack_250",
  provider_token: "",
  currency: "XTR",
  prices: [{ label: "باقة 320 ⛁ عملة رصيد", amount: 250 }],
  reply_markup: {
    inline_keyboard: [
      [{ text: "★ دفع 250 نجمة الآن", pay: true }],
      [{ text: "↻ إلغاء", callback_data: "/cancel" }]
    ]
  }
});

