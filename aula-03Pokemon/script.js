const btnCarregarPikomon = document.getElementById("load-pokemon");

btnCarregarPikomon.addEventListener('click', function () {
    console.log("clicou!!");
    const listaPikomons = document.getElementById('list-pokemon');

    listaPikomons.innerHTML = '<li>Carregando...</li>';

    fetch('http://pokeapi.co/api/v2/pokemon?limit=2000')
    .then(response => {
        // ! -> diferente
        if (!response.ok){
            // throw -> Jogar para cima o erro!
            throw new Error('Erro ao acessaar o site');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);

        listaPikomons.innerHTML = ''; //Limpar o carregando

        data.results.forEach(pikomon => {
            console.log(pikomon);
            const listItem = document.createElement("li");
            listItem.textContent = pikomon.name; // adicionando nome na linha
            
            fetch(pikomon.url).then(response => {
                return response.json();
            }).then(pikomonDetalhes => {
                //Criando a tag img
                const imagePikomon = document.createElement("img"); 
                
                //adicionando o caminho da imagem
                imagePikomon.src = pikomonDetalhes.sprites.front_default; // imagem

                listItem.appendChild(imagePikomon);
            });

            // adicionando na lista
            listaPikomons.appendChild(listItem);
        });
    });

});