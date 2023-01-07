let languages = ["Java.svg", "Kotlin.svg", "Gnu-bash.svg", "HTML5.svg", "MongoDB.svg", "Redis.svg", "JavaScript.svg"]
$(
    function () {
        languages.forEach(
            function (language) {
                $("#languages").append(
                    $("<img>").attr("src", "./media/languages/" + language).attr("alt", language).attr("class", "language")
                )
            }
        )
    }
)