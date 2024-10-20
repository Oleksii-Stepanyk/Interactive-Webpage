const loadButton = document.querySelector('.load');
loadButton.addEventListener('click', fetchJokes);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearJokes);

async function fetchJokes() {
    const parent = document.body.querySelector('.jokes');
    parent.innerHTML = "";
    const loader = createLoader();
    parent.appendChild(loader);
    try {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/random/25");
        if (response.ok) {
            const data = await response.json();
            const elements = data.map(item => {
                const {setup, punchline} = item;
                return addJoke(setup, punchline);
            });
            const container = document.body.querySelector('.jokes');
            container.innerHTML = elements.join("");
        }
    } catch (error) {
        alert("Error occurred!");
    } finally {
        loader.remove();
    }
}

function clearJokes() {
    const container = document.body.querySelector('.jokes');
    container.innerHTML = "";
}

function createLoader() {
    const loader = document.createElement('p');
    loader.innerText = "Loading dose of fun...";
    loader.classList.add('loader');
    return loader;
}

function addJoke(setup, punchline) {
    return `
    <div class="joke">
        <p>${setup}</p>
        <span class="divider"></span>
        <p>${punchline}</p>
    </div>
    `
}