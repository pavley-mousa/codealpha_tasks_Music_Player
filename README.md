

## User Editable Platform

المستخدم يقدر من داخل الواجهة يعدل:

- اللغة العربية / English
- اسم المنصة والوصف
- عنوان ووصف الـHero
- اللوجو
- اللون الأساسي
- نص الـFooter
- المظهر Dark / Light
- إنشاء وتعديل وحذف Playlists
- غلاف الـPlaylist
- إضافة وتعديل وحذف الأغاني
- غلاف الأغنية
- مصادر التشغيل
- إضافة مصادر SoundCloud
- إضافة مصادر Audio مباشرة

الإعدادات والمكتبة محفوظة في localStorage، لذلك التعديلات تخص نفس المتصفح والجهاز.

## Audio Sources

SoundCloud يتم تشغيله عبر الـWidget الرسمي.

ملفات الصوت المباشرة مثل MP3 وM4A وOGG وWAV تعمل عبر HTML5 Audio عندما يكون الرابط ملف صوت مباشر والسيرفر يسمح بالتشغيل من المتصفح.

رابط صفحة YouTube لا يتحول إلى ملف صوت منفصل داخل هذا المشروع.

## Structure

index.html
واجهة المشروع والنوافذ والإعدادات.

style.css
التصميم والـResponsive UI.

script.js
كل منطق الـPlayer والـPlaylists والإعدادات والتخزين المحلي.

## Run

افتح index.html باستخدام VS Code Live Server أو ارفعه مباشرة على أي Static Hosting مثل GitHub Pages أو Cloudflare Pages أو Vercel.

## Keyboard

Space = Play / Pause
Arrow Right = Next
Arrow Left = Previous
M = Mute
