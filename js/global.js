$(
    function () {
        // Set the title
        document.title = "Coderspace"
        // Insert the global html into the page
        // From: https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
        $("#includedContent").load("global.html")
        // Automatically load the favicon to all pages
        $('head').append('<link rel="icon" href="media/favicon.png">')
        // Show the hidden elements
        $('#title').delay(250).animate({opacity: 1}, 1000)
        $('#content>.hidden').delay(750).animate({opacity: 1}, 1000)
    }
)