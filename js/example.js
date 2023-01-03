const list = ["Example1", "Example2"]

$(
    function () {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            jQuery.ajax({
                    url: "./media/examples/" + element + ".md",
                    success: function (data) {
                        let li = document.createElement('li')
                        li.style.opacity = "0"
                        li.id = element
                        $(li).append(
                            marked.parse(data)
                        )
                        $("#examples").append(li)

                        let button = document.createElement('button')
                        button.id = element
                        button.className = "expand"
                        button.innerText = "+"
                        button.onclick = function () {
                            const htmlElement = this.parentNode.getElementsByTagName("code")[0];
                            const alreadySet = htmlElement.classList.contains("expanded");
                            if (alreadySet)
                                htmlElement.classList.remove("expanded")
                            else htmlElement.classList.add("expanded")
                        }
                        hljs.highlightAll()
                        $("#examples>li#" + element + ">pre").prepend(
                            button
                        )
                        $(li).delay(1000).animate({ opacity: 1 }, 750)
                    }
                }
            )
        }
    }
)
