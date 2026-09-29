const pokeList =
    document.getElementById("Pokemon_list");

const apiEndpoint =
    "https://pokeapi.co/api/v2/pokemon?limit=12";

const input =
    document.getElementById("input-field");

const searchForm =
    document.getElementById("search");

const nextBtn =
    document.getElementById("Next_Btn");

const preBtn =
    document.getElementById("Previous_Btn");


let nextPage = null;

let previousPage = null;


async function getData(url)
{
    try
    {
        const result =
            await fetch(url);

        if (!result.ok)
        {
            throw new Error(
                `status code: ${result.status}`
            );
        }

        const data =
            await result.json();

        console.log(
            "data: ",
            data
        );

        nextPage =
            data.next;

        previousPage =
            data.previous;

        renderPokes(data);
    }

    catch(error)
    {
        console.log(
            "failed to fetch, error",
            error
        );
    }
}


getData(apiEndpoint);


function renderPokes(data)
{
    while (pokeList.firstChild)
    {
        pokeList.firstChild.remove();
    }

    data.results.forEach(
        (element) =>
        {
            const pokeName =
                document.createElement("li");

            const pokemonNumber =
                element.url
                    .split("/")
                    .filter(Boolean)
                    .pop();

            pokeName.textContent =
                pokemonNumber +
                ". " +
                element.name;

            pokeList.append(
                pokeName
            );

            console.log("append");
        }
    );
}


nextBtn.addEventListener(
    "click",
    () =>
    {
        if (nextPage)
        {
            getData(
                nextPage
            );

            console.log("next");

            nextPage = null;

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );
        }
    }
);


preBtn.addEventListener(
    "click",
    () =>
    {
        if (previousPage)
        {
            getData(
                previousPage
            );

            console.log(
                "previous"
            );

            previousPage = null;

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );
        }
    }
);


searchForm.addEventListener(
    "submit",
    (element) =>
    {
        element.preventDefault();

        const searchBox =
            input.value
                .trim()
                .toLowerCase();

        if (searchBox === "")
        {
            return;
        }

        async function searchPokemon(name)
        {
            try
            {
                const result =
                    await fetch(
                        "https://pokeapi.co/api/v2/pokemon/" +
                        name
                    );

                if (result.ok)
                {
                    const data =
                        await result.json();

                    console.log(
                        "pokemon found",
                        data
                    );

                    const pokeName =
                        document.createElement("li");

                    pokeName.textContent =
                        data.id +
                        ". " +
                        data.name;

                    pokeList.replaceChildren(
                        pokeName
                    );

                    console.log(
                        "Name: " +
                        data.name
                    );
                }

                else
                {
                    console.log(
                        "Pokemon not found!"
                    );
                }
            }

            catch(error)
            {
                console.log(
                    "Search error:",
                    error
                );
            }
        }

        searchPokemon(
            searchBox
        );
    }
);