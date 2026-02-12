function copyCommand() {
    var cmdText = document.getElementById("cmd").innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cmdText).then(showCopyFeedback);
        return;
    }

    var textArea = document.createElement("textarea");
    textArea.value = cmdText;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showCopyFeedback();
}

function showCopyFeedback() {
    var tooltip = document.getElementById("tooltip");
    var icon = document.getElementById("copy-icon");
    var originalClass = icon.className;

    tooltip.classList.add("show");
    icon.className = "ph-fill ph-check-circle";
    icon.style.color = "#4ade80";

    setTimeout(function () {
        tooltip.classList.remove("show");
        icon.className = originalClass;
        icon.style.color = "";
    }, 2000);
}
