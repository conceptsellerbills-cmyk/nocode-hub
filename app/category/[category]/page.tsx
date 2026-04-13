import { getAllPosts } from '../../../lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ category: string }> }

const CATEGORY_MAP: Record<string, { label: string; desc: string; keywords: string[] }> = {
  'website-builders':   { label: 'Website Builders',     desc: 'Best Webflow, Framer & Squarespace alternatives',         keywords: ['webflow','framer','squarespace','website','builder'] },
  'app-makers':         { label: 'App Makers',            desc: 'Best Bubble, Glide & FlutterFlow app builders',           keywords: ['bubble','glide','flutterflow','adalo','app maker','app builder'] },
  'automation':         { label: 'Automation',            desc: 'Best Make, Zapier & n8n workflow automation tools',       keywords: ['zapier','make','n8n','automation','workflow','integromat'] },
  'databases':          { label: 'Databases',             desc: 'Best Airtable, Notion & Supabase alternatives',           keywords: ['airtable','notion','supabase','database','noco'] },
  'forms':              { label: 'Forms & Surveys',       desc: 'Best Typeform, Tally & form builder alternatives',        keywords: ['typeform','tally','jotform','form','survey'] },
  'integrations':       { label: 'Integrations',          desc: 'Best no-code integration and connector tools',            keywords: ['integration','connector','pabbly','api','zapier','make'] },
  'landing-pages':      { label: 'Landing Pages',         desc: 'Best no-code landing page builders for 2025',             keywords: ['landing page','carrd','unbounce','leadpages','framer','instapage'] },
  'ecommerce':          { label: 'E-commerce',            desc: 'Best no-code e-commerce and online store platforms',      keywords: ['shopify','gumroad','ecommerce','store','woocommerce','lemon squeezy'] },
  'chatbots':           { label: 'Chatbot Builders',      desc: 'Best no-code AI chatbot builders for 2025',               keywords: ['chatbot','tidio','manychat','landbot','chatbase','intercom'] },
  'crm':                { label: 'CRM Tools',             desc: 'Best no-code CRM tools and alternatives',                 keywords: ['crm','hubspot','pipedrive','airtable','folk','streak'] },
  'mobile-apps':        { label: 'Mobile App Builders',   desc: 'Best no-code mobile app builders for iOS and Android',    keywords: ['adalo','glide','flutterflow','thunkable','bravo','mobile app'] },
  'analytics':          { label: 'Analytics & Dashboards','desc': 'Best no-code analytics and dashboard tools',             keywords: ['analytics','dashboard','looker','metabase','databox','retool'] },
  'email-marketing':    { label: 'Email Marketing',       desc: 'Best no-code email marketing platforms for 2025',         keywords: ['mailchimp','convertkit','klaviyo','beehiiv','email marketing','brevo'] },
  'internal-tools':     { label: 'Internal Tools',        desc: 'Best no-code platforms for building internal business apps', keywords: ['retool','appsmith','softr','internal tool','glide','notion'] },
  'membership-sites':   { label: 'Membership Sites',      desc: 'Best no-code membership and community platforms',          keywords: ['membership','circle','skool','patreon','mighty networks','memberstack'] },
  'scheduling':         { label: 'Scheduling Tools',      desc: 'Best no-code scheduling and calendar booking tools',       keywords: ['calendly','cal.com','scheduling','tidycal','acuity','doodle'] },
  'project-management': { label: 'Project Management',    desc: 'Best no-code project management tools for teams',          keywords: ['notion','clickup','asana','trello','monday','linear','project'] },
  'social-media':       { label: 'Social Media Tools',    desc: 'Best no-code social media scheduling and design tools',    keywords: ['buffer','canva','hootsuite','later','social media','typefully'] },
  'workflow-automation':{ label: 'Workflow Automation',   desc: 'Best no-code workflow and API automation tools',           keywords: ['zapier','make','n8n','pabbly','activepieces','relay','automation'] },
  'ui-design':          { label: 'UI Design Tools',       desc: 'Best no-code UI and visual design tools for 2025',         keywords: ['figma','framer','webflow','canva','penpot','whimsical','ui design'] },
  'ai-tools':           { label: 'No-Code AI Tools',      desc: 'Best no-code AI builders, agents, and automation tools',   keywords: ['ai','dify','chatbase','voiceflow','flowise','relevance','no-code ai'] },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORY_MAP[category]
  if (!cat) return {}
  return {
    title: `Best ${cat.label} 2025 — NoCode Tutorials`,
    description: cat.desc,
    alternates: { canonical: `/category/${category}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORY_MAP[category]
  if (!cat) notFound()

  const all = getAllPosts()
  const kw = cat.keywords
  const matched = all.filter((p) => {
    const text = ((p.keyword || '') + ' ' + (p.title || '') + ' ' + (p.slug || '')).toLowerCase()
    return kw.some((k) => text.includes(k))
  })
  const posts = matched.length > 0 ? matched : all

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#0a0e1a;--surface:#0f1520;--border:#1a2035;--text:#e4e8f4;--muted:#7a82a0;--accent:#00c896;--accent2:#6366f1;--radius:12px}
        body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
        a{text-decoration:none;color:inherit}
        .container{max-width:1100px;margin:0 auto;padding:0 24px}
        .cat-hero{padding:60px 24px 48px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(0,200,150,0.12) 0%,transparent 70%)}
        .cat-badge{display:inline-block;padding:5px 16px;border-radius:20px;background:rgba(0,200,150,0.12);border:1px solid rgba(0,200,150,0.3);color:var(--accent);font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px}
        .cat-hero h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:12px}
        .cat-hero p{color:var(--muted);font-size:1rem;max-width:560px;margin:0 auto 24px}
        .breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--muted);justify-content:center;margin-bottom:32px}
        .breadcrumb a{color:var(--accent)}
        .post-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;padding-bottom:80px}
        .post-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
        .post-card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .post-tag{display:inline-block;padding:3px 10px;border-radius:20px;background:rgba(0,200,150,0.1);border:1px solid rgba(0,200,150,0.2);color:var(--accent);font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:12px}
        .post-card h2{font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:10px}
        .post-card h2 a:hover{color:var(--accent)}
        .post-card p{color:var(--muted);font-size:0.87rem;line-height:1.65;flex:1;margin-bottom:18px}
        .post-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border)}
        .post-date{font-size:0.72rem;color:var(--muted)}
        .post-link{font-size:0.82rem;color:var(--accent);font-weight:600}
        .empty{text-align:center;padding:80px 0;color:var(--muted)}
        @media(max-width:600px){.post-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="cat-hero">
        <div className="cat-badge">Category</div>
        <h1>{cat.label}</h1>
        <p>{cat.desc}</p>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{cat.label}</span>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p className="empty">No articles yet — check back soon!</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.slug}>
                {post.keyword && <span className="post-tag">{post.keyword}</span>}
                <h2><a href={`/${post.slug}`}>{post.title}</a></h2>
                <p>{post.description}</p>
                <div className="post-footer">
                  <span className="post-date">{post.date}</span>
                  <a href={`/${post.slug}`} className="post-link">Read →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
