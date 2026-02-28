//const path = "/hitest/src/party-piraten";
const path = "/";

class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
                <div class="container-fluid"><a class="navbar-brand" href="${path}/index.html">Knight Duck Club</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04"
                        aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation"><span
                        class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarsExample04">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="${path}/index.html">Main Version</a></li>
                        <li class="nav-item"><a class="nav-link disabled" href="${path}/html/alternative.html" aria-disabled="true">Alternative Version</a></li>
                        <li class="nav-item"><a class="nav-link active" href="${path}/html/statistics.html">Statistics</a></li>
                    </ul>
        
                    <div class="d-flex flex-column flex-md-row mt-2 mt-md-0 ms-md-auto">
                        <div class="dropdown w-100 w-md-auto">
                            <button class="btn btn-outline-light dropdown-toggle w-100 w-md-auto" type="button"
                                    id="themeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-circle-half-stroke me-2"></i>Theme
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
                                <li>
                                    <button class="dropdown-item d-flex align-items-center" data-theme="light">
                                        <i class="fa-solid fa-sun me-2"></i>Light
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item d-flex align-items-center" data-theme="dark">
                                        <i class="fa-solid fa-moon me-2"></i>Dark
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item d-flex align-items-center" data-theme="auto">
                                        <i class="fa-solid fa-desktop me-2"></i>System
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
    }
}

customElements.define("my-navbar", Navbar);

