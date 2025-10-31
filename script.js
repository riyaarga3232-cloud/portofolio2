// Typing Effect
const text = "Web Developer & Designer";
const typingText = document.getElementById("typingText");
let index = 0;

function type() {
    typingText.innerText = text.slice(0, index++);
    if (index <= text.length) {
        setTimeout(type, 80);
    }
}
type();

// Dark Mode
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

