/* Themes */
// All browser compatibility
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
const mobile = /Android|iPhone/i.test(navigator.userAgent);
const themes = mobile ? ['Mobile', 'Dark', 'Light'] : ['System', 'Dark', 'Light'];
const icon = document.querySelector('#switch > img');
const switcher = document.querySelector('#switch');

let id = 0;
function switchTheme() {
    id = ++id % themes.length;
    const theme = themes[id];
    document.documentElement.className = theme.toLowerCase();
    icon.src = `assets/icons/${theme}.svg`;
    switcher.setAttribute('tooltip', theme);
}

/* Parallax */
const bg = document.querySelector("#background");

window.addEventListener("scroll", () => {
    bg.style.transform = `translate(calc(-50% + 50vw), ${window.scrollY * -0.4}px)`;
});

/* Glowys */
var glowys = Array.from(
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

document.addEventListener("mousemove", e => {
    const [x, y] = [e.clientX, e.clientY];

    glowys.forEach(ele => {
        const colors = ele.getAttribute("glow");
        const glowSize = ele.getAttribute("glow-size") || "920px";
        const rect = ele.getBoundingClientRect();
        ele.style.background = `
			radial-gradient(
				${glowSize} circle at
				${x - rect.left}px
				${y - rect.top}px,
				${colors}
			)`;
    });
});

/* Search */
var dialog, input, results;

const data = fetch('https://raw.githubusercontent.com/ImSumire/Aethos/main/data.json').then(r => r.json());

const limit = 8;

document.addEventListener("DOMContentLoaded", () => {
    dialog = document.querySelector('#search dialog');
    input = document.querySelector('#search dialog input');
    results = document.querySelector('#search dialog > section');
});

function search(entry) {
    entry = entry.toLowerCase();
    results.innerHTML = '';
    let count = 0;

    data.then(data => {
        Object.entries(data).forEach(([name, content]) => {
            if (name.toLowerCase().includes(entry) || content.toLowerCase().includes(entry)) {
                if (count > limit) {
                    return;
                }
                count++;

                const [descr, href] = content.split('\n');

                const result = document.createElement('a');
                result.href = href;
                if (name != 'Installation' && name != 'Get Started') result.target = '_blank';

                const head = document.createElement('h2');
                head.innerHTML = name
                result.appendChild(head);

                const preview = document.createElement('p');
                preview.innerHTML = descr;
                result.appendChild(preview);

                results.appendChild(result);
            }
        });
        if (results.childElementCount === 0) {
            const msg = document.createElement('p');
            msg.innerHTML = 'No result.';
            results.appendChild(msg);
        }
    });
}
