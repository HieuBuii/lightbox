const imgs = document.querySelectorAll(".lightbox-img");
const header = document.querySelector(".header");
imgs.forEach((item) => {
  item.addEventListener("click", handelShowLightbox);
});

function handelShowLightbox(e) {
  const imglink = e.target.getAttribute("src");
  const html = `
    <div class="modal">
      <div class="modal-content">
        <i class="fa-solid fa-caret-left icon-prev"></i>
        <div class="modal-img">
          <img
            src="${imglink}"
            alt="img"
          />
        </div>
        <i class="fa-solid fa-caret-right icon-next"></i>
        <i class="fa-solid fa-close icon-close"></i>
      </div>
    </div>
`;
  document.body.insertAdjacentHTML("beforeend", html);
}

let index = 0;
document.body.addEventListener("click", function (e) {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-img img");
  let modalSrc = modalImg.getAttribute("src");
  index = [...imgs].findIndex((item) => item.getAttribute("src") === modalSrc);
  if (e.target.matches(".modal")) {
    modal.parentNode.removeChild(modal);
  } else if (e.target.matches(".icon-close")) {
    modal.parentNode.removeChild(modal);
  } else if (e.target.matches(".icon-next")) {
    index++;
    if (index >= imgs.length) {
      index = 0;
    }
    renderModal(modalImg, index);
  } else if (e.target.matches(".icon-prev")) {
    index--;
    if (index < 0) {
      index = imgs.length - 1;
    }
    renderModal(modalImg, index);
  }
});

function renderModal(modalImg, index) {
  modalImg.setAttribute("src", imgs[index].getAttribute("src"));
}

//header-fixed

const progress = document.querySelector(".progress");

function debounce(fn, ms) {
  let timer;

  return function () {
    // Nhận các đối số
    const args = arguments;
    const context = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, ms);
  };
}

window.addEventListener("scroll", debounce(handleScroll, 20));

function handleScroll() {
  headerHeight = header.offsetHeight;
  pageY = window.pageYOffset;
  if (pageY >= headerHeight) {
    header && header.classList.add("is-fixed");
    document.body.style = `padding-top: ${headerHeight}px;`;
  } else {
    header && header.classList.remove("is-fixed");
    document.body.style = `padding-top: 0px;`;
  }
}

//scroll
window.addEventListener("scroll", handlerScroll);
function handlerScroll() {
  const windowTop = window.pageYOffset;
  console.log(windowTop);
  [...imgs].forEach((item) => {
    if (windowTop >= item.offsetTop - item.offsetHeight / 2) {
      item.classList.add("is-showed");
    } else {
      item.classList.remove("is-showed");
    }
  });
}

//progress

window.addEventListener("scroll", handleProgress);
function handleProgress() {
  const scrollTop = window.pageYOffset;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const ratioScroll = (scrollTop / scrollHeight) * 100;
  progress.style.width = `${ratioScroll}%`;
}
