const form = document.getElementById('cep-form');
const cepInput = document.getElementById('cep-input');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', (event) => {
    
    event.preventDefault(); // evitar o recarregamento da página

    const cep = cepInput.value.trim(); // trim -> remove white space

    resultado.innerHTML = '<p>Buscando...<p>';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
        if (!response.ok){
            throw new Error("Erro ao buscar o CEP");
        }
        return response.json();
    })
    .then(data => {
        if (data.erro) {
            resultado.innerHTML = '<p style="color: red;">CEP nao</p>';
        }
        resultado.innerHTML =` 
        <p><strong>CEP: </strong> ${data.cep}</p>
        <p><strong>Logradouro: </strong> ${data.logradouro}</p>
        <p><strong>Bairro: </strong> ${data.bairro}</p>
        <p><strong>Cidade: </strong> ${data.localidade}</p>
        <p><strong>Estado: </strong> ${data.uf}</p>
        `
    });
});