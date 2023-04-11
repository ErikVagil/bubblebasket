function getJoke()
{
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) =>
    {
        const setup = document.getElementById("setup");
        const punchline = document.getElementById("punchline");

        setup.innerHTML = data.setup;
        punchline.innerHTML = data.punchline;
    });
}

getJoke();