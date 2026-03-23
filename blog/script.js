const posts = window.BLOG_POSTS || [];

const filters = ["全部", ...new Set(posts.map((post) => post.category))];

const postGrid = document.querySelector("#post-grid");
const filterBar = document.querySelector("#filter-bar");
const featuredTag = document.querySelector("#featured-tag");
const featuredTitle = document.querySelector("#featured-title");
const featuredExcerpt = document.querySelector("#featured-excerpt");
const featuredLink = document.querySelector("#featured-link");
const featuredFocus = document.querySelector("#featured-focus");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(new Date(dateString))
    .replaceAll("/", ".");
}

function getPostUrl(post) {
  return `./post.html?slug=${post.slug}`;
}

function renderFeatured() {
  const featuredPost = posts.find((post) => post.slug === "why-blog") || posts[0];

  if (!featuredPost) return;

  if (featuredTag) {
    featuredTag.textContent = featuredPost.featuredLabel || featuredPost.category;
  }

  if (featuredTitle) {
    featuredTitle.textContent = featuredPost.title;
  }

  if (featuredExcerpt) {
    featuredExcerpt.textContent = featuredPost.excerpt;
  }

  if (featuredLink) {
    featuredLink.href = getPostUrl(featuredPost);
  }

  if (featuredFocus) {
    featuredFocus.textContent =
      featuredPost.featuredFocus || "Research, reading, notes, and daily life.";
  }
}

function renderPosts(activeFilter = "全部") {
  const visiblePosts =
    activeFilter === "全部"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  postGrid.innerHTML = visiblePosts
    .map(
      (post) => `
        <article class="post-card">
          <a class="post-card-link" href="${getPostUrl(post)}">
            <div class="post-cover" style="background:${post.gradient}"></div>
          </a>
          <div class="post-meta">
            <span>${formatDate(post.date)}</span>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
          <a class="post-card-link" href="${getPostUrl(post)}">
            <h3>${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
          </a>
          <footer class="post-footer">
            <span class="post-category">${post.category}</span>
            <a class="text-link" href="${getPostUrl(post)}">继续阅读</a>
          </footer>
        </article>
      `
    )
    .join("");
}

function renderFilters() {
  filterBar.innerHTML = filters
    .map(
      (filter, index) => `
        <button
          class="chip ${index === 0 ? "is-active" : ""}"
          type="button"
          data-filter="${filter}"
        >
          ${filter}
        </button>
      `
    )
    .join("");

  filterBar.querySelectorAll(".chip").forEach((button) => {
    button.addEventListener("click", () => {
      filterBar.querySelector(".is-active")?.classList.remove("is-active");
      button.classList.add("is-active");
      renderPosts(button.dataset.filter);
    });
  });
}

renderFeatured();
renderFilters();
renderPosts();
