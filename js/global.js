$(
    function () {
        // Set the title
        document.title = "Coderspace"
        // Automatically load the favicon to all pages and also add modal style
        $('head').append('<link rel="icon" href="./media/favicon.png">').append('<link rel="stylesheet" href="./style/modal.css">')
        // Insert the global html into the page
        // From: https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
        $("#includedContent").load("global.html", function () {
            document.getElementById("contactUs").onclick = () => {
                import("./modal.js").then((module) => {
                    const modal = jQuery.parseHTML("<div><h1>Contact Us</h1><p>E-Mail: <a href='mailto:danialdaryab@gmail.com'>danialdaryab@gmail.com</a></p></div>")[0]
                    $(modal).prepend(module.createModal(modal).attr("style", "float: right;"))
                })
            }
        })
        $("#footer").attr("style", "opacity: 0;").append("<hr id='footerSeparator'>").append("<footer> © 2023 Coderspace. All rights reserved. <br><br> <a href='credits.html'>Credits</a></footer>").delay(2000).animate(
            {opacity: 1}, 500
        )

        $('.newTab a').attr('target', '_blank')
        // Show the hidden elements
        $('#title').delay(250).animate({opacity: 1}, 1000)
        $('#content>.hidden').delay(750).animate({opacity: 1}, 1000)
    }
)