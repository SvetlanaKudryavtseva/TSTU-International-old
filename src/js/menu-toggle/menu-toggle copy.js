const menuToggle = document.getElementById ('menu-toggle');
const sitemapToggle = document.getElementById ('sitemap-toggle');

function sitemap() {
    const s = document.getElementById("sitemap");
    if (s.style.display === "block") {
      s.style.display = "none";
    } else {
      s.style.display = "block";
    }
  }

menuToggle.onclick = function() {
    menuToggle.classList.toggle('active');
    sitemap;

}




