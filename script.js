/* PERSONNALISATION : modifiez les valeurs ci-dessous. */
const WEDDING = {
  firstName: "ARIDI GLOIRE",
  secondName: "AMURI VANESSA",
  // Format obligatoire : AAAA-MM-JJTHH:MM:SS. Utilisez l'heure locale du lieu du mariage.
  dateTime: "2027-06-19T14:00:00",
  dateLabel: "Samedi 19 juin 2027",
  venueName: "Nom de la salle",
  address: "Adresse de la salle, ville",
  mapQuery: "Nom de la salle, adresse, ville",
  rsvpDeadline: "1er mai 2027",
  rsvpUrl: "https://forms.google.com/",
  hashtag: "ARIDI ET AMURI"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const initials = `${WEDDING.firstName.trim().charAt(0)} & ${WEDDING.secondName.trim().charAt(0)}`;
const couple = `${WEDDING.firstName} & ${WEDDING.secondName}`;

$$("[data-name1]").forEach(el => el.textContent = WEDDING.firstName);
$$("[data-name2]").forEach(el => el.textContent = WEDDING.secondName);
$$("[data-couple]").forEach(el => { el.replaceChildren(document.createTextNode(WEDDING.firstName + " ")); const amp = document.createElement("i"); amp.textContent = "&"; el.append(amp, document.createTextNode(" " + WEDDING.secondName)); });
$$("[data-date]").forEach(el => el.textContent = WEDDING.dateLabel);
$$("[data-initials]").forEach(el => el.textContent = initials);
$$("[data-venue]").forEach(el => el.textContent = WEDDING.venueName);
$$("[data-address]").forEach(el => el.textContent = WEDDING.address);
$$("[data-rsvp-deadline]").forEach(el => el.textContent = WEDDING.rsvpDeadline);
$$("[data-hashtag]").forEach(el => el.textContent = WEDDING.hashtag);
$("#rsvpButton").href = WEDDING.rsvpUrl;
const mapQuery = encodeURIComponent(WEDDING.mapQuery);
$("#mapFrame").src = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
$("#directions").href = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
document.title = `Notre Grand Jour — ${couple}`;

const opening = $("#opening");
const envelopeWrap = $("#envelopeWrap");
const openButton = $("#openInvitation");
const mainContent = $("#mainContent");
document.body.classList.add("locked");
let hasOpened = false;
function openInvitation() {
  if (hasOpened) return;
  hasOpened = true;
  envelopeWrap.classList.add("is-unsealed");
  openButton.disabled = true;
  openButton.textContent = "Avec tout notre amour…";
  window.setTimeout(() => {
    mainContent.classList.remove("hidden");
    opening.classList.add("is-opening");
    document.body.classList.remove("locked");
    window.setTimeout(() => {
      opening.remove();
      observeReveals();
      updateCountdown();
    }, 1200);
  }, 1350);
}
openButton.addEventListener("click", openInvitation);

function observeReveals() {
  const revealEls = $$(".reveal");
  const headings = $$(".word-reveal");
  headings.forEach(heading => {
    const words = heading.textContent.trim().split(/\s+/);
    heading.textContent = "";
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      span.style.transitionDelay = `${index * 110}ms`;
      heading.append(span);
    });
  });
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach(el => el.classList.add("is-visible"));
    headings.forEach(el => el.classList.add("words-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealEls.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 3, 2) * 90}ms`; observer.observe(el); });
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("words-visible");
        headingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  headings.forEach(el => headingObserver.observe(el));
}

function updateCountdown() {
  const target = new Date(WEDDING.dateTime).getTime();
  const now = Date.now();
  let remaining = Math.max(0, target - now);
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000); remaining %= 60000;
  const seconds = Math.floor(remaining / 1000);
  const values = {days, hours, minutes, seconds};
  Object.entries(values).forEach(([key, value]) => {
    const el = document.getElementById(key === "days" ? "days2" : `${key}2`);
    if (el) el.textContent = key === "days" ? String(value).padStart(3, "0") : String(value).padStart(2, "0");
  });
  // Compte à rebours dans l'accueil, ajouté dynamiquement pour garder les valeurs centralisées.
  const hero = $(".hero-content");
  if (hero && !$("#heroCountdown")) {
    const count = document.createElement("div");
    count.id = "heroCountdown";
    count.className = "countdown reveal";
    count.setAttribute("aria-label", "Compte à rebours avant le mariage");
    count.innerHTML = '<div><strong id="days">000</strong><span>Jours</span></div><i></i><div><strong id="hours">00</strong><span>Heures</span></div><i></i><div><strong id="minutes">00</strong><span>Minutes</span></div><i></i><div><strong id="seconds">00</strong><span>Secondes</span></div>';
    const date = $(".hero-date", hero);
    date.insertAdjacentElement("afterend", count);
    count.style.margin = "0 auto 30px";
    count.style.maxWidth = "410px";
    count.querySelectorAll("span").forEach(s => { s.style.color = "#f8e8dc"; });
    count.querySelectorAll("i").forEach(s => { s.style.background = "#ffffff70"; });
    count.classList.add("is-visible");
  }
  ["days", "hours", "minutes", "seconds"].forEach(key => {
    const el = document.getElementById(key);
    if (el) el.textContent = key === "days" ? String(values[key]).padStart(3, "0") : String(values[key]).padStart(2, "0");
  });
}
let countdownTimer;
function startCountdown() {
  updateCountdown();
  clearInterval(countdownTimer);
  countdownTimer = setInterval(updateCountdown, 1000);
}
openButton.addEventListener("click", () => window.setTimeout(startCountdown, 1400));

// Draw the story timeline as it enters the viewport.
function updateTimeline() {
  const timeline = $(".timeline");
  if (!timeline) return;
  const rect = timeline.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const progress = Math.min(1, Math.max(0, (viewport * .72 - rect.top) / (rect.height + viewport * .25)));
  timeline.style.setProperty("--timeline-progress", progress);
}
window.addEventListener("scroll", updateTimeline, {passive:true});
window.addEventListener("resize", updateTimeline);
