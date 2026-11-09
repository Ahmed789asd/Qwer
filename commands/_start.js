/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: اختار من الازرار :👇🏻
  keyboard:  تفعيل نقاط التشغيل ☄︎ ,\n  الرصيد أو الشحن ⛁ ,سجل حساباتي ⎙ ,\n لوحة المتصدرين ☃︎ , الدعم الفني ☏  ,\n التعليمات والشروط 𓍝 , تغير اللغه ⌨ ,\n  نظام الربح ✉
  aliases: 
  group: 
CMD*/

// منع المستخدم من الضغط على رابطه الشخصي
function doTouchOwnLink() {
  Bot.sendMessage("⚠︎ لا يمكنك استخدام رابط الدعوة الخاص بك.");
}

// عند نجاح جلب إحالة جديدة
function doAttracted(refUser) {
  if (!refUser || !refUser.telegramid) { return; }
  
  // إضافة 2 نقطة لصاحب الدعوة تلقائياً
  let referrerPoints = Libs.ResourcesLib.anotherUserRes(
    "point",
    refUser.telegramid
  );
  referrerPoints.add(2);

  // إرسال رسالة ترحيب للشخص الجديد
  Bot.sendMessage(
    "☺︎ **أهلاً بك في بوت شحن نقاط التشغيل!**\n\n" +
      "✉ تم استضافتك عبر رابط دعوة صديق بنجاح!"
  );

  // إشعار الشخص الداعي بأن رصيده زاد
  Bot.sendMessageToChatWithId(
    refUser.telegramid,
    "✿ **مبروك! انضم شخص جديد عبر رابط إحالتك.**\n\n تمت إضافة: **+2 ⛁** لرصيدك بنجاح ☄︎"
  );
}

function doAlreadyAttracted() {
  // المستخدم مسجل مسبقاً من إحالة أخرى
}

let trackOptions = {
  onTouchOwnLink: doTouchOwnLink,
  onAttracted: doAttracted,
  onAlreadyAttracted: doAlreadyAttracted,
  debug: false
};

// تشغيل نظام تتبع الإحالات
RefLib.track(trackOptions);

// التأكد الآمن من توليد رابط الإحالة للمستخدم الحالي
let userRefLink = RefLib.getRefLink();
if (!userRefLink) {
  try {
    RefLib.generateLink();
  } catch(e) {}
}

// --- تسجيل المستخدم تلقائياً في لوحة المتصدرين بأمان ---
let userId = user.telegramid;
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
// ----------------------------------------------------

// رسالة الترحيب العامة لو دخل مباشرة (وليست ضغطة زر Callback)
if (!request.data) {
  Bot.sendMessage(
    "☺︎ **أهلاً بك في بوت شحن نقاط التشغيل!**\n\n" +
      "⌨ اختر من الأزرار بالأسفل لبدء الاستخدام."
  );
}

