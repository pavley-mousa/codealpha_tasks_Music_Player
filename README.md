# Pavley Audio Player

مشغّل موسيقى بواجهة Audio First، مبني بـ HTML وCSS وVanilla JavaScript.

## أهم المميزات

- غلاف الأغنية يظهر في الكارت الخارجي فقط
- Playlists جاهزة لمحمد منير وجورج وسوف من SoundCloud
- إنشاء عدد غير محدود من Playlists محلية
- تعديل اسم Playlist والغلاف
- حذف Playlist
- إضافة وتعديل وحذف الأغاني داخل Playlist
- نقل أغاني SoundCloud من المصادر الجاهزة إلى أي Playlist
- إضافة روابط SoundCloud للأغاني
- إضافة روابط ملفات صوت مباشرة من مواقع مختلفة مثل MP3 وM4A وOGG وWAV عندما يكون الرابط ملف صوت فعلي
- تشغيل SoundCloud عبر الـWidget الرسمي
- تشغيل الروابط المباشرة عبر HTML5 Audio
- Favorites
- Shuffle
- Repeat
- Seek
- Volume وMute
- Dark وLight Mode
- Keyboard shortcuts
- Responsive design
- حفظ القوائم والإعدادات داخل localStorage على نفس المتصفح

## إضافة Playlist

اضغط + بجانب "قوائمك" لإنشاء Playlist جديدة.

من شريط Playlist الرئيسي تقدر تعدل الاسم والغلاف وتحذف القائمة.

## إضافة أغنية

افتح Playlist، واضغط زر المزيكا بجانب عدد الأغاني.

ادخل اسم الأغنية والرابط.

الرابط المقبول يكون SoundCloud Track أو رابط ملف صوت مباشر من موقع آخر مثل MP3 أو M4A أو OGG أو WAV.

## ملاحظة مهمة عن YouTube

رابط YouTube نفسه لا يتحول إلى صوت منفصل داخل هذا المشغل. سياسات YouTube تمنع فصل مكوّن الصوت عن الفيديو واستخدام مشغّل خلفية غير ظاهر كبديل عن تجربة YouTube الأصلية.

المراجع الرسمية:
https://developers.google.com/youtube/terms/developer-policies
https://developers.google.com/youtube/terms/developer-policies-guide

## SoundCloud

SoundCloud يوفّر تشغيل التراكات والقوائم عبر الـWidget الرسمي، والـWidget API يدعم التحكم والتقديم والتأخير والصوت وإخفاء الـartwork.

المراجع الرسمية:
https://developers.soundcloud.com/docs/api/guide
https://developers.soundcloud.com/docs/api/html5-widget

## التشغيل

افتح index.html باستخدام VS Code Live Server.

## التخزين

Playlists وإعدادات المستخدم محفوظة محلياً داخل localStorage، لذلك مكتبتك خاصة بالمتصفح والجهاز الذي تستخدمه.
