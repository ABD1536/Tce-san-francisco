/* ==========================================================================
   TCE INFLUENCER AGENCY — INTERACTIVE ENGINE & LIVE WORLD CLOCKS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Footer Clocks for 5 Global Office Locations
  const updateFooterClocks = () => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };

    const timeZones = {
      clockDubai: 'Asia/Dubai',
      clockMumbai: 'Asia/Kolkata',
      clockLondon: 'Europe/London',
      clockDelaware: 'America/New_York',
      clockHongKong: 'Asia/Hong_Kong'
    };

    Object.keys(timeZones).forEach(clockId => {
      const el = document.getElementById(clockId);
      if (el) {
        try {
          const timeStr = new Date().toLocaleTimeString('en-US', {
            timeZone: timeZones[clockId],
            ...options
          });
          el.textContent = timeStr;
        } catch (e) {
          // Fallback if timezone string differs
        }
      }
    });
  };

  updateFooterClocks();
  setInterval(updateFooterClocks, 10000);

  // 2. Mobile Responsive Nav Menu Toggle
  const navMobileBtn = document.getElementById('navMobileBtn');
  const navLinks = document.getElementById('navLinks');

  if (navMobileBtn && navLinks) {
    navMobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = navMobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // 3. Enterprise Contact Form Flows
  const baseFields = [
    ["Full name", "text", "Jane Smith", "half", true],
    ["Email", "email", "jane@company.com", "half", true],
    ["Organization", "text", "Company, publication, or creator name", "half", true],
    ["Location", "text", "City, country", "half", false],
    ["Message", "textarea", "Briefly tell us what you need.", "full", false]
  ];

  const flows = {
    brand: {
      title: "Speak to a Campaign Expert",
      submit: "Get a Custom Proposal",
      section: "Campaign details",
      fields: [
        ["Campaign budget", "select", ["Select budget", "$10k-$25k", "$25k-$50k", "$50k-$100k", "$100k+"], "half", true],
        ["Target markets", "text", "US, UAE, UK, India...", "half", false],
        ["Timeline", "select", ["Select timeline", "ASAP", "30 days", "This quarter", "Planning ahead"], "full", false]
      ]
    },
    creator: {
      title: "Apply to Join TCE",
      submit: "Submit Creator Profile",
      section: "Creator details",
      fields: [
        ["Primary platform", "select", ["Select platform", "TikTok", "Instagram", "YouTube", "LinkedIn", "Other"], "half", true],
        ["Profile link", "url", "https://instagram.com/...", "half", true],
        ["Audience size", "select", ["Select audience size", "10k-50k", "50k-250k", "250k-1M", "1M+"], "full", false]
      ]
    },
    partner: {
      title: "Discuss a Partnership",
      submit: "Start Conversation",
      section: "Partnership details",
      fields: [
        ["Partnership type", "select", ["Select type", "Platform", "Agency", "Technology", "Media", "Investor", "Other"], "half", true],
        ["Markets", "text", "Relevant markets", "half", false],
        ["Timeline", "select", ["Select timeline", "This month", "This quarter", "Exploratory"], "full", false]
      ]
    },
    media: {
      title: "Reach the Media Team",
      submit: "Send Media Inquiry",
      section: "Media details",
      fields: [
        ["Deadline", "text", "When do you need a response?", "half", false],
        ["Format", "select", ["Select format", "Interview", "Commentary", "Podcast", "Speaking", "Press request"], "half", false]
      ]
    },
    careers: {
      title: "Explore Careers at TCE",
      submit: "Submit Interest",
      section: "Career details",
      fields: [
        ["Area of interest", "select", ["Select area", "Sales", "Campaign strategy", "Creator success", "Operations", "Data and AI", "Other"], "half", true],
        ["LinkedIn", "url", "https://linkedin.com/in/...", "half", false]
      ]
    }
  };

  const fieldsContainer = document.querySelector("#dynamicFields");
  const formTitle = document.querySelector("#formTitle");
  const submitBtn = document.querySelector("#submitBtn");
  const tabs = document.querySelectorAll(".tab-btn");

  function renderFlow(flowName) {
    if (!fieldsContainer || !formTitle || !submitBtn) return;
    const flow = flows[flowName];
    if (!flow) return;
    formTitle.textContent = flow.title;
    submitBtn.textContent = flow.submit;
    fieldsContainer.innerHTML = "";

    const sectionDiv = document.createElement("div");
    sectionDiv.className = "f-divider";
    sectionDiv.textContent = flow.section;

    [...baseFields, sectionDiv, ...flow.fields].forEach((item) => {
      if (item instanceof HTMLElement) {
        fieldsContainer.appendChild(item);
        return;
      }

      const [labelText, type, placeholder, size, isRequired] = item;
      const fieldCell = document.createElement("div");
      fieldCell.className = size === "full" ? "f-cell full" : "f-cell";

      const id = labelText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = labelText + (isRequired ? " *" : "");

      let control;
      if (type === "select") {
        control = document.createElement("select");
        placeholder.forEach((text, index) => {
          const option = document.createElement("option");
          option.value = index ? text : "";
          option.textContent = text;
          control.appendChild(option);
        });
      } else if (type === "textarea") {
        control = document.createElement("textarea");
        control.placeholder = placeholder;
      } else {
        control = document.createElement("input");
        control.type = type;
        control.placeholder = placeholder;
      }

      control.id = id;
      control.name = id;
      if (isRequired) {
        control.required = true;
      }

      fieldCell.append(label, control);
      fieldsContainer.appendChild(fieldCell);
    });
  }

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderFlow(tab.dataset.flow);
      });
    });
  }

  const enterpriseForm = document.querySelector("#enterpriseForm");
  const newsletterForm = document.querySelector("#newsletterForm");
  const successModal = document.querySelector("#successModal");
  const closeModalBtn = document.querySelector("#closeModalBtn");

  if (enterpriseForm) {
    enterpriseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset custom validity error messages
      const inputs = enterpriseForm.querySelectorAll("input, select, textarea");
      inputs.forEach(input => input.setCustomValidity(""));

      // HTML5 Required check
      if (!enterpriseForm.checkValidity()) {
        enterpriseForm.reportValidity();
        return;
      }

      // Email Format Regex Check
      const emailInput = enterpriseForm.querySelector('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        emailInput.setCustomValidity("Please enter a valid email address.");
        emailInput.reportValidity();
        return;
      }

      // Show success modal ONLY on valid submission
      if (successModal) {
        successModal.classList.add("active");
      }
      const activeFlow = document.querySelector(".tab-btn.active")?.dataset.flow || "brand";
      if (submitBtn) submitBtn.textContent = "Request Received";
      setTimeout(() => renderFlow(activeFlow), 2500);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        emailInput.setCustomValidity("Please enter a valid email address.");
        emailInput.reportValidity();
        return;
      }
      alert("Thank you for subscribing to our creator economy briefing!");
      newsletterForm.reset();
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener("click", () => {
      successModal.classList.remove("active");
    });
  }

  // 4. Region Selector Tabs
  const regionTabBtns = document.querySelectorAll(".region-tab-btn");
  const regionTitle = document.querySelector("#regionTitle");
  const regionDesc = document.querySelector("#regionDesc");

  const regionData = {
    global: { title: "GLOBAL REACH (160+ MARKETS)", desc: "Direct execution across North America, Europe, MENA, APAC, and LATAM with 1M+ vetted creators." },
    apac: { title: "APAC REGIONAL HUB", desc: "Dedicated agency teams in Hong Kong, Tokyo, and Singapore managing APAC creator campaigns." },
    emea: { title: "EMEA REGIONAL HUB", desc: "London & Dubai offices executing multi-lingual European and Middle Eastern creator activations." },
    americas: { title: "AMERICAS REGIONAL HUB", desc: "New York, San Francisco, and Delaware operations managing US and LATAM campaigns." }
  };

  regionTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      regionTabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.dataset.region;
      if (regionData[key] && regionTitle && regionDesc) {
        regionTitle.textContent = regionData[key].title;
        regionDesc.textContent = regionData[key].desc;
      }
    });
  });

  // 5. FAQ Accordion Toggle
  window.toggleFaqRef = function(btn) {
    const card = btn.closest('.faq-ref-card');
    if (!card) return;
    const isOpen = card.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const icon = btn.querySelector('.faq-ref-badge i');
    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-minus' : 'fa-solid fa-plus';
    }
  };

  renderFlow("brand");

  // 6. Lenis Smooth Scroll Engine
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll for internal # links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -60, duration: 1.2 });
          }
        }
      });
    });
  }
});
