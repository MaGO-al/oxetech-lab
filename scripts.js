// Máscara de telefone
document.getElementById("tel").addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 7)
        v = `(${v.slice(0, 2)}) ${v.slice(2, 3)} ${v.slice(3, 7)}-${v.slice(7)}`;
    else if (v.length > 3) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
});

// Impede submit nativo e chama a validação
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    validarForm();
});

function mostrarErro(id, msg) {
    let el = document.getElementById("erro-" + id);
    
    if (!el) {
        el = document.createElement("p");
        el.id = "erro-" + id;
        el.className = "text-xs text-red-500 mt-1";
        document.getElementById(id).insertAdjacentElement("afterend", el);
    }
    
    el.textContent = msg;
    el.classList.remove("hidden");
}

function limparErro(id) {
    const el = document.getElementById("erro-" + id);
    if (el) el.textContent = "";
}

function validarForm() {
    let valido = true;
    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const tel = document.getElementById("tel").value.trim();

    limparErro("name");
    limparErro("email");
    limparErro("tel");

    if (!nome) {
        mostrarErro("name", "Por favor, informe o seu nome.");
        valido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        mostrarErro("email", "Por favor, informe um e-mail.");
        valido = false;
    } else if (!regexEmail.test(email)) {
        mostrarErro("email", "E-mail inválido. Use o formato: exemplo@dominio.com");
        valido = false;
    }

    const telLimpo = tel.replace(/\D/g, "");
    if (!tel) {
        mostrarErro("tel", "Por favor, informe o seu telefone.");
        valido = false;
    } else if (telLimpo.length < 11) {
        mostrarErro(
            "tel",
            "Telefone incompleto. Use o formato: (xx) x xxxx-xxxx",
        );
        valido = false;
    }

    if (valido) {
        document.getElementById("conf-nome").textContent = nome;
        document.getElementById("conf-email").textContent = email;
        document.getElementById("conf-telefone").textContent = tel;
        document.getElementById("modal-overlay").classList.remove("hidden");
    }
}

function cancelar() {
    document.getElementById("modal-overlay").classList.add("hidden");
}

function confirmar() {
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("sucesso").classList.remove("hidden");
    document.querySelector("form").reset();
}
