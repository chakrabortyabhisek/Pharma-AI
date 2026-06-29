import React, { useState, useRef, useEffect } from "react";

const BRAND = {
  bg: "#1e2a3a",
  surface: "#243347",
  card: "#2c3e55",
  cardHover: "#334763",
  accent: "#38bdf8",
  accentDim: "#0ea5e9",
  accentGlow: "rgba(56,189,248,0.15)",
  green: "#34d399",
  greenDim: "rgba(52,211,153,0.12)",
  amber: "#fbbf24",
  red: "#f87171",
  textPrimary: "#e2e8f0",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "rgba(148,163,184,0.12)",
  borderStrong: "rgba(148,163,184,0.22)",
};

const SAMPLE_QA = [
  {
    q: "What are the symptoms of diabetes mellitus?",
    a: "Diabetes mellitus presents with polyuria (excessive urination), polydipsia (excessive thirst), polyphagia (excessive hunger), fatigue, blurred vision, and unexplained weight loss. Type 1 typically has rapid onset while Type 2 develops gradually over years.",
  },
  {
    q: "What is the mechanism of action of penicillin?",
    a: "Penicillin works by inhibiting bacterial cell wall synthesis. It binds to and inactivates penicillin-binding proteins (PBPs), which are enzymes responsible for cross-linking peptidoglycan chains in the cell wall, leading to cell lysis and death.",
  },
  {
    q: "What are common drug interactions with warfarin?",
    a: "Warfarin has numerous significant interactions. NSAIDs, aspirin, and antibiotics like metronidazole and fluoroquinolones increase bleeding risk. Rifampin, carbamazepine, and St. John's Wort reduce warfarin efficacy. Regular INR monitoring is essential.",
  },
  {
    q: "Explain the stages of hypertension",
    a: "Hypertension is classified into stages: Elevated (120–129/<80 mmHg), Stage 1 (130–139/80–89 mmHg), and Stage 2 (≥140/≥90 mmHg). A hypertensive crisis occurs above 180/120 mmHg. Lifestyle modification is first-line treatment for Stage 1; Stage 2 typically requires medication.",
  },
];

const FEATURES = [
  {
    icon: "🧬",
    title: "RAG-Powered",
    desc: "Retrieval-Augmented Generation from the Gale Encyclopedia of Medicine",
  },
  {
    icon: "🔍",
    title: "Source Citations",
    desc: "Every answer links back to the exact document and page reference",
  },
  {
    icon: "⚡",
    title: "Mistral 7B",
    desc: "Powered by Mistral-7B-Instruct via HuggingFace Endpoints",
  },
  {
    icon: "🛡️",
    title: "Context-Bound",
    desc: "Answers strictly within validated medical literature — no hallucinations",
  },
];

const SAMPLE_PROMPTS = [
  "What are the symptoms of diabetes mellitus?",
  "How does penicillin work against bacteria?",
  "What are common drug interactions with warfarin?",
  "Explain the stages of hypertension",
];

/* ── Sub-components ─────────────────────────────────────────────────── */

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: BRAND.accent,
            display: "inline-block",
            animation: `pharma-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function PulseRing() {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: `2px solid ${BRAND.accent}`,
          animation: "pharma-pulse 2s ease-out infinite",
          opacity: 0,
        }}
      />
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: BRAND.accentGlow,
          border: `1.5px solid ${BRAND.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        💊
      </div>
    </div>
  );
}

function ECGLine() {
  return (
    <svg width="200" height="40" viewBox="0 0 200 40" style={{ opacity: 0.5 }}>
      <polyline
        points="0,20 30,20 40,5 50,35 60,20 70,20 80,20 90,12 100,28 110,20 120,20 150,20 160,5 170,35 180,20 200,20"
        fill="none"
        stroke={BRAND.accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: "pharma-ecg-dash 3s linear infinite" }}
        strokeDasharray="300"
        strokeDashoffset="300"
      />
    </svg>
  );
}

function SourceBadge({ label, page, isOpen, onToggle, content }) {
  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          width: "100%",
          background: isOpen ? BRAND.accentGlow : "rgba(148,163,184,0.06)",
          border: `1px solid ${isOpen ? BRAND.accent : BRAND.border}`,
          borderRadius: 8,
          padding: "5px 12px",
          cursor: "pointer",
          color: isOpen ? BRAND.accent : BRAND.textSecondary,
          fontSize: 12,
          fontWeight: 500,
          transition: "all 0.2s",
          fontFamily: "inherit",
        }}
      >
        <span>📄</span>
        <span>{label}</span>
        <span style={{ marginLeft: 4, color: BRAND.textMuted }}>pg. {page}</span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            marginTop: 4,
            padding: "10px 14px",
            background: "rgba(56,189,248,0.04)",
            border: `1px solid ${BRAND.border}`,
            borderRadius: 8,
            fontSize: 13,
            color: BRAND.textSecondary,
            lineHeight: 1.6,
            animation: "pharma-slide-down 0.2s ease",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

function Message({ msg }) {
  const [openSource, setOpenSource] = useState(null);
  const isUser = msg.role === "user";

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        animation: "pharma-msg-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        marginBottom: 20,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          background: isUser
            ? `linear-gradient(135deg, ${BRAND.accentDim}, #6366f1)`
            : "linear-gradient(135deg, #1e3a2f, #0f6e56)",
          border: `1.5px solid ${isUser ? BRAND.accent : BRAND.green}`,
          boxShadow: `0 0 12px ${isUser ? BRAND.accentGlow : BRAND.greenDim}`,
        }}
      >
        {isUser ? "👤" : "🧬"}
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: "75%", minWidth: 60 }}>
        <div
          style={{
            fontSize: 11,
            color: BRAND.textMuted,
            marginBottom: 4,
            textAlign: isUser ? "right" : "left",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {isUser ? "You" : "PharmaAI"}
        </div>

        <div
          style={{
            background: isUser
              ? `linear-gradient(135deg, ${BRAND.accentDim}22, #6366f122)`
              : BRAND.card,
            border: `1px solid ${isUser ? BRAND.accent + "40" : BRAND.border}`,
            borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
            padding: "12px 16px",
            color: BRAND.textPrimary,
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {msg.typing ? <TypingDots /> : msg.content}
        </div>

        {msg.sources && msg.sources.length > 0 && (
          <div style={{ marginTop: 6 }}>
            {msg.sources.map((src, i) => (
              <SourceBadge
                key={i}
                label={`Source ${i + 1}`}
                page={src.page}
                content={src.content}
                isOpen={openSource === i}
                onToggle={() => setOpenSource(openSource === i ? null : i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SampleChip({ text, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? BRAND.accentGlow : "transparent",
        border: `1px solid ${hovered ? BRAND.accent : BRAND.borderStrong}`,
        borderRadius: 20,
        padding: "7px 14px",
        color: hovered ? BRAND.accent : BRAND.textSecondary,
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.2s",
        lineHeight: 1.4,
        textAlign: "left",
        fontFamily: "inherit",
      }}
    >
      {text}
    </button>
  );
}

/* ── Main App ───────────────────────────────────────────────────────── */

export default function PharmaAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("chat");
  const [sampleIdx, setSampleIdx] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const query = (text || input).trim();
    if (!query || loading) return;
    setInput("");

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto";

    const userMsg = { role: "user", content: query, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Show typing indicator
    const typingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", typing: true, id: typingId },
    ]);

    // Simulate API delay (replace this block with your real fetch call)
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const sample =
      SAMPLE_QA.find((s) =>
        query.toLowerCase().includes(s.q.split(" ")[3]?.toLowerCase() || "___")
      ) || SAMPLE_QA[sampleIdx % SAMPLE_QA.length];

    setSampleIdx((i) => i + 1);

    const answer = {
      role: "assistant",
      id: Date.now() + 2,
      content: sample.a,
      sources: [
        {
          page: Math.floor(Math.random() * 900 + 100),
          content:
            "Extracted from The Gale Encyclopedia of Medicine, 2nd Edition. This passage discusses the clinical presentation and diagnostic criteria relevant to the query.",
        },
        {
          page: Math.floor(Math.random() * 900 + 100),
          content:
            "Additional reference from the same volume covering pharmacological mechanisms and treatment considerations.",
        },
      ],
    };

    setMessages((prev) => prev.filter((m) => m.id !== typingId).concat(answer));
    setLoading(false);
  }

  /*
   * ── TO CONNECT YOUR REAL BACKEND ──────────────────────────────────
   * Replace the mock block above (lines marked "Simulate API delay") with:
   *
   *   const res = await fetch("http://localhost:8000/ask", {
   *     method: "POST",
   *     headers: { "Content-Type": "application/json" },
   *     body: JSON.stringify({ query }),
   *   });
   *   const data = await res.json();
   *   const answer = {
   *     role: "assistant",
   *     id: Date.now() + 2,
   *     content: data.result,
   *     sources: data.source_documents.map((doc) => ({
   *       page: doc.metadata?.page_label ?? "—",
   *       content: doc.page_content,
   *     })),
   *   };
   * ──────────────────────────────────────────────────────────────────
   */

  const isEmpty = messages.length === 0;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: ${BRAND.bg};
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.borderStrong}; border-radius: 99px; }

        textarea { outline: none; }
        button { font-family: inherit; }

        @keyframes pharma-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes pharma-pulse {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2);   opacity: 0;   }
        }
        @keyframes pharma-msg-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes pharma-slide-down {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pharma-ecg-dash {
          0%   { stroke-dashoffset: 300; opacity: 1; }
          60%  { stroke-dashoffset: 0;   opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        @keyframes pharma-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pharma-shimmer {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1;   }
        }

        .feature-card {
          transition: border-color 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          border-color: ${BRAND.accent}50 !important;
          transform: translateY(-2px);
        }
        .clear-btn:hover { color: ${BRAND.red} !important; }
        .tab-btn:hover   { color: ${BRAND.textSecondary} !important; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: BRAND.bg,
          color: BRAND.textPrimary,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* ── Header ────────────────────────────────────────────────── */}
        <header
          style={{
            background: BRAND.surface,
            borderBottom: `1px solid ${BRAND.border}`,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <PulseRing />
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                  color: BRAND.textPrimary,
                }}
              >
                Pharma<span style={{ color: BRAND.accent }}>AI</span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: BRAND.textMuted,
                  letterSpacing: "0.04em",
                }}
              >
                Medical Knowledge Assistant
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ECGLine />

            {/* Tab switcher */}
            <div
              style={{
                display: "flex",
                background: BRAND.bg,
                borderRadius: 8,
                padding: 3,
                gap: 2,
              }}
            >
              {["chat", "about"].map((t) => (
                <button
                  key={t}
                  className="tab-btn"
                  onClick={() => setTab(t)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: tab === t ? BRAND.card : "transparent",
                    color: tab === t ? BRAND.accent : BRAND.textMuted,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Live badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: BRAND.greenDim,
                border: `1px solid ${BRAND.green}30`,
                borderRadius: 20,
                padding: "4px 12px",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: BRAND.green,
                  animation: "pharma-shimmer 2s ease-in-out infinite",
                }}
              />
              <span style={{ fontSize: 11, color: BRAND.green, fontWeight: 600 }}>
                Live
              </span>
            </div>
          </div>
        </header>

        {/* ── About tab ─────────────────────────────────────────────── */}
        {tab === "about" ? (
          <div
            style={{
              flex: 1,
              padding: "40px 24px",
              maxWidth: 760,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div style={{ animation: "pharma-fade-in 0.4s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🧬</div>
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: BRAND.textPrimary,
                    letterSpacing: "-0.03em",
                    marginBottom: 8,
                  }}
                >
                  About Pharma<span style={{ color: BRAND.accent }}>AI</span>
                </h1>
                <p
                  style={{
                    color: BRAND.textSecondary,
                    lineHeight: 1.7,
                    maxWidth: 520,
                    margin: "0 auto",
                  }}
                >
                  An AI-powered medical RAG chatbot built on The Gale Encyclopedia
                  of Medicine, 2nd Edition. Ask any clinical question and get
                  context-grounded answers with source citations.
                </p>
              </div>

              {/* Feature cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                }}
              >
                {FEATURES.map((f, i) => (
                  <div
                    key={i}
                    className="feature-card"
                    style={{
                      background: BRAND.card,
                      border: `1px solid ${BRAND.border}`,
                      borderRadius: 12,
                      padding: "20px 18px",
                      animation: `pharma-fade-in ${0.3 + i * 0.08}s ease both`,
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: BRAND.textPrimary,
                        marginBottom: 6,
                      }}
                    >
                      {f.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: BRAND.textSecondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {f.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div
                style={{
                  marginTop: 32,
                  background: BRAND.card,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 12,
                  padding: "20px 24px",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: BRAND.textMuted,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Tech Stack
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    "Python",
                    "Streamlit",
                    "FAISS",
                    "HuggingFace",
                    "Mistral 7B",
                    "LangChain",
                    "Sentence Transformers",
                    "RAG",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: BRAND.accentGlow,
                        border: `1px solid ${BRAND.accent}30`,
                        color: BRAND.accent,
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Chat tab ─────────────────────────────────────────────── */
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              maxWidth: 760,
              margin: "0 auto",
              width: "100%",
              padding: "0 16px",
            }}
          >
            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 0 12px",
              }}
            >
              {isEmpty ? (
                /* Empty state */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 380,
                    gap: 24,
                    animation: "pharma-fade-in 0.5s ease",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 52, marginBottom: 16 }}>💊</div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: BRAND.textPrimary,
                        letterSpacing: "-0.02em",
                        marginBottom: 8,
                      }}
                    >
                      Ask a Medical Question
                    </h2>
                    <p
                      style={{
                        color: BRAND.textSecondary,
                        fontSize: 14,
                        maxWidth: 380,
                        lineHeight: 1.6,
                      }}
                    >
                      Powered by the Gale Encyclopedia of Medicine. Get cited,
                      context-grounded answers from trusted medical literature.
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      width: "100%",
                      maxWidth: 460,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: BRAND.textMuted,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                        textAlign: "center",
                      }}
                    >
                      Try asking
                    </div>
                    {SAMPLE_PROMPTS.map((p, i) => (
                      <SampleChip key={i} text={p} onClick={() => sendMessage(p)} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <Message key={msg.id || i} msg={msg} />
                  ))}
                  <div ref={bottomRef} />
                </>
              )}
            </div>

            {/* Input bar */}
            <div
              style={{
                padding: "12px 0 20px",
                borderTop: `1px solid ${BRAND.border}`,
                background: BRAND.bg,
                flexShrink: 0,
              }}
            >
              {!isEmpty && (
                <button
                  className="clear-btn"
                  onClick={() => setMessages([])}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginBottom: 10,
                    background: "transparent",
                    border: "none",
                    color: BRAND.textMuted,
                    fontSize: 12,
                    cursor: "pointer",
                    padding: "2px 6px",
                    borderRadius: 4,
                    transition: "color 0.15s",
                  }}
                >
                  Clear chat ✕
                </button>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-end",
                  background: BRAND.card,
                  border: `1px solid ${BRAND.borderStrong}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = BRAND.accent + "60";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = BRAND.borderStrong;
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  placeholder="Ask about symptoms, medications, conditions…"
                  rows={1}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: BRAND.textPrimary,
                    fontSize: 14,
                    lineHeight: 1.6,
                    resize: "none",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    flexShrink: 0,
                    background:
                      input.trim() && !loading
                        ? BRAND.accent
                        : BRAND.borderStrong,
                    border: "none",
                    cursor:
                      input.trim() && !loading ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    transition: "all 0.2s",
                    transform:
                      input.trim() && !loading ? "scale(1)" : "scale(0.92)",
                  }}
                >
                  {loading ? "⏳" : "➤"}
                </button>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  fontSize: 11,
                  color: BRAND.textMuted,
                }}
              >
                Answers grounded in The Gale Encyclopedia of Medicine · Not a
                substitute for professional medical advice
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
