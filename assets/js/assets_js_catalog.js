// catalog.js - fetch categories.json, then load each CSV and render a tab/table
document.addEventListener('DOMContentLoaded', () => {
  const tabsEl = document.getElementById('catalog-tabs');
  const contentsEl = document.getElementById('catalog-contents');
  const errEl = document.getElementById('catalog-error');

  const manifestUrl = '/data/categories.json';

  function showError(msg){
    errEl.textContent = msg;
  }

  fetch(manifestUrl)
    .then(res => {
      if (!res.ok) throw new Error('Could not load categories manifest: ' + res.statusText);
      return res.json();
    })
    .then(categories => {
      if (!Array.isArray(categories) || categories.length === 0) {
        showError('No categories found in data/categories.json');
        return;
      }
      categories.forEach((cat, idx) => {
        createCategory(cat, idx === 0);
      });
    })
    .catch(err => {
      console.error(err);
      showError(err.message || String(err));
    });

  function createCategory(category, makeActive){
    const id = category.id || slugify(category.title || category.file);
    // create tab button
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.type = 'button';
    btn.textContent = category.title || id;
    btn.setAttribute('aria-selected', makeActive ? 'true' : 'false');
    btn.dataset.target = id;
    btn.addEventListener('click', () => {
      // activate this tab
      document.querySelectorAll('.tab-btn').forEach(b => b.setAttribute('aria-selected','false'));
      btn.setAttribute('aria-selected','true');
      document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
      const content = document.getElementById(id);
      if (content) content.classList.add('active');
    });
    tabsEl.appendChild(btn);

    // create content container
    const content = document.createElement('section');
    content.className = 'category';
    if (makeActive) content.classList.add('active');
    content.id = id;
    content.innerHTML = `<h2>${escapeHtml(category.title || id)} <span class="small">(${escapeHtml(category.file)})</span></h2>
      <div class="table-wrap" aria-live="polite"></div>`;
    contentsEl.appendChild(content);

    // load CSV
    loadAndRenderCSV(category.file, content.querySelector('.table-wrap'));
  }

  function loadAndRenderCSV(csvPath, containerEl){
    if (!csvPath) {
      containerEl.innerHTML = `<p class="small">No file specified for this category.</p>`;
      return;
    }
    fetch(csvPath)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch ' + csvPath);
        return r.text();
      })
      .then(text => {
        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: h => (h || '').trim().toLowerCase()
        });
        if (parsed.errors && parsed.errors.length) {
          console.warn('CSV parse warnings/errors for', csvPath, parsed.errors);
        }
        renderTable(parsed.data, containerEl);
      })
      .catch(err => {
        console.error(err);
        containerEl.innerHTML = `<p class="small">Error loading file: ${escapeHtml(String(err))}</p>`;
      });
  }

  function renderTable(rows, containerEl){
    // expected columns: name, amount, painted
    if (!rows || rows.length === 0) {
      containerEl.innerHTML = `<p class="small">No entries.</p>`;
      return;
    }

    // Normalize rows and coerce numbers
    const normalized = rows.map(r => {
      const name = (r.name || r['Name'] || '').trim();
      const amount = parseInt((r.amount ?? r['Amount'] ?? '').toString().trim() || '0', 10) || 0;
      const painted = parseInt((r.painted ?? r['Painted'] ?? '').toString().trim() || '0', 10) || 0;
      return { name, amount, painted };
    });

    // Build table
    const table = document.createElement('table');
    table.className = 'catalog-table';
    table.innerHTML = `<thead>
      <tr><th>Name</th><th>Amount</th><th>Painted</th><th>Painted %</th></tr>
    </thead>`;

    const tbody = document.createElement('tbody');
    let totalAmount = 0, totalPainted = 0;
    normalized.forEach(r => {
      totalAmount += r.amount;
      totalPainted += r.painted;
      const pct = r.amount ? Math.round((r.painted / r.amount) * 100) : 0;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(r.name)}</td>
        <td>${r.amount}</td>
        <td>${r.painted}</td>
        <td>${pct}%</td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    const tfoot = document.createElement('tfoot');
    const overallPct = totalAmount ? Math.round((totalPainted / totalAmount) * 100) : 0;
    tfoot.innerHTML = `<tr><td>Total</td><td>${totalAmount}</td><td>${totalPainted}</td><td>${overallPct}%</td></tr>`;
    table.appendChild(tfoot);

    containerEl.innerHTML = '';
    containerEl.appendChild(table);
  }

  // helpers
  function slugify(s){
    return (s||'').toString().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-_]/g,'');
  }
  function escapeHtml(s){
    if (s == null) return '';
    return String(s)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }
});