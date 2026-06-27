import projects from "./img-path.js";

let currentProjectKey = "";
let currentIndex = 0;
const getCurrentProject = () => projects[currentProjectKey];
const getCurrentImages = () => getCurrentProject()?.images || [];
const modal = document.getElementById("modal");
const modalCont = document.querySelector(".modal_cont");
const currentImg = document.getElementById("currentImg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

// How I Work 타이틀 바운스 효과
const howIWorkTitle = document.querySelector(".how_i_work .title");
const titleSpans = document.querySelectorAll(".how_i_work .title span");

if (howIWorkTitle && titleSpans.length) {
  const titleObserver = new IntersectionObserver(
    ([entry]) => {
      titleSpans.forEach((span) => {
        span.classList.toggle("bounce", entry.isIntersecting);
      });
    },
    { threshold: 0.5 }
  );

  titleObserver.observe(howIWorkTitle);
}

const showImage = () => {
  const project = getCurrentProject();
  const images = getCurrentImages();
  if (images.length === 0) return;

  const src = images[currentIndex];
  const wideType = /pc-/.test(src) ? "first" : (project?.wideType ?? null);

  currentImg.src = src;
  modalCont.scrollTop = 0;
  modalCont.classList.toggle("wide_type_first", wideType === "first");
  modalCont.classList.toggle("wide_type_second", wideType === "second");
  closeBtn.classList.toggle("position", wideType === "second");
};

// 버튼 클릭시
const openProjectModal = (projectKey) => {
  const project = projects[projectKey];
  if (!project) return;

  currentProjectKey = projectKey;
  currentIndex = 0;

  const images = project.images;
  const hideNav = images.length <= 1;

  prevBtn.classList.toggle("display", hideNav);
  nextBtn.classList.toggle("display", hideNav);
  modal.classList.remove("remove");

  showImage();
};

Object.keys(projects).forEach((projectKey) => {
  const button = document.getElementById(projectKey);
  if (!button) return;
  button.onclick = () => openProjectModal(projectKey);
});

// 이전, 다음 버튼 클릭시
prevBtn.onclick = () => {
  const images = getCurrentImages();
  if (images.length === 0) return;

  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
};

nextBtn.onclick = () => {
  const images = getCurrentImages();
  if (images.length === 0) return;

  currentIndex = (currentIndex + 1) % images.length;
  showImage();
};

// 닫기 버튼, dim 클릭
const closeModal = () => modal.classList.add("remove");
closeBtn.onclick = closeModal;
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
