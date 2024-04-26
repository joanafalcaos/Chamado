let body = document.querySelector("body");

const chamadoURL = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
    "X-Parse-Application-Id": "mI50K0T2GZ4MvpgJOP7HHmaaNgU3fXFWDDQy6OEm",
    "X-Parse-REST-API-Key": "OKAzIaA5ONyH546zF8EzvwmCghGSKTZ27RbONUac",
};
const headersJson = {
    ...headers,
    "Content-Type": "application/json",
  };
  
  const getChamados = async () => {
    let url = chamadoURL;
      const whereClause = JSON.stringify({ finalizado: false });
      url = `${url}?where=${whereClause}`;
      url = encodeURI(url);
      console.log("url", url);
  
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    return data.results;
  };


  
  const callsList = async () => {
    let chamados = await getChamados();

    for (let i = 0; i < chamados.length; i++) {
        const chamado = chamados[i];
        const div = document.createElement("div");
        div.className = "chamado";


        const name = document.createElement("p");
        name.textContent = chamado.nome;

        const subject = document.createElement("h3");
        subject.textContent = chamado.assunto;

        const msg = document.createElement("p");
        msg.textContent = chamado.mensagem;

        const btn = document.createElement("button");
        btn.innerHTML = "Concluir";
        btn.onclick = () => close(textArea.value, chamado);
        
        const textArea = document.createElement("textarea");
        textArea.rows = 5;

        div.appendChild(name);
        div.appendChild(subject);
        div.appendChild(msg);
        div.appendChild(textArea);
        div.appendChild(document.createElement("br"));
        div.appendChild(btn);
        body.appendChild(div);
    }
};

  window.addEventListener("load", async () => {
    callsList();
    });
  
    const close = async (resposta, chamado) => {
      await fetch(`${chamadoURL}/${chamado.objectId}`, {
        method: "PUT",
        headers: headersJson,
        body: JSON.stringify({ finalizado: true, resposta }),
      });
  
      location.reload();
    };