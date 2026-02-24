document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".story-selection");

  // Fetch all stories from backend
  fetch("/api/stories")
    .then(res => res.json())
    .then(stories => {
      stories.forEach(story => {
        const card = document.createElement("div");
        card.classList.add("story-card");
        card.dataset.id = story._id; // store MongoDB _id

        card.innerHTML = `
          <h2 class="story-title">${story.title}</h2>
          <img src="${story.coverImage}" alt="${story.title}">
        `;

        // Click to open story page
        card.addEventListener("click", () => {
          window.location.href = `/story.html?id=${story._id}`;
        });

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load stories:", err));
});
