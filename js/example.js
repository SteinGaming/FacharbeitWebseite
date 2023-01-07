const list = ["Example1", "Example2"]

$(
    function () {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            let li = $('<li style="opacity: 0;" id=' + element + ' ></li>') // jQuery object


            $("#examples").append(li)
            jQuery.ajax({
                    url: "./media/examples/" + element + ".md",
                    success: async function (data) {
                        li.append(
                            marked.parse(data)
                        )
                        $("#" + element + " pre").each(function (index) {
                            let buttonDiv = $('<div class="buttonDiv hljs"></div>')
                            addButton(buttonDiv)
                            $(this).prepend(buttonDiv)
                            let code = this.getElementsByTagName("code")[0]
                            code.classList.add("hljs")
                            code.innerHTML = hljs.highlightAuto(code.innerHTML.replaceAll(/&lt;/g, "<").replaceAll(/&gt;/g, ">")).value
                            $("a", li).attr("target", "_blank") // Replace all links to create new tabs AFTER highlighting is done to prevent issues
                        })
                        li.delay(1000).animate({opacity: 1}, 750)
                    }
                }
            )
        }

        function addButton(element) {
            let button = $('<button class="expand">+</button>')
            //button.id = element
            button.click(function () {
                const htmlElement = this.parentNode;
                import("./modal.js").then((module) => {
                    let preNode = htmlElement.parentNode.cloneNode(true)
                    preNode.getElementsByClassName("buttonDiv")[0].remove()
                    $(preNode.getElementsByTagName("code")[0]).prepend(module.createModal(preNode))
                })
            })
            element.append(
                button
            )
            return button
        }
    }
)