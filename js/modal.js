// From: https://www.w3schools.com/howto/howto_css_modals.asp

export function createModal(content) {
    const modal = document.createElement("div");
    modal.style.opacity = "0";
    function animateClose() {
        $(modal).animate({ opacity: 0 }, 500, function () {
            modal.remove()
        })
    }
    modal.className = "modal";
    content.classList.add("modal-content");
    modal.appendChild(content)
    document.body.appendChild(modal);
    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
        animateClose()
    }
    document.body.onclick = function (event) {
        if (event.target === modal) {
            animateClose()
        }
    }
    $(modal).animate({ opacity: 1 }, 500)
    return closeButton;
}