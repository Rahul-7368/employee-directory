<div class="employee-list">
  {{#each employees}}
  <div class="employee-card">
    <h3>{{firstName}} {{lastName}}</h3>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Department:</strong> {{department}}</p>
    <p><strong>Role:</strong> {{role}}</p>
    <div class="card-actions">
      <button class="edit-btn" data-id="{{id}}">Edit</button>
      <button class="delete-btn" data-id="{{id}}">Delete</button>
    </div>
  </div>
{{/each}}
</div>

