document.addEventListener("load", find("octocat"));

if (localStorage.getItem("mode") === "dark") {
    document.querySelector("body").classList.add("dark-mode");
}

document.querySelector(".search-btn").addEventListener("click", () => {
    reset();
    let username = document.querySelector(".search-input").value;
    find(username);
})

document.querySelector(".dark").addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark-mode");
    localStorage.setItem("mode", "dark");
})
document.querySelector(".light").addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark-mode");
    localStorage.setItem("mode", "light");
})

function find(username) {

    fetch(`https://api.github.com/users/` + username)
        .then(result => result.json())
        .then(data => {
            if (data.hasOwnProperty("message") || username === "") {
                document.querySelector(".no-results").style.display = "block";
                document.getElementById("input-search").placeholder = "";
            } else {
                if (document.querySelector(".no-results").style.display = "block") {
                    document.querySelector(".no-results").style.display = "none";
                }
                if (data.name === null || data.name === "") {
                    document.querySelector(".name").innerHTML = data.login;
                } else {
                    document.querySelector(".name").innerHTML = data.name;
                }


                const d = new Date(data.created_at);
                let year = d.getFullYear();
                let month = d.getMonth();
                let day = d.getDate();
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                document.querySelector(".date").innerHTML = "Joined " + day + " " + months[month] + " " + year;
                document.querySelector(".username").innerHTML = '@' + data.login;

                if (data.bio === null || data.bio === "") {
                    document.querySelector(".profile-bio").innerHTML = "This profile has no bio";
                } else {
                    document.querySelector(".profile-bio").innerHTML = data.bio;
                }


                document.querySelector(".num-repos").innerHTML = data.public_repos;
                document.querySelector(".num-followers").innerHTML = data.followers;
                document.querySelector(".num-following").innerHTML = data.following;

                if (data.location === null || data.location === "") {
                    document.querySelector(".location").innerHTML = "Not Available";
                    document.querySelector(".location").parentNode.style.opacity = 0.5;
                } else {
                    document.querySelector(".location").innerHTML = data.location;
                }
                if (data.blog === null || data.blog === "") {
                    document.querySelector(".website").innerHTML = "Not Available";
                    document.querySelector(".website").parentNode.style.opacity = 0.5;
                } else {
                    document.querySelector(".website").innerHTML = data.blog;
                    document.querySelector(".website").href = data.blog;
                }
                if (data.twitter_username === null || data.twitter_username === "") {
                    document.querySelector(".twitter").innerHTML = "Not Available";
                    document.querySelector(".twitter").parentNode.style.opacity = 0.5;
                } else {
                    document.querySelector(".twitter").innerHTML = data.twitter_username;
                    document.querySelector(".twitter").href = "http://twitter.com/" + data.twitter_username;
                }
                if (data.company === null || data.company === "") {
                    document.querySelector(".company").innerHTML = "Not Available";
                    document.querySelector(".company").parentNode.style.opacity = 0.5;
                } else {
                    document.querySelector(".company").innerHTML = data.company;
                    document.querySelector(".company").href = "https://github.com/github";  /*data.company;*/
                }

                document.querySelector(".avatar-profile").src = data.avatar_url;
                document.querySelector(".avatar-profile-mobile").src = data.avatar_url;
            }
        })
}
function reset() {
    document.querySelectorAll(".container-2").forEach(item => {
        item.style.opacity = 1;
    })
    document.querySelector(".website").href = "#";
    document.querySelector(".company").href = "#";
    document.querySelector(".twitter").href = "#";
}
