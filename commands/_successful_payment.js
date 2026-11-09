/*CMD
  command: /successful_payment
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

let payment = message.successful_payment;

if (payment) {
  let payload = payment.invoice_payload; // بيلقط الباقة اللي تم اختيارها (مثل pack_50)

  // جدول عدد النقاط اللي هتتضاف بناءً على الباقة المطلوبة
  let packPoints = {
    "pack_35": 35,
    "pack_50": 55,
    "pack_100": 120,
    "pack_250": 320,
    "pack_500": 700,
    "pack_1000": 1500
  };

  let addedPoints = packPoints[payload] || 0;

  if (addedPoints > 0) {
    let userId = user.telegramid;

    // 1. استخدام الريسورس المسمى "point" لإضافة العملات
    let pts = Libs.ResourcesLib.userRes("point");
    pts.add(addedPoints);

    // --- 👇 إضافة المستخدم تلقائياً للوحة المتصدرين فور إتمام الشراء 👇 ---
    let usersIds = Bot.getProperty("top_users_ids", []);
    if (!Array.isArray(usersIds)) { usersIds = []; }

    let found = false;
    for (let i = 0; i < usersIds.length; i++) {
      if (usersIds[i] == userId) {
        found = true;
        break;
      }
    }

    if (!found) {
      usersIds.push(userId);
      Bot.setProperty("top_users_ids", usersIds, "json");
    }
    // ------------------------------------------------------------------

    // 2. مسح رسالة الفاتورة القديمة لو متاحة عشان الشات ينضف
    try {
      if (request && request.message && request.message.message_id) {
        Api.deleteMessage({
          message_id: request.message.message_id
        });
      }
    } catch (e) {
      // تجاهل أي خطأ لو الرسالة اتمسحت مسبقاً
    }

    // 3. إرسال رسالة نجاح مدعومة بإيموجي العملة ⛁
    Api.sendMessage({
      text: "✓ **تم دفع النجوم بنجاح!**\n\n" +
            "❀˖° تمت إضافة **" + addedPoints + " ⛁** إلى رصيدك.\n" +
            "⌨ إجمالي نقاطك الحالية: **" + pts.value().toFixed(0) + " ⛁**\n" +
            "🏆 وتم تسجيلك في لوحة المتصدرين بنجاح!",
      parse_mode: "Markdown"
    });
  }
}

