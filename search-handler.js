// Search handler script for Find Lite - manages search shortcuts and text input detection
let blockInTextInputs = true;

// Load settings
chrome.storage.local.get(["blockInTextInputs"], (result) => {
	blockInTextInputs = result.blockInTextInputs !== false;
});

// Listen for settings changes
chrome.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === "local" && changes.blockInTextInputs) {
		blockInTextInputs = changes.blockInTextInputs.newValue !== false;
	}
});

// Check if element is a text input
function isTextInput(element) {
	if (!element) return false;

	const tagName = element.tagName.toLowerCase();
	const type = element.type ? element.type.toLowerCase() : "";

	// Text input elements
	if (
		tagName === "input" &&
		(type === "text" ||
			type === "password" ||
			type === "email" ||
			type === "url" ||
			type === "search" ||
			type === "tel" ||
			type === "number" ||
			type === "" ||
			type === "date" ||
			type === "time" ||
			type === "datetime-local")
	) {
		return true;
	}

	// Textarea and contentEditable elements
	if (tagName === "textarea") return true;
	if (element.contentEditable === "true") return true;

	// Check for rich text editors (common class names)
	if (
		element.classList.contains("editor") ||
		element.classList.contains("ql-editor") ||
		element.classList.contains("CodeMirror")
	) {
		return true;
	}

	return false;
}

// Keyboard event listener
document.addEventListener("keydown", (event) => {
	// If blocking is enabled and we're in a text input, don't activate search
	if (blockInTextInputs && isTextInput(event.target)) {
		return; // Don't process shortcut
	}

	// Process shortcut normally here
	// (Add your existing shortcut detection logic)
});

// Response to popup ping
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "ping") {
		sendResponse({ status: "ok" });
	}
});
