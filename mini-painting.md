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
      <div class="subtab-content" id="content-{{ sub.id }}">
        <h3>{{ sub.name }}</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Painted</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {% for item in items %}
            <tr>
              <td>{% if item.logo %}<img src="{{ item.logo }}" alt="" class="unit-logo">{% endif %}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.painted }}</td>
              <td>{{ item.total }}</td>
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
