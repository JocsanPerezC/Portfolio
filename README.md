<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proyecto Requerimientos — README</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Sora:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0b0f1a;
    --bg2: #111827;
    --bg3: #1a2236;
    --border: #1f2d45;
    --accent: #3b82f6;
    --accent2: #06b6d4;
    --accent3: #8b5cf6;
    --text: #e2e8f0;
    --muted: #64748b;
    --green: #10b981;
    --yellow: #f59e0b;
    --red: #ef4444;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Sora', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.7;
    padding: 0;
  }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #0b0f1a 0%, #0f172a 40%, #0d1b2e 100%);
    border-bottom: 1px solid var(--border);
    padding: 80px 48px 60px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -60px; left: 30%;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-inner { max-width: 860px; margin: 0 auto; position: relative; z-index: 1; }
  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(59,130,246,0.12);
    border: 1px solid rgba(59,130,246,0.25);
    color: #93c5fd;
    font-family: var(--mono);
    font-size: 11px;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 24px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .badge-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  h1 {
    font-family: var(--sans);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #f8fafc;
    margin-bottom: 16px;
  }
  h1 span { 
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-desc {
    font-size: 17px;
    color: #94a3b8;
    max-width: 600px;
    margin-bottom: 36px;
    font-weight: 300;
  }
  .hero-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    font-family: var(--mono);
    font-size: 12px;
    padding: 5px 14px;
    border-radius: 6px;
    border: 1px solid var(--border);
    color: var(--muted);
    background: var(--bg2);
  }
  .tag.react { border-color: rgba(6,182,212,0.3); color: #67e8f9; background: rgba(6,182,212,0.05); }
  .tag.node  { border-color: rgba(16,185,129,0.3); color: #6ee7b7; background: rgba(16,185,129,0.05); }
  .tag.sql   { border-color: rgba(139,92,246,0.3); color: #c4b5fd; background: rgba(139,92,246,0.05); }
  .tag.express { border-color: rgba(245,158,11,0.3); color: #fcd34d; background: rgba(245,158,11,0.05); }

  /* LAYOUT */
  .container { max-width: 860px; margin: 0 auto; padding: 0 48px; }
  section { padding: 56px 0; border-bottom: 1px solid var(--border); }
  section:last-child { border-bottom: none; }

  h2 {
    font-size: 22px;
    font-weight: 600;
    color: #f1f5f9;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  h2::before {
    content: '';
    display: inline-block;
    width: 3px; height: 20px;
    background: linear-gradient(to bottom, var(--accent), var(--accent3));
    border-radius: 2px;
    flex-shrink: 0;
  }
  h3 { font-size: 14px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }

  p { color: #94a3b8; margin-bottom: 16px; }
  p:last-child { margin-bottom: 0; }

  /* TECH GRID */
  .tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
  .tech-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .tech-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .tech-card .layer { font-size: 11px; font-family: var(--mono); color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em; }
  .tech-card .name { font-size: 14px; font-weight: 600; color: var(--text); }
  .tech-card .detail { font-size: 12px; color: var(--muted); margin-top: 3px; }

  /* FEATURES */
  .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width:600px){ .features-grid { grid-template-columns: 1fr; } }
  .feature-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
  }
  .feature-card h4 { font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .feature-icon { 
    width: 28px; height: 28px; border-radius: 6px; 
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .fi-blue  { background: rgba(59,130,246,0.15); }
  .fi-green { background: rgba(16,185,129,0.15); }
  .fi-purple{ background: rgba(139,92,246,0.15); }
  .fi-amber { background: rgba(245,158,11,0.15); }
  .fi-cyan  { background: rgba(6,182,212,0.15); }
  .fi-rose  { background: rgba(244,63,94,0.15); }
  .feature-list { list-style: none; }
  .feature-list li { font-size: 13px; color: #64748b; padding: 3px 0; display: flex; align-items: flex-start; gap: 8px; }
  .feature-list li::before { content: '—'; color: var(--border); margin-top: 1px; flex-shrink: 0; }

  /* API TABLE */
  .api-group { margin-bottom: 32px; }
  .api-group:last-child { margin-bottom: 0; }
  table { width: 100%; border-collapse: collapse; }
  thead th { 
    text-align: left; font-family: var(--mono); font-size: 11px; 
    color: var(--muted); font-weight: 400; padding: 0 12px 10px;
    text-transform: uppercase; letter-spacing: 0.06em;
    border-bottom: 1px solid var(--border);
  }
  tbody tr { border-bottom: 1px solid rgba(31,45,69,0.6); }
  tbody tr:last-child { border-bottom: none; }
  tbody td { padding: 10px 12px; font-size: 13px; vertical-align: middle; }
  td:first-child { white-space: nowrap; }

  .method {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
  .GET    { background: rgba(16,185,129,0.15);  color: #6ee7b7; }
  .POST   { background: rgba(59,130,246,0.15);  color: #93c5fd; }
  .PUT    { background: rgba(245,158,11,0.15);  color: #fcd34d; }
  .DELETE { background: rgba(239,68,68,0.15);   color: #fca5a5; }
  .PATCH  { background: rgba(139,92,246,0.15);  color: #c4b5fd; }

  td.route { font-family: var(--mono); font-size: 12px; color: #94a3b8; }
  td.desc  { color: #64748b; font-size: 13px; }

  /* CODE BLOCKS */
  pre {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px 24px;
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.6;
    color: #94a3b8;
    margin-bottom: 16px;
  }
  pre .comment { color: #374151; }
  pre .key     { color: #93c5fd; }
  pre .val     { color: #6ee7b7; }
  pre .str     { color: #fcd34d; }

  /* STRUCTURE TREE */
  .tree {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 24px;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.9;
    color: #475569;
  }
  .tree .dir  { color: #93c5fd; }
  .tree .file { color: #94a3b8; }
  .tree .note { color: #374151; font-size: 12px; }

  /* SETUP STEPS */
  .steps { display: flex; flex-direction: column; gap: 20px; }
  .step { display: flex; gap: 16px; align-items: flex-start; }
  .step-num {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    color: white; font-size: 12px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 2px;
  }
  .step-content h4 { font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
  .step-content p  { font-size: 13px; color: #64748b; margin: 0; }

  /* ROLES */
  .roles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media(max-width:500px){ .roles-grid { grid-template-columns: 1fr; } }
  .role-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
  }
  .role-card .role-name { font-size: 13px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px; }
  .role-card .role-desc { font-size: 12px; color: #64748b; }
  .admin-card { border-color: rgba(59,130,246,0.3); }
  .lead-card  { border-color: rgba(139,92,246,0.3); }

  /* FILE TYPES */
  .file-types { display: flex; flex-wrap: wrap; gap: 8px; }
  .ft {
    font-family: var(--mono);
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 6px;
    background: var(--bg2);
    border: 1px solid var(--border);
    color: var(--muted);
  }

  /* FOOTER */
  footer {
    text-align: center;
    padding: 40px 48px;
    color: #334155;
    font-size: 13px;
    font-family: var(--mono);
  }
  footer span { color: #475569; }
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-inner">
    <div class="badge"><span class="badge-dot"></span>University Project — ITCR</div>
    <h1>Proyecto<br><span>Requerimientos</span></h1>
    <p class="hero-desc">A full-stack web application for managing software projects, requirements, activities, and tasks — with role-based access control and file attachment support.</p>
    <div class="hero-tags">
      <span class="tag react">React 19</span>
      <span class="tag node">Node.js</span>
      <span class="tag express">Express 5</span>
      <span class="tag sql">SQL Server</span>
      <span class="tag">Bootstrap 5</span>
      <span class="tag">Multer</span>
      <span class="tag">Axios</span>
    </div>
  </div>
</div>

<!-- DESCRIPTION -->
<div class="container">
<section>
  <h2>About</h2>
  <p>Proyecto Requerimientos is a web platform designed for structured management of software development projects. Users can register, log in, create projects, assign team members with specific roles, define requirements, break them down into activities, and further decompose activities into tasks with file attachments.</p>
  <p>The application features a high-contrast accessibility mode and a fine-grained role-based permission system, making it suitable for academic and small-team environments.</p>
</section>

<!-- TECH STACK -->
<section>
  <h2>Tech Stack</h2>
  <div class="tech-grid">
    <div class="tech-card">
      <div class="layer">Frontend</div>
      <div class="name">React 19</div>
      <div class="detail">+ React Router DOM 7</div>
    </div>
    <div class="tech-card">
      <div class="layer">UI</div>
      <div class="name">Bootstrap 5</div>
      <div class="detail">+ React Toastify</div>
    </div>
    <div class="tech-card">
      <div class="layer">Backend</div>
      <div class="name">Node.js</div>
      <div class="detail">Express 5</div>
    </div>
    <div class="tech-card">
      <div class="layer">Database</div>
      <div class="name">SQL Server</div>
      <div class="detail">via mssql driver</div>
    </div>
    <div class="tech-card">
      <div class="layer">File Uploads</div>
      <div class="name">Multer</div>
      <div class="detail">up to 2 GB per file</div>
    </div>
    <div class="tech-card">
      <div class="layer">HTTP Client</div>
      <div class="name">Axios</div>
      <div class="detail">username-based auth headers</div>
    </div>
    <div class="tech-card">
      <div class="layer">Config</div>
      <div class="name">dotenv</div>
      <div class="detail">environment variables</div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section>
  <h2>Features</h2>
  <div class="features-grid">
    <div class="feature-card">
      <h4><span class="feature-icon fi-blue">🔐</span> Authentication</h4>
      <ul class="feature-list">
        <li>Registration with validation (min age 15, password strength, unique email/username)</li>
        <li>8-digit emergency contact requirement</li>
        <li>Login with active account check</li>
        <li>Account recovery and reactivation</li>
        <li>Project-specific registration with role assignment</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4><span class="feature-icon fi-cyan">📁</span> Projects</h4>
      <ul class="feature-list">
        <li>Create, view, edit, and delete projects</li>
        <li>Add and remove project members</li>
        <li>Edit user roles per project</li>
        <li>Mark a project as delivered</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4><span class="feature-icon fi-purple">📋</span> Requirements</h4>
      <ul class="feature-list">
        <li>Create, view, edit, and delete requirements</li>
        <li>Linked to a specific project</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4><span class="feature-icon fi-green">⚡</span> Activities</h4>
      <ul class="feature-list">
        <li>Create, view, edit, and delete activities</li>
        <li>Associated to a project</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4><span class="feature-icon fi-amber">✅</span> Tasks</h4>
      <ul class="feature-list">
        <li>Full CRUD for tasks within activities</li>
        <li>File attachment uploads per task</li>
        <li>Editable alt text for attachments</li>
        <li>Deadline enforcement on uploads</li>
      </ul>
    </div>
    <div class="feature-card">
      <h4><span class="feature-icon fi-rose">♿</span> Accessibility</h4>
      <ul class="feature-list">
        <li>High-contrast mode toggle on all pages</li>
        <li>Soft-delete (deactivate) for accounts</li>
        <li>Admin profile management</li>
      </ul>
    </div>
  </div>
</section>

<!-- ROLE SYSTEM -->
<section>
  <h2>Role System</h2>
  <p>Roles are stored in the <code style="font-family:var(--mono);font-size:12px;color:#93c5fd;background:rgba(59,130,246,0.1);padding:2px 6px;border-radius:4px;">RolesProyecto</code> table. Actions such as adding/removing users and editing roles are restricted to users holding one of these roles within the project:</p>
  <div class="roles-grid" style="margin-top:16px;">
    <div class="role-card admin-card">
      <div class="role-name">🛡 Administrador de Proyecto</div>
      <div class="role-desc">Full project control — can manage members, roles, and all project data.</div>
    </div>
    <div class="role-card lead-card">
      <div class="role-name">🎯 Líder de Proyecto</div>
      <div class="role-desc">Can add/remove users and edit roles within the project.</div>
    </div>
  </div>
</section>

<!-- PROJECT STRUCTURE -->
<section>
  <h2>Project Structure</h2>
  <div class="tree">
<span class="dir">Proyecto-Requerimientos/</span>
├── <span class="dir">Server/</span>                         <span class="note"># Node.js + Express backend</span>
│   ├── <span class="file">server.js</span>                   <span class="note"># Entry point, Express setup, route mounting</span>
│   ├── <span class="file">db.js</span>                       <span class="note"># SQL Server connection pool</span>
│   ├── <span class="file">.env</span>                        <span class="note"># DB credentials, port</span>
│   ├── <span class="dir">middleware/</span>
│   │   └── <span class="file">auth.js</span>                 <span class="note"># authenticateUser middleware</span>
│   ├── <span class="dir">utils/</span>
│   │   └── <span class="file">permissions.js</span>          <span class="note"># isAdminOfProject helper</span>
│   ├── <span class="dir">routes/</span>
│   │   ├── <span class="file">auth.routes.js</span>          <span class="note"># /register, /login, /recover</span>
│   │   ├── <span class="file">user.routes.js</span>          <span class="note"># /user (GET, PUT, DELETE)</span>
│   │   └── <span class="file">project.routes.js</span>       <span class="note"># Projects, requirements, activities, tasks</span>
│   └── <span class="dir">uploads/</span>                    <span class="note"># Uploaded files (auto-generated)</span>
│
└── <span class="dir">crud/</span>                           <span class="note"># React frontend</span>
    └── <span class="dir">src/</span>
        ├── <span class="file">App.js</span>                  <span class="note"># Route definitions</span>
        └── <span class="dir">components/</span>
            ├── <span class="dir">auth/</span>               <span class="note"># Login, Register, Recovery, UserContext</span>
            ├── <span class="dir">layout/</span>             <span class="note"># Dashboard, Topbar</span>
            ├── <span class="dir">projects/</span>           <span class="note"># Projects, Requirements, Activities, Tasks</span>
            ├── <span class="dir">users/</span>              <span class="note"># User management & profile views</span>
            └── <span class="dir">reports/</span>            <span class="note"># reportWebVitals</span>
  </div>
</section>

<!-- API ENDPOINTS -->
<section>
  <h2>API Reference</h2>

  <div class="api-group">
    <h3>Auth  <span style="font-weight:300;color:#374151">— /api</span></h3>
    <table>
      <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method POST">POST</span></td><td class="route">/register</td><td class="desc">Register a new user</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/login</td><td class="desc">Log in</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/recover</td><td class="desc">Reactivate a deactivated account</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/register-project/:id</td><td class="desc">Register user and assign to a project</td></tr>
      </tbody>
    </table>
  </div>

  <div class="api-group">
    <h3>Users  <span style="font-weight:300;color:#374151">— /api</span></h3>
    <table>
      <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td class="route">/user</td><td class="desc">Get own profile</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/user/edit</td><td class="desc">Edit own profile</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td class="route">/user</td><td class="desc">Deactivate own account</td></tr>
      </tbody>
    </table>
  </div>

  <div class="api-group">
    <h3>Projects  <span style="font-weight:300;color:#374151">— /api</span></h3>
    <table>
      <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td class="route">/projects</td><td class="desc">List all projects for the authenticated user</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/create-project</td><td class="desc">Create a new project</td></tr>
        <tr><td><span class="method GET">GET</span></td><td class="route">/project/:id</td><td class="desc">Get project details</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/project/:id</td><td class="desc">Edit a project</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td class="route">/project/:id</td><td class="desc">Delete a project</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/project/:id/entregar</td><td class="desc">Mark a project as delivered</td></tr>
        <tr><td><span class="method GET">GET</span></td><td class="route">/project/:id/users</td><td class="desc">List users in a project</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/project/:id/add-user</td><td class="desc">Add a user to a project</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td class="route">/project/:id/users/:userId</td><td class="desc">Remove a user from a project</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/project/:id/users/:userid/role</td><td class="desc">Edit a user's role in a project</td></tr>
      </tbody>
    </table>
  </div>

  <div class="api-group">
    <h3>Requirements  <span style="font-weight:300;color:#374151">— /api</span></h3>
    <table>
      <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td class="route">/project/:id/requirements</td><td class="desc">List requirements for a project</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/create-requirement</td><td class="desc">Create a requirement</td></tr>
        <tr><td><span class="method GET">GET</span></td><td class="route">/requirement/:id</td><td class="desc">Get a requirement</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/requirement/:id</td><td class="desc">Edit a requirement</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td class="route">/requirement/:id</td><td class="desc">Delete a requirement</td></tr>
      </tbody>
    </table>
  </div>

  <div class="api-group">
    <h3>Activities  <span style="font-weight:300;color:#374151">— /api</span></h3>
    <table>
      <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td class="route">/project/:id/activities</td><td class="desc">List activities for a project</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/create-activity</td><td class="desc">Create an activity</td></tr>
        <tr><td><span class="method GET">GET</span></td><td class="route">/activity/:id</td><td class="desc">Get an activity</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/activity/:id</td><td class="desc">Edit an activity</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td class="route">/activity/:id</td><td class="desc">Delete an activity</td></tr>
      </tbody>
    </table>
  </div>

  <div class="api-group">
    <h3>Tasks  <span style="font-weight:300;color:#374151">— /api</span></h3>
    <table>
      <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><span class="method GET">GET</span></td><td class="route">/activity/:id/tasks</td><td class="desc">List tasks for an activity</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/create-task</td><td class="desc">Create a task</td></tr>
        <tr><td><span class="method GET">GET</span></td><td class="route">/task/:id</td><td class="desc">Get a task</td></tr>
        <tr><td><span class="method PUT">PUT</span></td><td class="route">/task/:id</td><td class="desc">Edit a task</td></tr>
        <tr><td><span class="method DELETE">DELETE</span></td><td class="route">/task/:id</td><td class="desc">Delete a task</td></tr>
        <tr><td><span class="method POST">POST</span></td><td class="route">/tasks/upload</td><td class="desc">Upload a file attachment to a task</td></tr>
        <tr><td><span class="method GET">GET</span></td><td class="route">/task/:id/attachments</td><td class="desc">Get attachments for a task</td></tr>
        <tr><td><span class="method PATCH">PATCH</span></td><td class="route">/tasks/attachment/:id/alt</td><td class="desc">Update alt text for an attachment</td></tr>
      </tbody>
    </table>
  </div>
</section>

<!-- SETUP -->
<section>
  <h2>Setup & Run</h2>

  <h3 style="margin-bottom:12px;">Prerequisites</h3>
  <div class="steps" style="margin-bottom:40px;">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-content">
        <h4>Node.js 18+</h4>
        <p>Ensure you have Node.js version 18 or higher installed.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-content">
        <h4>SQL Server with the <code style="font-family:var(--mono);font-size:12px;">GDP</code> database</h4>
        <p>A running SQL Server instance is required. The database must be named <code style="font-family:var(--mono);font-size:12px;">GDP</code>.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-content">
        <h4>Environment file</h4>
        <p>Create a <code style="font-family:var(--mono);font-size:12px;">.env</code> file inside the <code style="font-family:var(--mono);font-size:12px;">Server/</code> directory:</p>
      </div>
    </div>
  </div>

  <pre><span class="comment"># Server/.env</span>
<span class="key">DB_SERVER</span>=<span class="val">your_server</span>
<span class="key">DB_DATABASE</span>=<span class="val">GDP</span>
<span class="key">DB_USER</span>=<span class="val">your_user</span>
<span class="key">DB_PASSWORD</span>=<span class="val">your_password</span>
<span class="key">DB_PORT</span>=<span class="val">1433</span></pre>

  <h3 style="margin-top:32px;margin-bottom:12px;">Backend</h3>
  <pre><span class="comment"># runs on http://localhost:3001</span>
cd Server
npm install
node server.js</pre>

  <h3 style="margin-top:32px;margin-bottom:12px;">Frontend</h3>
  <pre><span class="comment"># runs on http://localhost:3000</span>
cd crud
npm install
npm start</pre>
</section>

<!-- SUPPORTED FILES -->
<section>
  <h2>Supported File Types</h2>
  <p>Task attachments support the following formats, with a maximum size of <strong style="color:#e2e8f0;">2 GB</strong> per file:</p>
  <div class="file-types" style="margin-top:16px;">
    <span class="ft">PNG</span>
    <span class="ft">JPEG / JPG</span>
    <span class="ft">MP4</span>
    <span class="ft">WebM</span>
    <span class="ft">PDF</span>
    <span class="ft">DOC</span>
    <span class="ft">DOCX</span>
    <span class="ft">XLS</span>
    <span class="ft">XLSX</span>
    <span class="ft">PPTX</span>
  </div>
</section>
</div>

<footer>
  Developed as a university project — <span>ITCR</span> &nbsp;·&nbsp; React + Node.js + SQL Server
</footer>

</body>
</html>
