const savedData = JSON.parse(localStorage.getItem('postComments')) || { comments: [], timestamp: null };

const postComments = savedData.comments || [];
const timestamp = savedData.timestamp || null;


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
      <div>${post.comment}</div>
      <div class="comments-info">
        <div class="name-com">
          <div class="SA">SA</div>
          <div class="name-time">
            <div class="commentor-name">Syed Abbas</div>
            <div class="date-time">${post.timestamp}</div>
          </div>
        </div>
        <div>
          <button class="delete-comment-btn"
            onclick="
              const index = postComments.indexOf('${post.comment}');
              postComments.splice(index, 1);
              saveCommentsToLocalStorage();
              renderComments();">
            <i class="fa-solid fa-trash" style="color: #5c93ff;"></i>
          </button>
        </div>
      </div>
    </div>
    `;

    postCommentsHtml += html;
  }

  document.querySelector('.posted-comments').innerHTML = postCommentsHtml;
  const addCommentsMsg = document.querySelector('.add-comments');
  addCommentsMsg.style.display = postComments.length === 0 ? 'block' : 'none';
}


function addComment() {
  const inputComment = document.querySelector('.post-comment');
  const comment = inputComment.value;

  if (postComments.some((post) => post.comment === comment)) {
    const duplicateMsg = document.querySelector('.duplicate-comment-msg');
    duplicateMsg.style.display = 'block';
    setTimeout(() => {
      duplicateMsg.style.display = 'none';
    }, 2000);
  } else if (postComments.length >= 10) {
    const limitMsg = document.querySelector('.comment-limit-msg');
    limitMsg.style.display = 'block';
    setTimeout(() => {
      limitMsg.style.display = 'none';
    }, 2000);
  } else if (comment) {
    const newComment = {
      comment,
      timestamp: getCurrentDateTime(),
    };
    postComments.push(newComment);
    saveCommentsToLocalStorage();

    inputComment.value = '';
    renderComments();

    const successMsg = document.querySelector('.comment-success-msg');
    successMsg.style.display = 'block';
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 2000);
  }
}


const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', filterComments);


function filterComments() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredComments = postComments.filter((post) =>
    post.comment.toLowerCase().includes(searchTerm)
  );
  renderFilteredComments(filteredComments);
}


function renderFilteredComments(filteredComments) {
  let postCommentsHtml = '';

  for (let i = 0; i < filteredComments.length; i++) {
    const post = filteredComments[i];
    const html = `
      <div class="complete-comment">
        <div>${post.comment}</div>
        <div class="comments-info">
          <div class="name-com">
            <div class="SA">SA</div>
            <div class="name-time">
              <div class="commentor-name">Syed Abbas</div>
              <div class="date-time">${post.timestamp}</div>
            </div>
          </div>
          <div>
            <button class="delete-comment-btn"
              onclick="
                const index = postComments.indexOf('${post.comment}');
                postComments.splice(index, 1);
                saveCommentsToLocalStorage();
                renderFilteredComments(postComments);
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

function saveCommentsToLocalStorage() {
  const commentWithTimestamp = {
    comments: postComments,
    timestamp: getCurrentDateTime(),
  };
  localStorage.setItem('postComments', JSON.stringify(commentWithTimestamp));
}


