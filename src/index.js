// write your code here

// 
const configurationObj = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
}

fetch("http://localhost:3000/ramens", configurationObj)
.then(res => res.json())
.then (data => {
    // For Each statement for 2 things: to populate images of ramen + to add a click event handler for each of the photos.
    data.forEach(addRamenToDOM)
})


// Creating a new ramen
const newRamen = (e) => {
    // prevents the form for submitting; overriding the form's behavior
    e.preventDefault();
    const form = document.getElementById("new-ramen");
    let newObj = {
        name: form.elements["new-name"].value,
        restaurant: form.elements["new-restaurant"].value,
        image: form.elements["new-image"].value,
        rating: form.elements["new-rating"].value,
        comment: form.elements["new-comment"].value,
    }

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newObj)
    }

    fetch("http://localhost:3000/ramens", configObj)
    .then(res => res.json())
    .then(data => addRamenToDOM(data))
}

document.querySelector("#new-ramen").addEventListener("submit", newRamen);


// adding ramen to the DOM
function addRamenToDOM (ramen) {
    const img = document.createElement("img");
    img.src = ramen.image; // photo => different element from the data array
    document.getElementById("ramen-menu").appendChild(img);

    // element.addEventListener() --> to make a button
    img.addEventListener("click", (e) => {
        const detailImg = document.querySelectorAll(".detail-image")[0];
        const detailName = document.querySelectorAll(".name")[0];
        const detailRestaurant = document.querySelectorAll(".restaurant")[0];
        const ratingDisp = document.getElementById("rating-display");
        const commentDisp = document.getElementById("comment-display");
        detailImg.src = ramen.image;
        detailName.textContent = ramen.name;
        detailRestaurant.textContent = ramen.restaurant;
        ratingDisp.textContent = ramen.rating;
        commentDisp.textContent = ramen.comment;
    })
}

// if using "FOR" loop
// for (let i = 0; i < data.length; i++) {
//     const img = document.createElement("img");
//     img.src = data[i].image; // photo => different element from the data array
//     document.getElementById("ramen-menu").appendChild(img);
// }


