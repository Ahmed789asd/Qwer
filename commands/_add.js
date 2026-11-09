/*CMD
  command: /add
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

let adminId = 5885668384; // أيدي الأدمن المصرح له
let currentUserId = user.telegramid;

// التأكد أن المستخدم هو الأدمن
if (currentUserId != adminId) {
  Api.sendMessage({
    text: "⌧ عذراً، هذا الأمر مخصص للآدمن فقط! 𐌢"
  });
  return;
}

// قراءة المدخلات من الرسالة
let paramsList = params ? params.trim().split(/\s+/) : [];

if (paramsList.length < 2) {
  Api.sendMessage({
    text: "⚠︎ **خطأ في استخدام الأمر!**\n\n" +
          "الطريقة الصحيحة:\n" +
          "`/add [Telegram_ID] [العملية أو القيمة]`\n\n" +
          "مثال:\n" +
          "`/add 5885668384 +50`",
    parse_mode: "Markdown"
  });
  return;
}

let targetUserId = parseInt(paramsList[0]);
let rawAmountStr = paramsList[1].trim();

if (isNaN(targetUserId)) {
  Api.sendMessage({
    text: "⌧ يرجى التأكد من كتابة أيدي المستخدم بشكل صحيح (أرقام فقط)."
  });
  return;
}

// تحديد نوع العملية بدقة من الحرف الأول
let operator = "+";
let numericPart = rawAmountStr;

if (rawAmountStr.startsWith("+") || rawAmountStr.startsWith("-") || rawAmountStr.startsWith("=")) {
  operator = rawAmountStr.charAt(0);
  numericPart = rawAmountStr.substring(1);
}

let amount = parseFloat(numericPart);

if (isNaN(amount)) {
  Api.sendMessage({
    text: "⌧ يرجى التأكد من كتابة قيمة النقاط بشكل صحيح."
  });
  return;
}

// استخدام الـ resource المسمى "point"
let targetUserPoints = Libs.ResourcesLib.anotherUserRes("point", targetUserId);
let currentPoints = targetUserPoints.value() || 0;
let newPoints;
let actionText;

if (operator === "+") {
  targetUserPoints.add(amount);
  newPoints = currentPoints + amount;
  actionText = "إضافة";
} else if (operator === "-") {
  // التحقق مما إذا كان رصيد المستخدم يكفي لعملية الخصم
  if (currentPoints < amount) {
    Api.sendMessage({
      text: "❌ **عذراً، لا يمكن إتمام عملية الخصم!**\n\n" +
            "⌖ أيدي المستخدم: `" + targetUserId + "`\n" +
            "⚠️ النقاط المطلوبة للخصم أكبر من رصيد المستخدم.\n" +
            "⌨ **رصيده الحالي فقط:** " + currentPoints.toFixed(0) + " ⛁",
      parse_mode: "Markdown"
    });
    return;
  }

  targetUserPoints.add(-amount);
  newPoints = currentPoints - amount;
  actionText = "خصم";
} else if (operator === "=") {
  targetUserPoints.set(amount);
  newPoints = amount;
  actionText = "تحديد";
}

// --- 👇 الإضافة البرمجية لضمان ظهوره في لوحة المتصدرين تلقائياً 👇 ---
let usersIds = Bot.getProperty("top_users_ids", []);
if (!Array.isArray(usersIds)) { usersIds = []; }

let found = false;
for (let i = 0; i < usersIds.length; i++) {
  if (usersIds[i] == targetUserId) {
    found = true;
    break;
  }
}

if (!found) {
  usersIds.push(targetUserId);
  Bot.setProperty("top_users_ids", usersIds, "json");
}
// -----------------------------------------------------------------

// إرسال تأكيد للأدمن
Api.sendMessage({
  text: "✓ **تمت العملية بنجاح!**\n\n" +
        "⚙️ نوع العملية: **" + actionText + "**\n" +
        "⌖ أيدي المستخدم: `" + targetUserId + "`\n" +
        "⛁ القيمة: **" + operator + amount.toFixed(0) + " ⛁**\n" +
        "⌨ رصيده الجديد: **" + newPoints.toFixed(0) + " ⛁**",
  parse_mode: "Markdown"
});

// إرسال إشعار للمستخدم نفسه
try {
  Api.sendMessage({
    chat_id: targetUserId,
    text: "❀˖° **تحديث الرصيد!**\n" +
          "تمت عملية (" + actionText + ") بمقدار **" + amount.toFixed(0) + " ⛁** من قبل الإدارة.\n" +
          "⌨ رصيدك الحالي: **" + newPoints.toFixed(0) + " ⛁**",
    parse_mode: "Markdown"
  });
} catch (e) {
  // تجاهل الخطأ لو المستخدم عامل بلوك للبوت
}

