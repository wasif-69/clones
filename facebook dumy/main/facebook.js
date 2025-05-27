document.getElementById("image_logo").addEventListener("mouseover", function () {
    document.getElementById("image_logo").style.opacity = "0.5";
});
document.getElementById("image_logo").addEventListener("mouseout", function () {
    document.getElementById("image_logo").style.opacity = "1";
});
document.getElementById("image_logo").addEventListener("click", function () {
    window.location.href = "spotify.html";
});

document.querySelectorAll(".nav_tab").forEach(function (element) {
    element.addEventListener("mouseover", function () {
        element.style.opacity = "0.5";
        element.classList.add("nav_tab_two");
    });
    element.addEventListener("mouseout", function () {
        element.style.opacity = "1";
        element.classList.remove("nav_tab_two");
    });
});

document.querySelectorAll(".nav_grey").forEach(function (element) {
    element.addEventListener("mouseover", function () {
        element.style.opacity = "0.5";
    });
    element.addEventListener("mouseout", function () {
        element.style.opacity = "1";
    });
});

// document.querySelector(".get_sponser").addEventListener("mouseover", function () {
    
//     document.querySelector(".text").style.backgroundColor = "rgb(179, 171, 171)";
//     document.querySelector(".get_sponser").classList.add("get_sponser_hover");
// });

// document.querySelector(".get_sponser").addEventListener("mouseout", function () {



//     document.querySelector(".text").style.backgroundColor = "rgb(250, 243, 243)";
//     document.querySelector(".get_sponser").classList.remove("get_sponser_hover");
// });

document.querySelectorAll(".get_sponser").forEach(function (element) {
    element.addEventListener("mouseover", function () {
        element.querySelector(".text").style.backgroundColor = "rgb(179, 171, 171)";
        element.classList.add("get_sponser_hover");
    });
    element.addEventListener("mouseout", function () {
        element.querySelector(".text").style.backgroundColor = "rgb(250, 243, 243)";
        element.classList.remove("get_sponser_hover");
    });
});

// We stop right here

document.getElementById("sponser_click").addEventListener("click", function () {
    window.location.href = "http://localhost:5000/facebook/sponsers";
});

document.querySelector(".chat").addEventListener("click", function () {
    window.location.href = "http://localhost:5000/facebook/groups";
});