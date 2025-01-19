const extMain = document.createElement('div');
extMain.id = 'stream_utils_main';
const extBtn = document.createElement('div');
extBtn.id = 'stream_utils_btn';
extBtn.onclick = toggleExt;
extMain.append(extBtn);
document.body.append(extMain);
let toggleIdx = 0;
let toggleStates = 2;
const injObj = {
    'html': {
        overflow: [null, 'hidden'],
    },
    '.main-layout-content': {
        minHeight: [null, '0'],
    },
    '#video-page-container': {
        position: [null, 'fixed'],
        width: [null, '100vw'],
        height: [null, '100vh'],
        inset: [null, '0'],
        zIndex: [null, '88888'],
    }
};
setDefaults();
setDocumentListeners();



function setDefaults() {
    for (const key in injObj) {
        const elem = document.querySelector(key);
        if (!elem) continue;

        for (const attr in injObj[key]) {
            injObj[key][attr][0] = elem.style[attr];
        }
    }
}

function toggleExt() {
    toggleIdx = (toggleIdx+1)%toggleStates;

    for (const key in injObj) {
        const elem = document.querySelector(key);
        if (!elem) continue;

        for (const attr in injObj[key]) {
            elem.style[attr] = injObj[key][attr][toggleIdx];
        }
    }
}

function setDocumentListeners() {
    let mousemoveTimeout = null;
    extMain.addEventListener('mousemove', (event) => {
        if (mousemoveTimeout) {
            clearTimeout(mousemoveTimeout);
        }
        extBtn.classList.toggle('visible', true);
        mousemoveTimeout = setTimeout(() => {
            extBtn.classList.toggle('visible', false);
        }, 1500);
    });
}