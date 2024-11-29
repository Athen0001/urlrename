//front input sanitization
const sanitizeInput = (input) => {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
};

document
  .getElementById("url-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const urlInput = document.getElementById("url-input").value;
    const sanitizedInput = sanitizeInput(urlInput);

    // Replace input value with sanitized one before sending
    document.getElementById("url-input").value = sanitizedInput;

    try {
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: sanitizedInput }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Shortened URL:", data.shortUrl);

        // Display the shortened URL on the page or in some HTML element
        document.getElementById(
          "shortened-url-display"
        ).innerText = `Shortened URL: ${data.shortUrl}`;
      } else {
        console.error("Erro:", response.statusText);
        alert("Something goes wrong.");
      }
    } catch (error) {
      console.error("Fetch calls error:", error);
    }
  });
