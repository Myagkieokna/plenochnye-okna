// plugins/yandex-metrika.client.ts
export default defineNuxtPlugin(() => {
  // Вставка Яндекс Метрики
  const script = document.createElement('script')
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){
        (m[i].a=m[i].a||[]).push(arguments)
      };
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],
      k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(101397076, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    });
  `
  document.head.appendChild(script)
})
