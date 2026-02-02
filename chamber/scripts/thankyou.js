
    const urlParams = new URLSearchParams(window.location.search);
    const fields = [
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Organizational Title", key: "orgTitle" },
      { label: "Email", key: "email" },
      { label: "Mobile Number", key: "phone" },
      { label: "Business Name", key: "businessName" },
      { label: "Membership Level", key: "membershipLevel" },
      { label: "Description", key: "description" },
      { label: "Timestamp", key: "timestamp" }
    ];

    const formDataDiv = document.querySelector('.form-data');

    fields.forEach(field => {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${field.label}:</strong> ${urlParams.get(field.key) || ''}`;
      formDataDiv.appendChild(p);
    });
  