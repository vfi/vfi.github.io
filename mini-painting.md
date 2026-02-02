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

#tab-infinity:checked ~ #content-infinity,
#tab-warcrow:checked ~ #content-warcrow {
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

#subtab-o12:checked ~ #content-o12,
#subtab-starmada:checked ~ #content-starmada,
#subtab-torchlight:checked ~ #content-torchlight {
  display: block;
}
</style>

<div class="tabs">
  <input type="radio" id="tab-infinity" name="tab-group" checked>
  <label for="tab-infinity">Infinity</label>

  <input type="radio" id="tab-warcrow" name="tab-group">
  <label for="tab-warcrow">Warcrow</label>

  <div class="tab-content" id="content-infinity">
    <h2>Infinity</h2>

    <div class="subtabs">
      <input type="radio" id="subtab-o12" name="infinity-subtab" checked>
      <label for="subtab-o12">O-12</label>

      <input type="radio" id="subtab-starmada" name="infinity-subtab">
      <label for="subtab-starmada">Starmada</label>

      <input type="radio" id="subtab-torchlight" name="infinity-subtab">
      <label for="subtab-torchlight">Torchlight Brigade</label>

      <div class="subtab-content" id="content-o12">
        <h3>O-12</h3>
        <p>Your O-12 miniatures progress will go here.</p>
      </div>

      <div class="subtab-content" id="content-starmada">
        <h3>Starmada</h3>
        <p>Your Starmada miniatures progress will go here.</p>
      </div>

      <div class="subtab-content" id="content-torchlight">
        <h3>Torchlight Brigade</h3>
        <p>Your Torchlight Brigade miniatures progress will go here.</p>
      </div>
    </div>
  </div>

  <div class="tab-content" id="content-warcrow">
    <h2>Warcrow</h2>
    <p>Your Warcrow miniatures progress will go here.</p>
    <!-- Add your Warcrow content here -->
  </div>
</div>
