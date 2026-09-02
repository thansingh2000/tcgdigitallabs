/* TCG Digital Labs — site behavior */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CATEGORIES = {
    web: "Web & Software",
    mobile: "Mobile",
    ai: "AI & Automation",
    design: "Design",
    growth: "Growth",
    cloud: "Cloud",
    consulting: "Consulting"
  };

  const SERVICES = [
    { id: "web-development", name: "Web Development", category: "web", featured: true, icon: "bi-window-sidebar", short: "High-performance websites engineered for speed, conversion and scale.", long: "Marketing sites, product sites and content platforms built on a modern stack — semantic HTML, custom CSS, and production JavaScript." },
    { id: "custom-website", name: "Custom Website", category: "web", featured: false, icon: "bi-palette2", short: "Bespoke websites with no template look and a brand-first experience.", long: "We design and build original interfaces that match how your business actually sells, onboards and tells its story." },
    { id: "web-app", name: "Web Applications", category: "web", featured: false, icon: "bi-layers", short: "Secure, fast web apps for operations, customers and internal teams.", long: "Dashboards, portals and workflow products with authentication, APIs and clean UX — not bloated admin templates." },
    { id: "software-development", name: "Software Development", category: "web", featured: true, icon: "bi-code-slash", short: "Custom digital products tailored to how your business actually works.", long: "From MVPs to enterprise systems, we engineer software that is maintainable, documented and ready to grow." },
    { id: "mobile-apps", name: "Mobile App Development", category: "mobile", featured: true, icon: "bi-phone", short: "Native-quality mobile experiences for modern users.", long: "Product-minded mobile apps with thoughtful UX, performance budgets and backend integration." },
    { id: "android-ios", name: "Android & iOS", category: "mobile", featured: false, icon: "bi-apple", short: "Platform-aware apps for both major mobile ecosystems.", long: "We plan, design and ship Android and iOS experiences that feel at home on each platform." },
    { id: "wordpress-cms", name: "WordPress & CMS", category: "web", featured: true, icon: "bi-wordpress", short: "Flexible CMS builds your team can actually update.", long: "Custom WordPress themes, Gutenberg-ready layouts and editorial workflows without plugin chaos." },
    { id: "ecommerce", name: "E-commerce", category: "web", featured: true, icon: "bi-bag-check", short: "Stores designed to convert, not just look busy.", long: "Catalog, checkout, payments and post-purchase flows with performance and analytics built in." },
    { id: "uiux", name: "UI/UX Design", category: "design", featured: true, icon: "bi-vector-pen", short: "Interfaces that feel inevitable — clear, branded, conversion-aware.", long: "Research, wireframes, design systems and high-fidelity UI for web and mobile products." },
    { id: "ai-automation", name: "AI & Automation", category: "ai", featured: true, icon: "bi-cpu", short: "Smarter workflows that remove repetitive work from your team.", long: "We map processes, then automate them with reliable tooling — not experimental demos." },
    { id: "ai-solutions", name: "AI Solutions", category: "ai", featured: false, icon: "bi-stars", short: "Practical AI features inside the products your customers already use.", long: "Assistants, ranking, summarization and decision support designed around real business outcomes." },
    { id: "ai-tools", name: "AI Tool Development", category: "ai", featured: false, icon: "bi-tools", short: "Custom AI tools for internal teams and customer-facing products.", long: "From prompt architecture to UI, we ship tools people will actually open every day." },
    { id: "ai-chatbots", name: "AI Chatbots", category: "ai", featured: false, icon: "bi-chat-dots", short: "Conversational interfaces that resolve questions and capture demand.", long: "Support, sales and onboarding bots grounded in your content — with human handoff when it matters." },
    { id: "ai-integration", name: "AI Integration", category: "ai", featured: false, icon: "bi-plugin", short: "Bring OpenAI and modern models into existing software safely.", long: "API design, guardrails, logging and evaluation so AI is an advantage — not a liability." },
    { id: "business-automation", name: "Business Automation", category: "ai", featured: false, icon: "bi-diagram-3", short: "Connect tools and eliminate copy-paste work across the company.", long: "Workflows spanning CRM, email, ops and reporting with clear owners and fallbacks." },
    { id: "digital-marketing", name: "Digital Marketing", category: "growth", featured: true, icon: "bi-graph-up-arrow", short: "Campaigns that compound — not one-off bursts of noise.", long: "Positioning, funnels and channel strategy tied to the product we build for you." },
    { id: "smm", name: "Social Media Marketing", category: "growth", featured: true, icon: "bi-broadcast", short: "Social systems that build brand and pipeline together.", long: "Content rhythms, creative direction and paid amplification for the platforms that matter." },
    { id: "social-management", name: "Social Media Management", category: "growth", featured: false, icon: "bi-calendar4-week", short: "Consistent presence without the last-minute scramble.", long: "Calendars, community response and reporting your leadership can actually read." },
    { id: "seo", name: "SEO", category: "growth", featured: true, icon: "bi-search", short: "Technical and content SEO treated as a product decision.", long: "Architecture, Core Web Vitals, content clusters and measurement — not keyword stuffing." },
    { id: "google-ads", name: "Google Ads", category: "growth", featured: false, icon: "bi-badge-ad", short: "Paid search that respects unit economics.", long: "Account structure, creative testing and landing-page alignment so spend has a job." },
    { id: "content-creative", name: "Content & Creative", category: "growth", featured: false, icon: "bi-camera-reels", short: "Stories, motion and copy that sound like your brand.", long: "Campaign creative, landing copy and visual systems that match a premium product." },
    { id: "cloud-api", name: "Cloud & API Solutions", category: "cloud", featured: true, icon: "bi-cloud-arrow-up", short: "APIs and cloud architecture that stay out of the way.", long: "Integrations, Azure and Google Cloud setups, and APIs designed for the next product — not just the last one." },
    { id: "api-integration", name: "API Integration", category: "cloud", featured: false, icon: "bi-braces-asterisk", short: "Connect payments, CRM, data and third-party platforms cleanly.", long: "We design contracts, handle auth, and keep integrations observable." },
    { id: "cloud", name: "Cloud Solutions", category: "cloud", featured: false, icon: "bi-hdd-network", short: "Hosting, environments and scale without surprise invoices.", long: "Sensible cloud architecture with environments, backups and a path to grow." },
    { id: "maintenance", name: "Website Maintenance", category: "consulting", featured: false, icon: "bi-shield-check", short: "Keep the product fast, secure and current after launch.", long: "Updates, monitoring, small iterations and a clear monthly cadence." },
    { id: "consulting", name: "Technology Consulting", category: "consulting", featured: true, icon: "bi-compass", short: "Stack, roadmap and make-vs-buy decisions with adult supervision.", long: "We help founders and operators choose the right architecture before they spend the budget twice." }
  ];

  const PROJECTS = [
    { id: "northline", name: "Northline Analytics", category: "Web", tags: ["SaaS", "Dashboards", "React"], image: "assets/images/work-saas-dashboard.jpg", desc: "A multi-tenant analytics workspace with live KPIs, alerting and role-aware views." },
    { id: "careos", name: "CareOS Platform", category: "Web", tags: ["Healthcare", "HIPAA-minded", ".NET"], image: "assets/images/work-healthcare.jpg", desc: "Clinical operations portal for scheduling, records snapshots and care-team coordination." },
    { id: "atelier", name: "Atelier Market", category: "Growth", tags: ["E-commerce", "Checkout", "SEO"], image: "assets/images/work-ecommerce.jpg", desc: "A conversion-led storefront with merchandising, search and post-purchase flows." },
    { id: "lumen", name: "Lumen Assistant", category: "AI", tags: ["OpenAI", "Chat", "Automation"], image: "assets/images/work-ai-assistant.jpg", desc: "An internal AI copilot that drafts, routes and summarizes across the ops stack." },
    { id: "vertex", name: "Vertex Institutional", category: "Web", tags: ["Brand", "CMS", "Performance"], image: "assets/images/work-business-website.jpg", desc: "A flagship corporate site with modular pages, motion and a serious editorial system." },
    { id: "pulse", name: "Pulse Field App", category: "Mobile", tags: ["iOS", "Android", "Firebase"], image: "assets/images/work-mobile-app.jpg", desc: "A field-ready mobile product for check-ins, tasks and offline-tolerant reporting." }
  ];

  window.TCG = {
    SERVICES,
    CATEGORIES,
    PROJECTS,
    renderServiceCards,
    renderServiceCatalog,
    renderProjects
  };

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function serviceCard(s) {
    return el(`
      <article class="service-card reveal" id="card-${s.id}">
        <div class="ico" aria-hidden="true"><i class="bi ${s.icon}"></i></div>
        <span class="cat-label">${CATEGORIES[s.category]}</span>
        <h3>${s.name}</h3>
        <p class="short">${s.short}</p>
        <p class="long">${s.long}</p>
        <a class="more" href="services.html#${s.id}">Explore <i class="bi bi-arrow-up-right"></i></a>
      </article>`);
  }

  function renderServiceCards(root, featuredOnly) {
    if (!root) return;
    const list = featuredOnly ? SERVICES.filter((s) => s.featured) : SERVICES;
    root.innerHTML = "";
    list.forEach((s) => root.appendChild(serviceCard(s)));
  }

  function renderServiceCatalog(root) {
    if (!root) return;
    const order = ["web", "mobile", "ai", "design", "growth", "cloud", "consulting"];
    root.innerHTML = "";
    order.forEach((cat) => {
      const items = SERVICES.filter((s) => s.category === cat);
      if (!items.length) return;
      const group = el(`<section class="service-group" id="cat-${cat}"></section>`);
      group.innerHTML = `<div class="section-head reveal"><p class="eyebrow">${CATEGORIES[cat]}</p><h2>${CATEGORIES[cat]}</h2></div>`;
      const grid = el(`<div class="service-grid"></div>`);
      items.forEach((s) => {
        const card = serviceCard(s);
        card.id = s.id;
        grid.appendChild(card);
      });
      group.appendChild(grid);
      root.appendChild(group);
    });
  }

  function projectCard(p, compact) {
    return el(`
      <article class="work-card reveal" data-category="${p.category}">
        <div class="work-visual">
          <img src="${p.image}" alt="${p.name} product visual" loading="lazy" width="720" height="420">
          <div class="work-overlay"><span class="pill">${p.category}</span></div>
        </div>
        <div class="work-body">
          <h3>${p.name}</h3>
          <p class="short">${p.desc}</p>
          <div>${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <a class="more mt-3 d-inline-flex" href="work.html#${p.id}">View Project <i class="bi bi-arrow-up-right"></i></a>
        </div>
      </article>`);
  }

  function renderProjects(root, limit) {
    if (!root) return;
    root.innerHTML = "";
    const list = typeof limit === "number" ? PROJECTS.slice(0, limit) : PROJECTS;
    list.forEach((p) => {
      const card = projectCard(p);
      card.id = p.id;
      const wrap = el(`<div class="col-md-6 col-xl-4"></div>`);
      wrap.appendChild(card);
      root.appendChild(wrap);
    });
  }

  function initNav() {
    const nav = document.getElementById("siteNav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const page = (document.body.getAttribute("data-page") || "").toLowerCase();
    document.querySelectorAll(".nav-links a[data-nav]").forEach((a) => {
      const on = a.getAttribute("data-nav") === page;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((n) => io.observe(n));
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const run = (el) => {
      const target = Number(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => io.observe(c));
  }

  function initParallax() {
    const stage = document.querySelector("[data-parallax]");
    if (!stage || reduceMotion) return;
    const layers = stage.querySelectorAll("[data-depth]");
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((layer) => {
        const d = parseFloat(layer.getAttribute("data-depth") || "0.2");
        layer.style.transform = `translate3d(${x * d * 36}px, ${y * d * 24}px, 0)`;
      });
    });
    stage.addEventListener("mouseleave", () => {
      layers.forEach((layer) => { layer.style.transform = ""; });
    });
  }

  function initFilters() {
    const bar = document.querySelector("[data-filters]");
    if (!bar) return;
    const cards = document.querySelectorAll(".work-card");
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      bar.querySelectorAll("[data-filter]").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      const f = btn.getAttribute("data-filter");
      cards.forEach((c) => {
        const show = f === "all" || c.getAttribute("data-category") === f;
        c.classList.toggle("is-hidden", !show);
        const col = c.closest("[class*='col-']");
        if (col) col.style.display = show ? "" : "none";
      });
    });
  }

  function initForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const success = document.getElementById("formSuccess");

    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const phoneOk = (v) => !v || /^[+0-9()\s-]{7,18}$/.test(v);

    const setError = (id, msg) => {
      const field = form.querySelector("#" + id);
      const err = form.querySelector(`[data-error-for="${id}"]`);
      if (field) field.classList.toggle("is-invalid", Boolean(msg));
      if (err) err.textContent = msg || "";
      if (field && msg) field.setAttribute("aria-invalid", "true");
      else if (field) field.removeAttribute("aria-invalid");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const company = form.company.value.trim();
      const service = form.service.value;
      const budget = form.budget.value.trim();
      const message = form.message.value.trim();

      setError("name", name.length < 2 ? "Please enter your name." : "");
      setError("email", !emailOk(email) ? "Enter a valid email address." : "");
      setError("phone", !phoneOk(phone) ? "Enter a valid phone number." : "");
      setError("service", !service ? "Select a service." : "");
      setError("message", message.length < 20 ? "Tell us a bit more (at least 20 characters)." : "");

      if (name.length < 2 || !emailOk(email) || !phoneOk(phone) || !service || message.length < 20) ok = false;
      if (!ok) {
        const first = form.querySelector(".is-invalid");
        if (first) first.focus();
        return;
      }

      const lines = [
        "Hello TCG Digital Labs,",
        "",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (phone || "—"),
        "Company: " + (company || "—"),
        "Service: " + service,
        "Budget: " + (budget || "Not sure yet"),
        "Message: " + message
      ];
      const waUrl = "https://wa.me/916232948883?text=" + encodeURIComponent(lines.join("\n"));
      const fallback = document.getElementById("waFallback");
      if (fallback) fallback.setAttribute("href", waUrl);
      window.open(waUrl, "_blank");

      if (success) {
        success.classList.add("is-visible");
        success.focus();
      }
    });
  }

  function initMagnetic() {
    if (reduceMotion) return;
    document.querySelectorAll(".btn-primary, .btn-glow").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
        btn.style.transform = "translate(" + x + "px, " + (y - 2) + "px)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  function closeOffcanvasOnLink() {
    document.querySelectorAll("#navOffcanvas a").forEach((a) => {
      a.addEventListener("click", () => {
        const oc = document.getElementById("navOffcanvas");
        if (!oc || typeof bootstrap === "undefined") return;
        const inst = bootstrap.Offcanvas.getInstance(oc);
        if (inst) inst.hide();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    renderServiceCards(document.getElementById("serviceCards"), true);
    renderServiceCatalog(document.getElementById("serviceCatalog"));
    renderProjects(document.getElementById("projectGrid"), document.getElementById("projectGrid")?.hasAttribute("data-limit") ? 6 : undefined);
    initParallax();
    initCounters();
    initFilters();
    initForm();
    initMagnetic();
    closeOffcanvasOnLink();
    initReveal();
  });
})();
