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
  <label for="tab-{{ cat.id }}">{% if cat.icon %}<img src="{{ cat.icon }}" alt="{{ cat.name }}" class="tab-icon">{% else %}{{ cat.name }}{% endif %}</label>
  {% endfor %}

  {% for cat in site.data.painting.categories %}
  <div class="tab-content" id="content-{{ cat.id }}">

    {% if cat.subcategories.size > 0 %}
    <div class="subtabs">
      {% for sub in cat.subcategories %}
      <input type="radio" id="subtab-{{ sub.id }}" name="{{ cat.id }}-subtab"{% if forloop.first %} checked{% endif %}>
      <label for="subtab-{{ sub.id }}">{% if sub.icon %}<img src="{{ sub.icon }}" alt="" class="subtab-icon">{% endif %}{{ sub.name }}</label>
      {% endfor %}

      {% for sub in cat.subcategories %}
      {% assign data = site.data[sub.data_file] %}
      {% assign total_painted = 0 %}
      {% assign total_items = 0 %}
      {% if data.grouped %}
        {% for group in data.groups %}
          {% for item in group.items %}
            {% assign total_painted = total_painted | plus: item.painted %}
            {% assign total_items = total_items | plus: item.total %}
          {% endfor %}
        {% endfor %}
      {% else %}
        {% for item in data %}
          {% assign total_painted = total_painted | plus: item.painted %}
          {% assign total_items = total_items | plus: item.total %}
        {% endfor %}
      {% endif %}
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
        {% if data.grouped %}
          {% for group in data.groups %}
          {% assign group_painted = 0 %}
          {% assign group_total = 0 %}
          {% for item in group.items %}
            {% assign group_painted = group_painted | plus: item.painted %}
            {% assign group_total = group_total | plus: item.total %}
          {% endfor %}
          {% if group_total > 0 %}
            {% assign group_pct = group_painted | times: 100 | divided_by: group_total %}
          {% else %}
            {% assign group_pct = 0 %}
          {% endif %}
          <div class="group-header">
            <h3 class="group-heading">{{ group.name }}</h3>
            <div class="group-progress">
              <div class="group-progress-bar">
                <div class="group-progress-fill" style="width: {{ group_pct }}%;"></div>
              </div>
              <span class="group-progress-pct">{{ group_pct }}%</span>
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
              {% for item in group.items %}
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
          {% endfor %}
        {% else %}
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
            {% for item in data %}
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
        {% endif %}
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
