export function imageCardTmpl(item) {
  const card = `<div class="photo-card">
  <a href="${item.largeImageURL}">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>
      ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>
      ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>
      ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>
      ${item.downloads}
    </p>
  </div>
</div>`;

  return card;
}
