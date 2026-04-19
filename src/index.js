const placeholderHaiku = "haiku line1\nhaiku line2\nhaiku line3";
 
function typewrite(text, element) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, 55);
}
 
document.querySelector(".haiku-form").addEventListener("submit", (e) => {
    e.preventDefault();
    typewrite(placeholderHaiku, document.querySelector("#haiku-output"));
});