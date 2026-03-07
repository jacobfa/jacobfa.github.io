var validPages = ["home", "publications", "personal"];

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function showPage(pagename) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active from all tab links
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the selected tab
  var el = document.getElementById(pagename);
  if (el) el.style.display = "block";

  // Mark the matching nav link active
  for (i = 0; i < tablinks.length; i++) {
    var oc = tablinks[i].getAttribute("onclick") || "";
    if (oc.indexOf("'" + pagename + "'") !== -1) {
      tablinks[i].className += " active";
    }
  }
}

function openpage(evt, pagename) {
  showPage(pagename);
  history.pushState({ page: pagename }, "", "#" + pagename);

  // Close mobile menu if open
  var scr = window.matchMedia("(max-width: 600px)");
  if (scr.matches) {
    document.getElementById("myTopnav").className = "topnav";
  }
}

// Back / forward button support
window.addEventListener("popstate", function(e) {
  var page = (e.state && e.state.page) ? e.state.page : "home";
  showPage(page);
});

// On initial page load, honour the hash or default to home
window.addEventListener("DOMContentLoaded", function() {
  var hash = window.location.hash.replace("#", "");
  var page = validPages.indexOf(hash) !== -1 ? hash : "home";
  history.replaceState({ page: page }, "", "#" + page);
  showPage(page);
});
