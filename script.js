const WA_NUMBER = "201280312211";
const FB_LINK = "https://www.facebook.com/people/Mohamed-Abbas/pfbid0ufuKipc4uBctK1Ms7qohi6mpX5h5PENmNQzLMhLKRTYnju67hyg4zrXYocnHWTiBl/";
const IG_LINK = "https://instagram.com/mhmdsmyr5121";

const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("السلام عليكم، عايز أصمم  موقع 🚀")}`;

document.getElementById('waBtn').href = waLink;
document.getElementById('waFooter').href = waLink;
document.getElementById('fbLink').href = FB_LINK;

// كان ده اللي مبوظ اللغة - صلحته
const igElement = document.getElementById('igLink') || document.querySelector('a[href*="instagram.com"]');
if(igElement) igElement.href = IG_LINK;

let isArabic = true;
document.getElementById('langBtn').onclick = () => {
  isArabic = !isArabic;
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.getElementById('langBtn').textContent = isArabic ? "EN" : "AR";
  document.querySelectorAll('[data-ar]').forEach(el=>{
    el.textContent = isArabic ? el.dataset.ar : el.dataset.en;
  });
};

// نظام التعليقات
const reviewsList = document.getElementById('reviewsList');
let savedReviews = JSON.parse(localStorage.getItem('webcraft_reviews') || '[]');
savedReviews.forEach(r => {
  const div = document.createElement('div');
  div.className = 'review';
  div.innerHTML = `<p>"${r.text}"</p><span>— ${r.name}</span>`;
  reviewsList.appendChild(div);
});

function addReview(){
  const name = document.getElementById('clientName').value.trim();
  const text = document.getElementById('clientReview').value.trim();
  if(!name || !text){ alert('اكتب اسمك ورأيك الأول'); return; }

  const div = document.createElement('div');
  div.className = 'review';
  div.innerHTML = `<p>"${text}"</p><span>— ${name}</span>`;
  reviewsList.appendChild(div);

  savedReviews.push({name, text});
  localStorage.setItem('webcraft_reviews', JSON.stringify(savedReviews));

  const msg = `تقييم جديد في موقعك من ${name}:\n${text}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

  document.getElementById('clientName').value = '';
  document.getElementById('clientReview').value = '';
}