---
layout: page
title: Mini Painting Progress
permalink: /mini-painting/
---

<link rel="stylesheet" href="{{ '/assets/css/mini-painting.css' | relative_url }}">

<style>
/* Dynamic tab visibility - generated from site data */
{% for cat in site.data.painting.categories %}
#tab-{{ cat.id }}:checked ~ #content-{{ cat.id }}{% unless forloop.last %},
{% endunless %}{% endfor %} {
  display: block;
}

{% assign all_subs = "" | split: "" %}
{% for cat in site.data.painting.categories %}{% for sub in cat.subcategories %}{% assign all_subs = all_subs | push: sub %}{% endfor %}{% endfor %}
{% for sub in all_subs %}
#subtab-{{ sub.id }}:checked ~ #content-{{ sub.id }}{% unless forloop.last %},{% endunless %}
{% endfor %}{
  display: block;
}
</style>

<div class="tabs">
  {% for cat in site.data.painting.categories %}
  <input type="radio" id="tab-{{ cat.id }}" name="tab-group"{% if forloop.first %} checked{% endif %}>
  <label for="tab-{{ cat.id }}">{{ cat.name }}</label>
  {% endfor %}

  {% for cat in site.data.painting.categories %}
  <div class="tab-content" id="content-{{ cat.id }}">

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

<script src="{{ '/assets/js/mini-painting.js' | relative_url }}"></script>
