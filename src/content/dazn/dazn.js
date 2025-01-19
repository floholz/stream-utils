/**
 * check for element
 * @param {string} query of element to check for
 * @param {function} callback function to be called, after element was found
 * @param {Element} out
 * @param {number} interval to check for query. default is 100ms
 * @param {number} timeout max timeout to wait for element. default is 15s
 */
function waitForElement(query, callback, out = null, interval = 100, timeout = 15000) {
    const waitInterval = setInterval(() => {
        const elem = document.querySelector(query)
        if (elem) {
            clearInterval(waitInterval)
            out = elem
            callback()
        }
    }, interval)
    if (timeout) {
        setTimeout(() => {
            clearInterval(waitInterval)
            throw new Error(`timeout: could not find element by query '${query}'`)
        }, timeout)
    }
}

function injectDaznContent() {
    let playerUiELem
    waitForElement('div.player-ui', removeSidebar, playerUiELem)
    if (playerUiELem) {
        const fsBtn = playerUiELem.querySelector('#player-FULLSCREEN_BUTTON_TOOLTIP')
        if (fsBtn) {
            const sidebarBtn = document.createElement('button')
            sidebarBtn.id = 'ext_dazn_sidebarBtn'
            fsBtn.parentNode.insertBefore(sidebarBtn, fsBtn)
        }
    }
}

function removeSidebar() {
    const waitForSidebar = setInterval(() => {
        const sidebarElem = document.querySelector('aside')
        if (sidebarElem) {
            sidebarElem.remove()
            clearInterval(waitForSidebar)
        }
    }, 100)
}

injectDaznContent()