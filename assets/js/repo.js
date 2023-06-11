// Loading animation using setInterval
let el = document.getElementById('loading'),
  i = 0,
  load = setInterval(function () {
    i = ++i % 4;
    el.innerHTML = 'Loading' + Array(i + 1).join('.');
  }, 600);

const pager = document.getElementById("pagination");

async function getRepos(url = "https://api.github.com/users/Ahtserhsjarus/repos?per_page=4&page1") {
  const response = await fetch(url)
  const link = response.headers.get("link")
  const links = link.split(",")
  const urls = links.map(a => { return { url: a.split(";")[0].replace(">", "").replace("<", ""), title: a.split(";")[1].split('"')[1] } })
  const repos = await response.json()


  if (response.status == 200) {
    repos.forEach((repo) => {

      const printAddress = () => {
        requestStatus(repo).then((a) => {
          if (a === 200) {
            getlanguages(repo.languages_url, repo)
          } else {
            async function languages(url, repo) {
              try {
                requestUrl = await fetch(url);
                language_result = await requestUrl.json();
                post = document.createElement('article');
                post.innerHTML = `
                <header>
                  <h2>
                    <a href='${repo.html_url}' target='_blank' title='Go To Repo'>${repo.name}</a>
                  </h2>
                </header>
                <a href="#" class="image fit"><img src="images/pic02.jpg" alt="coming soon" /></a>
                <p style="text-align:center;">${Object.keys(language_result).toString()}</p>
                <p>${repo.description}</p>
                <ul class="actions special">
                  <li><a class='button' href='${repo.html_url}' target='_blank'>Go to Repo</a></li>
                </ul>`;
                document.getElementById("posts").appendChild(post);
              }
              catch { }
            }
            languages(repo.languages_url, repo);
          }
        });
      };

      if (repo.language != null && repo.name == repo.owner.login + ".github.io") {
        getlanguages(repo.languages_url, repo)
      } else {
        printAddress();
      }
    });

    document.getElementById('loading-content').hidden = true;
    document.getElementById('main').hidden = false;
    // clearInterval(load);


    urls.forEach(u => {
      const btn = document.createElement("button")
      btn.textContent = u.title;
      btn.id = "page special action";
      btn.addEventListener("click", e => getRepos(u.url));
      btn.addEventListener("click", e => clearButton());
      btn.addEventListener("click", e => clearList());
      pager.appendChild(btn);
    });
  }
}


//Clear function if an child exist
function clearList() {
  posts = document.getElementById("posts");
  while (posts.childNodes.length != 0)
    posts.removeChild(posts.firstChild)
}

function clearButton() {
  document.getElementById('loading-content').hidden = false;
  document.getElementById('main').hidden = true;
  while (pager.firstChild)
    pager.removeChild(pager.firstChild)
}

async function requestStatus(repo) {
  try {
    const response = await fetch('https://' + repo.owner.login + '.github.io/' + repo.name + '/', { method: 'GET', redirect: 'follow' });
    const result = response.status;
    return result;
  } catch (error) { }
}

async function getlanguages(url, repo) {
  try {
    requestUrl = await fetch(url);
    language_result = await requestUrl.json();
    post = document.createElement('article');
    post.innerHTML = `
    <header>
      <h2>
        <a href='${repo.html_url}' target='_blank' title='Go To Repo'>${repo.name}</a>
      </h2>
    </header>
    <a class="image fit" style="overflow: hidden;position: relative; height:250px;">
      <iframe src="https://${repo.owner.login}.github.io/${repo.name}" style="pointer-events: none; height: 900px; width:1400px; transform: scale(0.294167) !important; transform-origin: 0px 0px;" frameborder="0" scrolling="no""></iframe>
    </a>
    <p style="text-align:center;">${Object.keys(language_result).toString()}</p>
    <p>${repo.description}</p>
    <ul class="actions special">
    <li><a class='button' href="https://${repo.owner.login}.github.io/${repo.name}" target='_blank'>Demo</a></li>
    </ul>`;
    document.getElementById("posts").appendChild(post);
  } catch (error) { }
}