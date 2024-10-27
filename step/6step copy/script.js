function toggleDetail(detailId) {
    const detail = document.getElementById(detailId);
    if (detail.style.display === "none") {
      detail.style.display = "block";
    } else {
      detail.style.display = "none";
    }
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");
  }
  