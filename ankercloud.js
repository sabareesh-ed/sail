 // Function to calculate reading time
 function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

function updateReadingTimes() {
    const blogPosts = document.querySelectorAll('.timer');

    blogPosts.forEach(post => {
        const text = post.querySelector('.w-richtext').textContent;

        const readingTime = calculateReadingTime(text);

        const timeDisplay = post.querySelector('.reading-time');
        timeDisplay.textContent = readingTime;
    });
}

// Define the function to process card tags
function processCardTags() {
    var cardTagsList = document.querySelectorAll('.card__tags');
    cardTagsList.forEach(function (cardTags) {
        var cardTagsListContainer = cardTags.closest('.card__tags-list');
        if (cardTagsListContainer) {
            var tags = cardTags.textContent.split(", ");
            tags.forEach(function (tag) {
                if (!isTagAlreadyPresent(cardTagsListContainer, tag)) {
                    var newTagDiv = document.createElement("div");
                    newTagDiv.classList.add("card__tag", "text-xxs");
                    newTagDiv.textContent = tag;
                    cardTagsListContainer.appendChild(newTagDiv);
                }
            });
        }
    });
}

// Function to check if a tag is already present in the container
function isTagAlreadyPresent(container, tag) {
    var existingTags = container.querySelectorAll('.card__tag');
    for (var i = 0; i < existingTags.length; i++) {
        if (existingTags[i].textContent.trim() === tag.trim()) {
            return true;
        }
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    processCardTags();
	updateReadingTimes();
    console.log("function called");
    var loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function () {
            setTimeout(function () {
                processCardTags();
                updateReadingTimes();
            }, 200);
        });
    }
});