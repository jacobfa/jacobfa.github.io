function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function openpage(evt, pagename, pushState) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(pagename).style.display = "block";

  // Mark the matching nav link active
  for (i = 0; i < tablinks.length; i++) {
    if (tablinks[i].getAttribute("onclick") &&
        tablinks[i].getAttribute("onclick").indexOf("'" + pagename + "'") !== -1) {
      tablinks[i].className += " active";
    }
  }

  // Update the URL hash (pushState = false when called from popstate/load)
  if (pushState !== false) {
    history.pushState({ page: pagename }, "", "#" + pagename);
  }

  // Close mobile menu if open
  var scr = window.matchMedia("(max-width: 600px)");
  if (scr.matches) {
    var nav = document.getElementById("myTopnav");
    if (nav.className !== "topnav") {
      nav.className = "topnav";
    }
  }
}

// Handle back/forward browser navigation
window.addEventListener("popstate", function(e) {
  var page = (e.state && e.state.page) ? e.state.page : "home";
  openpage(null, page, false);
});

// On initial load, read the hash or default to home
window.addEventListener("DOMContentLoaded", function() {
  var hash = window.location.hash.replace("#", "");
  var validPages = ["home", "publications", "personal"];
  var page = validPages.indexOf(hash) !== -1 ? hash : "home";
  // Replace current history entry so popstate works from the start
  history.replaceState({ page: page }, "", "#" + page);
  openpage(null, page, false);
});
