import Swup from 'https://unpkg.com/swup@3?module';

const swup = new Swup({
  containers: ["#swup"]
});

swup.on('pageView', () => {
  glowys = Array.from(
    document.querySelectorAll("[glow]")
  );
  if (mobile) {
    glowys.forEach(ele => {
      const [bgColor, _] = ele.getAttribute("glow").split(",");
      ele.style.background = bgColor;
    });
  } else {
    glowys.forEach(ele => {
      const [_, bgColor] = ele.getAttribute("glow").split(",");
      ele.style.background = bgColor;
    });
  }
  dialog = document.querySelector('#search dialog');
  input = document.querySelector('#search dialog input');
  results = document.querySelector('#search dialog > section');
});
