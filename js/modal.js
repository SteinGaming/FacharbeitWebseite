// From: https://www.w3schools.com/howto/howto_css_modals.asp

export function createModal(content) {
    content.classList.add("modal-content");
    const modal = $("<div></div>").attr("class", "modal").attr("style", "opacity: 0;").append(content)
    function animateClose() {
        modal.animate({ opacity: 0 }, 500, function () {
            modal.remove()
        })
    }
    $(document.body).append(modal);
    const closeButton = $("<span class='close'>&times;</span>").click(function () {
        animateClose()
    })
    document.body.onclick = function (event) {
        if (event.target.classList.contains("modal")) {
            animateClose()
        }
    }
    $(modal).animate({ opacity: 1 }, 500)
    return closeButton;
}