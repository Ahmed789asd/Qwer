/*CMD
  command: My_account_log
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: سجل حساباتي ⎙
  group: 
CMD*/

Api.sendMessage({
  text: "⚠︎ **تنبيه هام:**\nعذراً، قسم الدعم الفني قيد الصيانة حالياً! يرجى المحاولة لاحقاً.",
  parse_mode: "Markdown"
});

