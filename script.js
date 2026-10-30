// ===== 영상 팝업 =====
const videoModal = document.getElementById("videoModal");
const portfolioVideo = document.getElementById("portfolioVideo");
const portfolioImage = document.getElementById("portfolioImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");
const videoError = document.getElementById("videoError");
const videoErrorPath = document.getElementById("videoErrorPath");
let previousFocus = null;
let currentVideoPath = "";   // 지금 재생하려는 영상 경로
let triedFallback = false;   // 파일명 인코딩 방식(NFD)으로 다시 시도했는지

// 영상 불러오기 (한글·띄어쓰기 경로는 encodeURI로 안전하게 변환)
function loadVideo(path) {
  portfolioVideo.src = encodeURI(path);
  portfolioVideo.load();
  portfolioVideo.play().catch(() => {
    // 자동 재생이 막히면 영상의 재생 버튼을 누르면 됩니다
  });
}

// 작품을 클릭하면 팝업 열기
document.querySelectorAll(".portfolio-card").forEach((card) => {
  card.addEventListener("click", () => {
    const videoPath = card.dataset.video;   // 영상 작품
    const imagePath = card.dataset.image;   // 포스터 작품
    const title = card.dataset.title;

    previousFocus = card;

    modalTitle.textContent = title;
    modalDesc.textContent = card.dataset.desc || "";   // 포스터 설명
    modalDesc.hidden = !card.dataset.desc;
    videoError.hidden = true;
    videoErrorPath.textContent = "";

    // 이전 영상 정리
    portfolioVideo.pause();
    portfolioVideo.removeAttribute("src");
    portfolioVideo.load();
    portfolioImage.removeAttribute("src");

    if (imagePath) {
      // 포스터: 이미지 표시
      portfolioVideo.hidden = true;
      portfolioImage.alt = title;
      portfolioImage.src = imagePath;
      portfolioImage.hidden = false;
    } else if (videoPath) {
      // 영상: 재생 시도
      portfolioImage.hidden = true;
      portfolioVideo.hidden = false;
      currentVideoPath = videoPath;
      triedFallback = false;
      loadVideo(videoPath);
    } else {
      // 영상 파일이 등록되지 않은 작품: 안내 문구
      portfolioImage.hidden = true;
      portfolioVideo.hidden = true;
      videoError.hidden = false;
    }

    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeModal.focus();
  });
});

// 팝업 닫기 (영상 재생 중단)
function closeVideoModal() {
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");

  portfolioVideo.pause();
  portfolioVideo.removeAttribute("src");
  portfolioVideo.load();
  portfolioImage.removeAttribute("src");

  document.body.style.overflow = "";

  if (previousFocus) {
    previousFocus.focus();
  }
}

closeModal.addEventListener("click", closeVideoModal);

// 팝업 바깥을 클릭하면 닫기
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideoModal();
  }
});

// ESC 키로 닫기
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal.classList.contains("is-open")) {
    closeVideoModal();
  }
});

// 영상 로딩 오류 처리
portfolioVideo.addEventListener("error", () => {
  if (!portfolioVideo.getAttribute("src")) return;  // 닫을 때 생기는 신호는 무시

  // 맥에서 저장한 한글 파일명은 글자 조합 방식(NFD)이 달라 못 찾는 경우가 있어 한 번만 다시 시도
  const nfdPath = currentVideoPath.normalize("NFD");
  if (!triedFallback && nfdPath !== currentVideoPath) {
    triedFallback = true;
    loadVideo(nfdPath);
    return;
  }

  const code = portfolioVideo.error ? portfolioVideo.error.code : 0;
  console.error("영상 오류 코드 " + code + " / 경로: " + currentVideoPath);
  videoErrorPath.textContent = "찾는 파일: " + currentVideoPath + " (오류 코드 " + code + ")";
  videoError.hidden = false;
});

// ===== 썸네일을 불러오지 못했을 때: 원인을 확인할 수 있게 표시 =====
document.querySelectorAll(".thumbnail img").forEach((img) => {
  const box = img.closest(".thumbnail");

  const showError = () => {
    if (box.querySelector(".thumb-error")) return;
    const path = img.getAttribute("src");
    console.error("썸네일을 불러오지 못했습니다: " + path);   // F12 > Console에서 확인
    box.classList.add("no-thumb");
    const msg = document.createElement("span");
    msg.className = "thumb-error";
    msg.innerHTML = "썸네일을 불러오지 못했습니다<small></small>";
    msg.querySelector("small").textContent = path;           // 찾지 못한 파일 경로
    box.appendChild(msg);
  };

  const clearError = () => {
    box.classList.remove("no-thumb");
    const msg = box.querySelector(".thumb-error");
    if (msg) msg.remove();
  };

  img.addEventListener("error", showError);
  img.addEventListener("load", clearError);
  if (img.complete && img.naturalWidth === 0) showError();    // 이미 실패한 경우
});

// ===== 모바일 메뉴 =====
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
