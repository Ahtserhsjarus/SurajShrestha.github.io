const tableRow = document.querySelector(".table");

fetch("https://api.github.com/users/Ahtserhsjarus/repos").then((res) =>
  res.json().then((data) => {
    let tr = `<tr>
    <th>SN</th>
    <th>Repositories
    </th>
    <th>Description</th>
    <th>URL Link</th>
    <th>Demo Link</th>
    <th>Language</th>
</tr>`;

    data.forEach((repo) => {
      tr += `<tr class="tableRow">
      <td>${repo.id}</td>
        <td>${repo.name}</td>
        <td>${repo.description}</td>
        <td><a href='${repo.html_url}' target=_blank><button>GO TO Repo</button></a></td>
        <td><a href='https://${repo.owner.login}.github.io/${repo.name}/' target=_blank><button>Demo</button></a></td>
        <td>${repo.language}</td></tr>`;
      tableRow.innerHTML = tr;
    });
  })
);
