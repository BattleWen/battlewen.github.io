const postRoot = document.querySelector("#article-root");
const posts = window.BLOG_POSTS || [];

function formatDate(dateString) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(new Date(dateString))
    .replaceAll("/", ".");
}

function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

function renderSection(section) {
  const paragraphs = (section.paragraphs || [])
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  const listItems = section.list
    ? `
      <ul class="article-list">
        ${section.list.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `
    : "";

  return `
    <section class="article-section">
      <h2>${section.title}</h2>
      ${paragraphs}
      ${listItems}
    </section>
  `;
}

function renderNotFound() {
  document.title = "Article Not Found";

  postRoot.innerHTML = `
    <section class="article-hero">
      <p class="article-kicker">404</p>
      <h1>这篇文章不存在</h1>
      <p class="article-lead">可能是链接失效了，或者这篇文章还没有写完。</p>
    </section>
    <section class="article-next">
      <h2>返回</h2>
      <p><a href="./index.html#journal">回到首页继续看文章</a></p>
    </section>
  `;
}

function renderPost(post) {
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const nextPost = posts[currentIndex + 1];

  document.title = `${post.title} | Xiaoyu Wen`;

  postRoot.innerHTML = `
    <section class="article-hero">
      <p class="article-kicker">${post.category} · ${formatDate(post.date)} · ${post.readTime}</p>
      <h1>${post.title}</h1>
      <div class="article-meta">
        <span>${post.category}</span>
        <span>•</span>
        <span>Notebook</span>
      </div>
      <p class="article-lead">${post.lead}</p>
    </section>
    ${post.sections.map(renderSection).join("")}
    <section class="article-next">
      <h2>${nextPost ? "下一篇" : "回到首页"}</h2>
      <p>
        <a href="${nextPost ? `./post.html?slug=${nextPost.slug}` : "./index.html#journal"}">
          ${nextPost ? nextPost.title : "继续看最近更新"}
        </a>
      </p>
    </section>
  `;
}

const slug = new URLSearchParams(window.location.search).get("slug");
const post = slug ? getPostBySlug(slug) : null;

if (!post) {
  renderNotFound();
} else {
  renderPost(post);
}
