const next = document.getElementById("next");
const prev = document.getElementById("prev");
const page = document.getElementById("page");
const totalpages = document.getElementById("paginas");


next.addEventListener("click", async(e) => {
    e.preventDefault();

    const valor = parseInt(page.value);
    const total = parseInt(totalpages.value);
    console.log("valor", valor, "total", total);

   
    window.location.href = `http://localhost:3005/propiedades?page=${valor + 1}`;
});
prev.addEventListener("click", () => {
    window.location.href = prev.href;
})