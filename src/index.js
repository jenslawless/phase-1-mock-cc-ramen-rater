document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:3000/ramens")
        .then((r) => r.json())
        .then((data) => {
            data.forEach((ramen) => uploadRamen(ramen))
        })

    let currentID = 1

    function uploadRamen(ramen) {
        const image = document.createElement("img")
        const div = document.querySelector("#ramen-menu")

        image.addEventListener("click", function () {
            rotatingRamen(ramen)
            currentID = ramen.id
        })

        image.src = ramen.image
        div.append(image)
    }

    function rotatingRamen(ramen) {
        const h2 = document.querySelector("#h2-id")
        h2.textContent = ramen.name

        const h3 = document.querySelector("#h3-main-id")
        h3.textContent = ramen.restaurant

        const image = document.querySelector(".detail-image")
        image.src = ramen.image
        const span = document.getElementById("rating-display")
        span.textContent = ramen.rating
        const p = document.getElementById("comment-display")
        p.textContent = ramen.comment
    }

    const form = document.querySelector("#new-ramen")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const newRamen = {
            "name": document.getElementById("new-name").value,
            "restaurant": document.getElementById("new-restaurant").value,
            "image": document.getElementById("new-image").value,
            "rating": document.getElementById("new-rating").value,
            "comment": document.getElementById("new-comment").value,

        }
        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRamen)
        })
            .then((r) => r.json()
                .then((data) => uploadRamen(data)))

    })

})