/**
 * Chatbot Module
 * A lightweight predefined Q&A chatbot widget with Sandip's avatar.
 */

const CHAT_DATA = [
  {
    q: "Research Publications?",
    a: "Sandip published a peer-reviewed research paper in the *International Journal of Innovative Science and Research Technology (IJISRT, June 2026)* titled <strong>'Biosensor-Integrated Central Venous Catheters: An Innovation for Public Health to Prevent CLABSIs in the United States'</strong> (DOI: 10.38124/ijisrt/26jun1669).\n<a href='assets/IJISRT26JUN1669.pdf' download='Sandip_Nirmal_Research_Paper_IJISRT.pdf' target='_blank' class='chat-link'>Download Research Paper (PDF) ↗</a>"
  },
  {
    q: "English Proficiency?",
    a: "Sandip scored <strong>120 / 160 (Advanced / C1 Level)</strong> on the official Duolingo English Test (Literacy: 135, Production: 125, Comprehension: 115, Conversation: 100).\n<a href='assets/Duolingo English Test.pdf' download='Sandip_Nirmal_Duolingo_Certificate.pdf' target='_blank' class='chat-link'>View Duolingo Certificate (PDF) ↗</a>"
  },
  {
    q: "What's your experience?",
    a: "I have 10+ years of experience across 3 healthcare organizations — including senior roles at Hetauda Reference Laboratory, Nepal Red Cross Society, and Goldengate Polyclinic. I've managed 100+ daily patient cases, validated 5+ diagnostic protocols, and maintained 100% regulatory compliance."
  },
  {
    q: "What's your education?",
    a: "I hold a Master of Science in Public Health (Epidemiology & Biostatistics) from Monroe University, King Graduate School (2026), and a Bachelor of Science in Medical Laboratory Technology from H.N.B. Garhwal University, India (2013)."
  },
  {
    q: "What tools do you use?",
    a: "I'm proficient in R Programming, SAS Statistical Software, Laboratory Information Systems (LIS), and advanced Microsoft Excel for data modeling and visualization. I also have experience with epidemiological study design and quantitative research methodology."
  },
  {
    q: "Certifications & Honors?",
    a: "Key credentials include:\n• Infection Control in Health Care (Alison)\n• CPR / AED / First-Aid (NCPRF/OSHA/AHA)\n• HIPAA Compliance & Patient Privacy\n• COVID-19 Awareness (360training)\n• Best Laboratory Technologist Award (2020, Bagmati Province)\n• Food Protection (4.0 CEUs) & OHS"
  },
  {
    q: "Download CV",
    a: "You can download my full resume here:\n<a href='assets/Sandip_Nirmal_CVs.pdf' download='Sandip_Nirmal_CV.pdf' target='_blank' class='chat-link'>Download Sandip Nirmal CV (PDF) ↗</a>"
  },
  {
    q: "How can I contact you?",
    a: "You can reach me directly at:\n• Email: sandipnirmal802@gmail.com\n• Phone: (203) 668-0163\n• Location: Everett, WA 98204\n• LinkedIn: linkedin.com/in/sandip-nirmal-11a37729b"
  }
];

export function initChatbot() {
  const toggle = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const messagesEl = document.getElementById('chat-messages');
  const quickBtns = document.getElementById('chat-quick-btns');

  if (!toggle || !panel) return;

  // Toggle open/close
  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('chat-open');
    toggle.classList.toggle('chat-toggle--active', isOpen);
    if (isOpen && messagesEl.children.length === 0) {
      showGreeting(messagesEl);
    }
  });

  closeBtn?.addEventListener('click', () => {
    panel.classList.remove('chat-open');
    toggle.classList.remove('chat-toggle--active');
  });

  // Render quick-reply buttons
  CHAT_DATA.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'chat-quick-btn';
    btn.textContent = item.q;
    btn.addEventListener('click', () => handleQuestion(i, messagesEl));
    quickBtns.appendChild(btn);
  });
}

function showGreeting(container) {
  appendMessage(container, 'bot', "Hello! I'm Sandip's portfolio assistant. Click any question below to explore my background and skills.");
}

function handleQuestion(index, container) {
  const item = CHAT_DATA[index];
  appendMessage(container, 'user', item.q);

  // Small delay to feel natural
  setTimeout(() => {
    appendMessage(container, 'bot', item.a);
    container.scrollTop = container.scrollHeight;
  }, 400);
}

function appendMessage(container, role, text) {
  const bubble = document.createElement('div');
  bubble.className = `chat-msg chat-msg--${role}`;

  // Support HTML links in bot messages
  if (role === 'bot' && text.includes('<a')) {
    bubble.innerHTML = text.replace(/\n/g, '<br>');
  } else {
    bubble.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
  }

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
