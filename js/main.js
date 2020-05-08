const sliderContainer = document.getElementById("slider-container");
const slide = document.getElementById("slide");
const thumbnails = document.getElementById("thumbnails");
const scroller = document.getElementById("scroller");
const thumbnailsWrapper = document.getElementsByClassName("thumbnails-wrapper")[0];

const slideImg = slide.querySelector("img");
const controlls = sliderContainer.querySelectorAll("div");
const scrollThumb = scroller.querySelectorAll("div")[0];

// Create an array <div> <img /> <div/> for thumbnail preview
for (let i = 1; i <= 32; i++) {
  const div = document.createElement("div");
  div.setAttribute("draggable", "true");
  const img = document.createElement("img");
  img.setAttribute("draggable", "true");
  img.setAttribute("src", "assets/img/slides/Nest Tracker App Presentation- Page-" + i + ".jpg");
  thumbnails.appendChild(div).appendChild(img);
}

const thumbnailItems = thumbnails.querySelectorAll("div");
//controll from slider
let current = 1;
function isOutside(pos) {
  if (pos > 32) {
    current = 1;
  }
  if (pos < 1) {
    current = 32;
  }
}
controlls[0].addEventListener("click", function () {
  current -= 1;
  isOutside(current);
  thumbnails.scrollLeft = (thumbnails.scrollWidth / 32) * current - thumbnails.scrollWidth / 32;
  // thumbnails.scrollLeft = Math.trunc(thumbnails.scrollWidth / 32) * current - Math.trunc(thumbnails.scrollWidth / 32);
  slideImg.setAttribute("src", "./assets/img/slides/Nest Tracker App Presentation- Page-" + current + ".jpg");
});

controlls[1].addEventListener("click", function () {
  current += 1;
  isOutside(current);
  thumbnails.scrollLeft = (thumbnails.scrollWidth / 32) * current - thumbnails.scrollWidth / 32;
  // thumbnails.scrollLeft = Math.trunc(thumbnails.scrollWidth / 32) * current - Math.trunc(thumbnails.scrollWidth / 32);
  slideImg.setAttribute("src", "./assets/img/slides/Nest Tracker App Presentation- Page-" + current + ".jpg");
});

// controll thumbnail moving
scrollThumb.ondragstart = function () {
  return false;
};

scrollThumb.onmousedown = function (e) {
  const shiftX = e.pageX - scrollThumb.getBoundingClientRect().left + thumbnailsWrapper.getBoundingClientRect().left;
  // moveAt(e);

  function moveAt(e) {
    const avalibleWidth = thumbnailsWrapper.getBoundingClientRect().width - scrollThumb.getBoundingClientRect().width;
    const left = e.clientX - shiftX;

    let scrollWidthThb = (left / thumbnails.scrollWidth) * 100000;
    if (left >= -2 && left <= avalibleWidth) {
      scrollThumb.style.left = left + "px";
      thumbnails.scrollLeft = scrollWidthThb * 1.1;
    }
  }
  document.onmousemove = function (e) {
    moveAt(e);
  };
  scrollThumb.onmouseup = function () {
    document.onmousemove = null;
    scrollThumb.onmouseup = null;
  };
  scrollThumb.onmouseleave = function () {
    document.onmousemove = null;
    scrollThumb.onmouseup = null;
  };
};
thumbnails.ondragstart = function () {
  return false;
};

thumbnails.onmousedown = function () {
  let pageX = 0;

  document.onmousemove = function (e) {
    if (pageX !== 0) {
      thumbnails.scrollLeft = thumbnails.scrollLeft + (pageX - e.pageX);
    }
    pageX = e.pageX;
  };

  thumbnails.onmouseup = function () {
    document.onmousemove = null;
    thumbnails.onmouseup = null;
  };
  thumbnails.onmouseleave = function () {
    document.onmousemove = null;
    thumbnails.onmouseup = null;
  };

  thumbnails.ondragstart = function () {
    return false;
  };
};

const coordsMouse = {
  x1: 0,
  y1: 0,
};
thumbnails.addEventListener("scroll", function () {
  const poportionThum = scrollThumb.getBoundingClientRect().width / 3;
  let controlThumbFromGallery = (thumbnails.scrollWidth * thumbnails.scrollLeft) / 100000 + 20;
  if (controlThumbFromGallery <= poportionThum) {
    controlThumbFromGallery -= poportionThum;
  }
  thumbnails.onmousemove = function (e) {
    (coordsMouse.x1 = e.clientX), (coordsMouse.y1 = e.clientY);
  };
  // if (
  //   coordsMouse.x1 > thumbnails.getBoundingClientRect().x &&
  //   coordsMouse.x1 < thumbnails.getBoundingClientRect().x + thumbnails.getBoundingClientRect().width &&
  //   coordsMouse.y1 > thumbnails.getBoundingClientRect().y &&
  //   coordsMouse.y1 < thumbnails.getBoundingClientRect().y + thumbnails.getBoundingClientRect().height
  // ) {

  const avalibleWidth = thumbnailsWrapper.getBoundingClientRect().width - scrollThumb.getBoundingClientRect().width;
  const left = controlThumbFromGallery * 0.9;
  if (left >= -2 && left <= avalibleWidth) {
    scrollThumb.style.left = left + "px";
  }
  // }
});

//fullscreenImg
// for (const thumb of thumbnailItems) {
for (let i = 0; i < thumbnailItems.length; i++) {
  let thumb = thumbnailItems[i];
  const img = thumb.querySelector("img");
  thumb.addEventListener("click", function (e) {
    const src = img.getAttribute("src");
    slideImg.setAttribute("src", src);
  });
}
slide.addEventListener("click", function () {
  sliderContainer.classList.toggle("full-screen");
});
