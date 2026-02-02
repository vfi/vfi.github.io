---
layout: page
title: Mini Painting Progress
permalink: /mini-painting/
---

<style>
.tabs {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.tabs input[type="radio"] {
  display: none;
}

.tabs label {
  padding: 0.75rem 1.5rem;
  background: #001a00;
  color: #00ff00;
  cursor: pointer;
  border: 1px solid #00aa00;
  border-bottom: none;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
  font-family: 'Courier New', Consolas, monospace;
  text-transform: uppercase;
}

.tabs label:hover {
  background: #002200;
  text-shadow: 0 0 8px #00ff00;
}

.tabs input[type="radio"]:checked + label {
  background: #0a0a0a;
  border-bottom: 1px solid #0a0a0a;
  margin-bottom: -1px;
  z-index: 1;
  position: relative;
  color: #33ff33;
  text-shadow: 0 0 10px #00ff00;
}

.tab-content {
  display: none;
  padding: 1.5rem;
  border: 1px solid #00aa00;
  border-radius: 0 4px 4px 4px;
  width: 100%;
  order: 1;
  background: #0a0a0a;
}

{% for cat in site.data.painting.categories %}
#tab-{{ cat.id }}:checked ~ #content-{{ cat.id }}{% unless forloop.last %},
{% endunless %}{% endfor %} {
  display: block;
}

/* Subtabs styling */
.subtabs {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.subtabs input[type="radio"] {
  display: none;
}

.subtabs label {
  padding: 0.5rem 1rem;
  background: #001100;
  color: #00aa00;
  cursor: pointer;
  border: 1px solid #006600;
  border-bottom: none;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
  font-size: 0.9rem;
  font-family: 'Courier New', Consolas, monospace;
}

.subtabs label:hover {
  background: #002200;
  color: #00ff00;
}

.subtabs input[type="radio"]:checked + label {
  background: #0a0a0a;
  border-bottom: 1px solid #0a0a0a;
  margin-bottom: -1px;
  z-index: 1;
  position: relative;
  color: #00ff00;
}

.subtab-content {
  display: none;
  padding: 1rem;
  border: 1px solid #006600;
  border-radius: 0 4px 4px 4px;
  width: 100%;
  order: 1;
  background: #0a0a0a;
}

{% assign all_subs = "" | split: "" %}
{% for cat in site.data.painting.categories %}{% for sub in cat.subcategories %}{% assign all_subs = all_subs | push: sub %}{% endfor %}{% endfor %}
{% for sub in all_subs %}
#subtab-{{ sub.id }}:checked ~ #content-{{ sub.id }}{% unless forloop.last %},{% endunless %}
{% endfor %}{
  display: block;
}

/* Table styling */
.subtab-content table,
.tab-content table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.subtab-content th,
.subtab-content td,
.tab-content th,
.tab-content td {
  padding: 0.5rem 1rem;
  border: 1px solid #006600;
  text-align: left;
  color: #00ff00;
}

.subtab-content th,
.tab-content th {
  background: #002200;
  font-weight: 600;
  color: #33ff33;
  text-transform: uppercase;
}

.subtab-content tr:hover,
.tab-content tr:hover {
  background: #001a00;
}

.unit-logo {
  width: 48px;
  height: 48px;
  max-width: none;
  vertical-align: middle;
}

.progress-summary {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #001a00;
  border-radius: 4px;
  border: 1px solid #006600;
}

.progress-bar {
  height: 24px;
  background: #001100;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
  border: 1px solid #006600;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #006600, #00ff00);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px #00ff00;
}

.progress-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #00ff00;
  font-family: 'Courier New', Consolas, monospace;
}

.percent-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 3rem;
  text-align: center;
  font-family: 'Courier New', Consolas, monospace;
}

.percent-0 {
  background: #001100;
  color: #004400;
  border: 1px solid #004400;
}

.percent-low {
  background: #002200;
  color: #00aa00;
  border: 1px solid #006600;
}

.percent-mid {
  background: #003300;
  color: #00ff00;
  border: 1px solid #00aa00;
}

.percent-high {
  background: #00aa00;
  color: #0a0a0a;
  border: 1px solid #00ff00;
  text-shadow: none;
  box-shadow: 0 0 8px #00ff00;
}

/* Sortable table headers */
th.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 1.5rem;
}

th.sortable:hover {
  background: #003300;
  text-shadow: 0 0 8px #00ff00;
}

th.sortable::after {
  content: '⇅';
  position: absolute;
  right: 0.5rem;
  opacity: 0.4;
  font-size: 0.8rem;
}

th.sortable.sort-asc::after {
  content: '↑';
  opacity: 1;
}

th.sortable.sort-desc::after {
  content: '↓';
  opacity: 1;
}
</style>

<div class="tabs">
  {% for cat in site.data.painting.categories %}
  <input type="radio" id="tab-{{ cat.id }}" name="tab-group"{% if forloop.first %} checked{% endif %}>
  <label for="tab-{{ cat.id }}">{{ cat.name }}</label>
  {% endfor %}

  {% for cat in site.data.painting.categories %}
  <div class="tab-content" id="content-{{ cat.id }}">
    <h2>{{ cat.name }}</h2>

    {% if cat.subcategories.size > 0 %}
    <div class="subtabs">
      {% for sub in cat.subcategories %}
      <input type="radio" id="subtab-{{ sub.id }}" name="{{ cat.id }}-subtab"{% if forloop.first %} checked{% endif %}>
      <label for="subtab-{{ sub.id }}">{{ sub.name }}</label>
      {% endfor %}

      {% for sub in cat.subcategories %}
      {% assign items = site.data[sub.data_file] %}
      {% assign total_painted = 0 %}
      {% assign total_items = 0 %}
      {% for item in items %}
        {% assign total_painted = total_painted | plus: item.painted %}
        {% assign total_items = total_items | plus: item.total %}
      {% endfor %}
      {% if total_items > 0 %}
        {% assign percentage = total_painted | times: 100 | divided_by: total_items %}
      {% else %}
        {% assign percentage = 0 %}
      {% endif %}
      <div class="subtab-content" id="content-{{ sub.id }}">
        <h3>{{ sub.name }}</h3>
        <div class="progress-summary">
          <span class="progress-text">{{ total_painted }} / {{ total_items }} painted ({{ percentage }}%)</span>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: {{ percentage }}%;"></div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th class="sortable" data-sort="string">Name</th>
              <th class="sortable" data-sort="number">Painted</th>
              <th class="sortable" data-sort="number">Total</th>
              <th class="sortable" data-sort="number">%</th>
            </tr>
          </thead>
          <tbody>
            {% for item in items %}
            <tr>
              <td>{% if item.logo %}<img src="{{ item.logo }}" alt="" class="unit-logo">{% endif %}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.painted }}</td>
              <td>{{ item.total }}</td>
              <td>{% if item.total > 0 %}{% assign pct = item.painted | times: 100 | divided_by: item.total %}{% if pct == 0 %}<span class="percent-badge percent-0">{{ pct }}%</span>{% elsif pct < 50 %}<span class="percent-badge percent-low">{{ pct }}%</span>{% elsif pct < 100 %}<span class="percent-badge percent-mid">{{ pct }}%</span>{% else %}<span class="percent-badge percent-high">{{ pct }}%</span>{% endif %}{% else %}<span class="percent-badge percent-0">-</span>{% endif %}</td>
            </tr>
            {% endfor %}
          </tbody>
        </table>
      </div>
      {% endfor %}
    </div>
    {% else %}
    <p>No subcategories yet.</p>
    {% endif %}
  </div>
  {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('th.sortable').forEach(function(header) {
    header.addEventListener('click', function() {
      const table = header.closest('table');
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const columnIndex = Array.from(header.parentNode.children).indexOf(header);
      const sortType = header.dataset.sort;
      const isAsc = header.classList.contains('sort-asc');

      // Clear sort classes from all headers in this table
      table.querySelectorAll('th.sortable').forEach(function(th) {
        th.classList.remove('sort-asc', 'sort-desc');
      });

      // Set new sort direction
      header.classList.add(isAsc ? 'sort-desc' : 'sort-asc');
      const direction = isAsc ? -1 : 1;

      rows.sort(function(a, b) {
        const aCell = a.children[columnIndex];
        const bCell = b.children[columnIndex];
        let aVal, bVal;

        if (sortType === 'number') {
          // Extract number from cell (handles % badges)
          aVal = parseFloat(aCell.textContent.replace(/[^0-9.-]/g, '')) || 0;
          bVal = parseFloat(bCell.textContent.replace(/[^0-9.-]/g, '')) || 0;
        } else {
          aVal = aCell.textContent.trim().toLowerCase();
          bVal = bCell.textContent.trim().toLowerCase();
        }

        if (aVal < bVal) return -1 * direction;
        if (aVal > bVal) return 1 * direction;
        return 0;
      });

      rows.forEach(function(row) {
        tbody.appendChild(row);
      });
    });
  });
});
</script>
