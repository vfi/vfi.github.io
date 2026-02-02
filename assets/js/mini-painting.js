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
