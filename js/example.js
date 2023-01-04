const list = ["Example1", "Example2"]

$(
    function () {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            let li = document.createElement('li')
            li.style.opacity = "0"
            li.id = element
            let li$ = $(li) // jQuery object


            $("#examples").append(li)
            jQuery.ajax({
                    url: "./media/examples/" + element + ".md",
                    success: async function (data) {
                        li$.append(
                            marked.parse(data)
                        )
                        let buttons = []
                        $("#" + element + " pre").each(function (index) {
                            let buttonDiv = document.createElement('div')
                            buttonDiv.className = "buttonDiv hljs"
                            buttons.push(addButton(buttonDiv))
                            this.prepend(buttonDiv)
                            let code = this.getElementsByTagName("code")[0]
                            code.classList.add("hljs")
                            code.innerHTML = hljs.highlightAuto(code.innerHTML.replaceAll(/&lt;/g, "<").replaceAll(/&gt;/g, ">")).value
                        })
                        li$.delay(1000).animate({opacity: 1}, 750, function () {
                            buttons.forEach(button => {
                                $(button).delay(200).animate({opacity: 1}, 500)
                            })
                            post(element)
                        })
                    }
                }
            )
        }

        function addButton(element) {
            let button = document.createElement('button')
            button.style.opacity = "0"
            //button.id = element
            button.className = "expand"
            button.innerText = "+"
            button.onclick = function () {
                const htmlElement = this.parentNode;
                import("./modal.js").then((module) => {
                    let preNode = htmlElement.parentNode.cloneNode(true)
                    preNode.getElementsByClassName("buttonDiv")[0].remove()
                    preNode.getElementsByTagName("code")[0].prepend(
                        module.createModal(preNode)
                    )
                })
            }
            element.prepend(
                button
            )
            return button
        }
    }
)

const checkList = list.concat()

// Only run, if all elements are done loading
function post(element) {
    if (checkList.indexOf(element) !== undefined) {
        checkList.splice(checkList.indexOf(element), 1)
    }
    if (checkList.length === 0) {
        $("#content a").attr("target", "_blank")
    }
}