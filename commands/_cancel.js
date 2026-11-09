/*CMD
  command: /cancel
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

// --- كود زر إلغاء: حذف الرسالة الحالية نهائياً وتشغيل /start مباشرة ---

let isCallback = request && request.message && request.message.message_id;

if (isCallback) {
  // 1. حذف رسالة الفاتورة أو القائمة نهائياً
  Api.deleteMessage({
    message_id: request.message.message_id
  });
}

// 2. تشغيل أمر /start في الخلفية فوراً
Bot.runCommand("/start");

