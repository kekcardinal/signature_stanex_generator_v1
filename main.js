const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const textInputs = document.querySelectorAll('input[type="text"]');
const signatureContent = document.getElementById("signatureContent");
const copyButton = document.getElementById("copyButton");
const signatureTable = document.querySelector("table");

copyButton.addEventListener("click", () => {
  // Select the signature table content
  const range = document.createRange();
  range.selectNode(signatureTable);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    // Copy the selected content
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log("Signature copied!");
    alert("Signature copied successfully!");
  } catch (err) {
    console.error("Unable to copy signature:", err);
  }
});

function updateSignature() {
  let signatureHTML = "";

  textInputs.forEach((textInput) => {
    if (
      textInput.value.trim() !== "" &&
      document.getElementById(textInput.id.replace("Input", "Checkbox")).checked
    ) {
      let inputClass = textInput.id.replace("Input", "-class");
      signatureHTML += `<p class="${inputClass}">${textInput.value.trim()}</p>`;
    }
  });

  signatureContent.innerHTML = signatureHTML;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateSignature);
});

textInputs.forEach((textInput) => {
  textInput.addEventListener("input", updateSignature);
});

// Initial update
updateSignature();
