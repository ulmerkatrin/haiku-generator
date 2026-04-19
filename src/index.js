const apiKey = "234180b1fac3cd52a404393etbea103o";
const context = "You are an expert haiku writer. Your forte is modern, cool, sleek and clean cut haikus. Do not sign the poem.";
 
function formatHaiku(text) {
    const titleMatch = text.match(/\*\*(.+?)\*\*/);
    const title = titleMatch ? titleMatch[1] : "";
    const body = text
        .replace(/\*\*(.+?)\*\*/, "")
        .replace(/yours truly.*/gi, "")
        .replace(/\n+/g, " ")
        .trim();
 
    return `<strong class="haiku-line">${title}</strong>` +
           `<span class="haiku-line">${body}</span>` +
           `<span class="haiku-line haiku-signature">yours truly, SheCodes AI</span>`;
}
 
function typewrite(text, element, onDone) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (onDone) onDone();
        }
    }, 55);
}
 
function displayHaiku(response) {
    const outputEl = document.querySelector("#haiku-output");
    const haiku = response.data.answer;
    const plainText = haiku
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/yours truly.*/gi, "yours truly, SheCodes AI")
        .replace(/\n+/g, " ")
        .trim();
 
    typewrite(plainText, outputEl, () => {
        outputEl.innerHTML = formatHaiku(haiku);
    });
}
 
function handleError(error) {
    const outputEl = document.querySelector("#haiku-output");
    outputEl.textContent = "Something went wrong. Please try again.";
    console.log(error);
}
 
document.querySelector(".haiku-form").addEventListener("submit", (e) => {
    e.preventDefault();
 
    const keyword = document.querySelector(".keyword-input").value.trim();
    if (!keyword) return;
 
    const prompt = `Write a haiku about: ${keyword}`;
    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;
 
    const outputEl = document.querySelector("#haiku-output");
    outputEl.textContent = "Generating your haiku…";
 
    axios.get(apiUrl).then(displayHaiku).catch(handleError);
});