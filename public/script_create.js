const port = location.port;
const checkbox = document.getElementById("anonimous");
let authorNameTag = document.getElementById("name");
let authorName = "";
const button = document.getElementById("create-post-button");
const topic = document.getElementById("topic");
const postContent = document.getElementById("content");
const url = "http://localhost:" + port;

// User clicking on anonimous checkbox
checkbox.addEventListener("click", () => {
    authorNameTag.disabled = checkbox.checked;
    if (checkbox.checked) {
        authorName = authorNameTag.value;
        authorNameTag.value = "";
    } else {
        authorNameTag.value = authorName;
    }
});

// Handle form submission
button.addEventListener("click", checkPostRequirement);
async function checkPostRequirement() {
    if (!topic.value) {
        triggerTopicRequirement();
        return;
    } else if (!checkbox.checked && !authorNameTag.value) {
        triggerNameRequirement();
        return;
    } else if (wordCount(postContent.value) < 10) {
        triggerContentRequirement();
        return;
    } else {
        try {
            const body = new URLSearchParams({
                topic: topic.value,
                name: authorNameTag.value,
                content: postContent.value
            });
            console.log("Starting form submission...");
            // code to submit form content to node server
            const response = await fetch(url + "/create", {
                method: "POST",
                body: body.toString(),
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            });
            console.log(`Response status: ${response.status}`);
            if (!response.ok) {
                throw new Error("Failed to submit form");
            } else {
                const text = await response.text();
                console.log(text);
                handlePostCreation(text);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}
document.getElementById("create-post-button").addEventListener("click", function(event) {
    event.preventDefault();
});

// Handle modal buttons clicking
document.getElementById("firstButton").addEventListener("click", (event) => {
    window.location.href = url + "/create";
});
document.getElementById("secondButton").addEventListener("click", (event) => {
    window.location.href = url;
});

topic.addEventListener("input", () => {
    if (topic.value) {
        unTriggerTopicRequirement();
    }
});

authorNameTag.addEventListener("input", () => {
    if (authorNameTag.value) {
        unTriggerNameRequirement();
    }
});

checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        unTriggerNameRequirement();
    }
});

postContent.addEventListener("input", () => {
    unTriggerContentRequirement();
});

postContent.addEventListener("input", () => {
    console.log(postContent.value);
});

// Function to handle invalid topic requirement 
function triggerTopicRequirement() {
    topic.classList.add("is-invalid");
    document.getElementById("invalidTopic").hidden = false;
}
function unTriggerTopicRequirement() {
    topic.classList.remove("is-invalid");
    document.getElementById("invalidTopic").hidden = true;
}

// Function to handle invalid name requirement 
function triggerNameRequirement() {
    authorNameTag.classList.add("is-invalid");
    document.getElementById("invalidName").hidden = false;
}
function unTriggerNameRequirement() {
    authorNameTag.classList.remove("is-invalid");
    document.getElementById("invalidName").hidden = true;
}

// Function to handle invalid content requirement
function triggerContentRequirement() {
    postContent.classList.add("is-invalid");
    document.getElementById("invalidContent").hidden = false;
}
function unTriggerContentRequirement() {
    postContent.classList.remove("is-invalid");
    document.getElementById("invalidContent").hidden = true;
}

// Helper function after submitting the form
function handlePostCreation(name) {
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    document.getElementById("exampleModalLabel").innerText = name;
    modal.show();
}
function wordCount(word) {
    return word.trim().split(/\s+/).length;
}