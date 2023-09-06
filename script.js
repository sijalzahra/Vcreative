const postComments = JSON.parse(localStorage.getItem('postComments')) || [];

renderComments();

function getCurrentDateTime() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return now.toLocaleString(undefined, options);
}

function renderComments() {
  let postCommentsHtml = '';

  for (let i = 0; i < postComments.length; i++) {
    const post = postComments[i];
    const html = `
    <div class="complete-comment">
      <div>${post}</div>
      <div class="comments-info">
        <div class="name-com">
          <div class="SA">SA</div>
          <div class="name-time">
            <div class="commentor-name">Syed Abbass</div>
            <div class="date-time">${getCurrentDateTime()}</div>
          </div>
        </div>
        <div>
          <button class="delete-comment-btn" 
            onclick="
              postComments.splice(${i}, 1);
              saveCommentsToLocalStorage();
              renderComments();
            "
          >
            <i class="fa-solid fa-trash" style="color: #5c93ff;"></i>
          </button>
        </div>
      </div>
    </div>
    `;
    postCommentsHtml += html;
  }

  document.querySelector('.posted-comments').innerHTML = postCommentsHtml;
}

function addComment() {
  const inputComment = document.querySelector('.post-comment');
  const comment = inputComment.value;

  postComments.push(comment);
  saveCommentsToLocalStorage();

  inputComment.value = '';

  renderComments();
}

function saveCommentsToLocalStorage() {
  localStorage.setItem('postComments', JSON.stringify(postComments));
}
