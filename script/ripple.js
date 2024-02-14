var ripple = document.querySelectorAll('.ripple, button');
ripple.forEach(elm => {
   elm.style.position = 'relative';
   elm.style.overflow = 'hidden';
   elm.onpointerdown = () => {
      var rect = elm.getBoundingClientRect();
      var x = (event.clientX - rect.left) + 'px';
      var y = (event.clientY - rect.top) + 'px';
      var ripple = document.createElement('ripple');
      ripple.style.display = 'block';
      ripple.style.position = 'absolute';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.aspectRatio = '1/1';
      ripple.style.background = 'currentColor';
      ripple.style.borderRadius = '100%';
      ripple.style.animationTimingFunction = 'ease-out';
      ripple.style.top = y;
      ripple.style.left = x;
      var h = Number(window.getComputedStyle(elm).height.replace('px', ''));
      var w = Number(window.getComputedStyle(elm).width.replace('px', ''));
      if (w >= h) {
         var animation = ripple.animate(
               [{ opacity: '0.3', width: '20px' }, { opacity: '0.2', width: '400%' }], { fill: "both", duration: 1500, }
         )
      } else {
         var animation = ripple.animate(
               [{ opacity: '0.3', height: '20px' }, { opacity: '0.2', height: '400%' }], { fill: "both", duration: 1500, }
         )
      }
      animation.play();
      elm.appendChild(ripple);
   }
   elm.onpointercancel = elm.onpointerup = () => {
      var a = elm.querySelectorAll('ripple');
      a.forEach(ripple => {
         var h = Number(window.getComputedStyle(elm).height.replace('px', ''));
         var w = Number(window.getComputedStyle(elm).width.replace('px', ''));
         if (w >= h) {
            var animation = ripple.animate({ opacity: '0'}, { fill: "both", duration: 800, })
         } else {
            var animation = ripple.animate({ opacity: '0'}, { fill: "both", duration: 800, })
         }
         animation.play();
         animation.onfinish = () => {
            ripple.remove();
         };
      });
   }
});
function Ripple() {
   var elm = event.currentTarget;
   elm.style.position = 'relative';
   elm.style.overflow = 'hidden';
   var rect = elm.getBoundingClientRect();
   var x = (event.clientX - rect.left) + 'px';
   var y = (event.clientY - rect.top) + 'px';
   var ripple = document.createElement('ripple');
   ripple.style.display = 'block';
   ripple.style.position = 'absolute';
   ripple.style.transform = 'translate(-50%, -50%)';
   ripple.style.aspectRatio = '1/1';
   ripple.style.background = 'currentColor';
   ripple.style.borderRadius = '100%';
   ripple.style.animationTimingFunction = 'aese-out';
   ripple.style.top = y;
   ripple.style.left = x;
   var h = Number(window.getComputedStyle(elm).height.replace('px', ''));
   var w = Number(window.getComputedStyle(elm).width.replace('px', ''));
   if (w >= h) {
      var animation = ripple.animate(
                  [{ opacity: '0.3', width: '20px' }, { opacity: '0.2', width: '400%' }], { fill: "both", duration: 1500, }
      )
   } else {
      var animation = ripple.animate(
                  [{ opacity: '0.3', height: '20px' }, { opacity: '0.2', height: '400%' }], { fill: "both", duration: 1500, }
      )
   }
   animation.play();
   elm.appendChild(ripple);
   elm.onpointercancel = elm.onpointerup = () => {
      var a = elm.querySelectorAll('ripple');
      a.forEach(ripple => {
         var h = Number(window.getComputedStyle(elm).height.replace('px', ''));
         var w = Number(window.getComputedStyle(elm).width.replace('px', ''));
         if (w >= h) {
            var animation = ripple.animate({ opacity: '0', width: '400%' }, { fill: "both", duration: 1500, })
         } else {
            var animation = ripple.animate({ opacity: '0', height: '400%' }, { fill: "both", duration: 1500, })
         }
         animation.play();
         animation.onfinish = () => {
            ripple.remove();
         };
      });
   }
}