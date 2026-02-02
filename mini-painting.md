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
  background: #e9ecef;
  cursor: pointer;
  border: 1px solid #dee2e6;
  border-bottom: none;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
}

.tabs label:hover {
  background: #dee2e6;
}

.tabs input[type="radio"]:checked + label {
  background: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
  z-index: 1;
  position: relative;
}

.tab-content {
  display: none;
  padding: 1.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0 4px 4px 4px;
  width: 100%;
  order: 1;
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
  background: #f8f9fa;
  cursor: pointer;
  border: 1px solid #ced4da;
  border-bottom: none;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
  font-size: 0.9rem;
}

.subtabs label:hover {
  background: #e9ecef;
}

.subtabs input[type="radio"]:checked + label {
  background: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
  z-index: 1;
  position: relative;
}

.subtab-content {
  display: none;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0 4px 4px 4px;
  width: 100%;
  order: 1;
  background: #fff;
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
  border: 1px solid #dee2e6;
  text-align: left;
}

.subtab-content th,
.tab-content th {
  background: #f8f9fa;
  font-weight: 600;
}

.subtab-content tr:hover,
.tab-content tr:hover {
  background: #f8f9fa;
}

.unit-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

.progress-summary {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.progress-bar {
  height: 24px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 1.1rem;
  font-weight: 600;
}

.percent-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 3rem;
  text-align: center;
}

.percent-0 {
  background: #e9ecef;
  color: #6c757d;
}

.percent-low {
  background: #fff3cd;
  color: #856404;
}

.percent-mid {
  background: #d4edda;
  color: #155724;
}

.percent-high {
  background: #28a745;
  color: #fff;
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
              <th>Name</th>
              <th>Painted</th>
              <th>Total</th>
              <th>%</th>
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
