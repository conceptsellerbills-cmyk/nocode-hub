import type { Metadata } from "next";
import "./globals.css";
import FooterNewsletter from "../components/FooterNewsletter";

const SITE_NAME = "NoCode Tutorials";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nocode-tutorials.com"),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Expert guides, reviews and tips.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <style>{`
          .site-header{background:#070710;border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 0;position:sticky;top:0;z-index:100}
          .header-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:24px}
          .site-brand{font-size:1.1rem;font-weight:800;color:#fff;text-decoration:none;white-space:nowrap;display:flex;align-items:center;gap:9px;transition:color 0.15s}
          .site-brand:hover{color:#6366f1}
          .site-logo{flex-shrink:0;display:block}
          .cat-nav{position:relative}
          .cat-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;font-size:0.875rem;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:6px;white-space:nowrap;transition:background 0.15s,border-color 0.15s}
          .cat-btn:hover,.cat-nav:focus-within .cat-btn{background:rgba(255,255,255,0.1);border-color:#6366f1;color:#6366f1}
          .cat-btn svg{transition:transform 0.2s}
          .cat-nav:hover .cat-btn svg,.cat-nav:focus-within .cat-btn svg{transform:rotate(180deg)}
          .cat-dropdown{display:none;position:absolute;top:calc(100% + 8px);left:0;background:#1a1d2e;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:8px;min-width:220px;box-shadow:0 16px 48px rgba(0,0,0,0.5);z-index:200;max-height:70vh;overflow-y:auto}
          .cat-nav:hover .cat-dropdown,.cat-nav:focus-within .cat-dropdown{display:block}
          .cat-dropdown a{display:block;padding:9px 14px;border-radius:8px;color:#c8cad8;font-size:0.875rem;text-decoration:none;transition:background 0.1s,color 0.1s;white-space:nowrap}
          .cat-dropdown a:hover{background:rgba(255,255,255,0.06);color:#6366f1}
          /* ── Footer ── */
          .site-footer{background:#0a0910;border-top:1px solid rgba(255,255,255,0.07);margin-top:80px;padding:0}
          .footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}
          .footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr;gap:48px;padding:56px 0 48px;border-bottom:1px solid rgba(255,255,255,0.07)}
          .footer-col1{}
          .footer-brand{display:flex;align-items:center;gap:10px;font-size:1.05rem;font-weight:800;color:#fff;text-decoration:none;margin-bottom:14px}
          .footer-brand-icon{font-size:1.3rem;line-height:1}
          .footer-desc{font-size:0.85rem;color:#6b7280;line-height:1.75;margin-bottom:22px;max-width:340px}
          .footer-nl-label{font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;margin-bottom:10px}
          .footer-nl-form{display:flex;gap:8px;flex-wrap:wrap}
          .footer-nl-form input{flex:1;min-width:160px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px;color:#e4e8f4;font-size:0.85rem;outline:none;transition:border-color 0.15s}
          .footer-nl-form input::placeholder{color:#4b5563}
          .footer-nl-form input:focus{border-color:#6366f1}
          .footer-nl-form button{background:#6366f1;color:#fff;border:none;border-radius:8px;padding:10px 20px;font-size:0.85rem;font-weight:700;cursor:pointer;white-space:nowrap;transition:opacity 0.15s}
          .footer-nl-form button:hover{opacity:0.85}
          .footer-col-title{font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;margin-bottom:16px}
          .footer-links{list-style:none;display:flex;flex-direction:column;gap:10px}
          .footer-links a{font-size:0.875rem;color:#6b7280;text-decoration:none;transition:color 0.15s}
          .footer-links a:hover{color:#6366f1}
          .footer-bottom{padding:20px 0;text-align:center}
          .footer-copy{font-size:0.8rem;color:#374151}
          @media(max-width:860px){.footer-grid{grid-template-columns:1fr 1fr;row-gap:36px}}
          @media(max-width:520px){.footer-grid{grid-template-columns:1fr}}
        `}</style>
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="site-brand">
              <svg className="site-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#6366f120"/>
              </svg>
              {SITE_NAME}
            </a>
            <nav className="cat-nav" tabIndex={0}>
              <button className="cat-btn" aria-haspopup="true">
                Categories
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              <div className="cat-dropdown" role="menu">
              <a href="/category/website-builders">🌐 Website Builders</a>
              <a href="/category/app-makers">📲 App Makers</a>
              <a href="/category/automation">⚡ Automation</a>
              <a href="/category/databases">🗄️ Databases</a>
              <a href="/category/forms">📝 Forms & Surveys</a>
              <a href="/category/integrations">🔗 Integrations</a>
              <a href="/category/landing-pages">🚀 Landing Pages</a>
              <a href="/category/ecommerce">🛒 E-commerce</a>
              <a href="/category/chatbots">🤖 Chatbot Builders</a>
              <a href="/category/crm">👥 CRM Tools</a>
              <a href="/category/mobile-apps">📲 Mobile App Builders</a>
              <a href="/category/analytics">📊 Analytics & Dashboards</a>
              <a href="/category/email-marketing">📧 Email Marketing</a>
              <a href="/category/internal-tools">🛠️ Internal Tools</a>
              <a href="/category/membership-sites">🔐 Membership Sites</a>
              <a href="/category/scheduling">📅 Scheduling Tools</a>
              <a href="/category/project-management">📋 Project Management</a>
              <a href="/category/social-media">📱 Social Media Tools</a>
              <a href="/category/workflow-automation">⚡ Workflow Automation</a>
              <a href="/category/ui-design">🎨 UI Design Tools</a>
              <a href="/category/ai-tools">🤖 No-Code AI Tools</a>
              </div>
            </nav>
          </div>
        </header>
        <main className="container main-content">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-grid">

              {/* Col 1 — Brand + Newsletter */}
              <div className="footer-col1">
                <a href="/" className="footer-brand">
                  <span className="footer-brand-icon">⚡</span>
                  NoCode Hub
                </a>
                <p className="footer-desc">Reviews and comparisons of the best no-code tools — build apps, automate workflows, and launch products without writing code.</p>
                <p className="footer-nl-label">Newsletter</p>
                <FooterNewsletter />
              </div>

              {/* Col 2 — Company */}
              <div>
                <p className="footer-col-title">Company</p>
                <ul className="footer-links">
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/write-for-us">Write for Us</a></li>
                  <li><a href="/advertise">Advertise</a></li>
                </ul>
              </div>

              {/* Col 3 — Legal */}
              <div>
                <p className="footer-col-title">Legal</p>
                <ul className="footer-links">
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/cookie-policy">Cookie Policy</a></li>
                <li><a href="/terms">Terms of Use</a></li>
                </ul>
              </div>

            </div>
            <div className="footer-bottom">
              <p className="footer-copy">© {new Date().getFullYear()} NoCode Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
