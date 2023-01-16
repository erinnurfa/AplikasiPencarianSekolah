class NavCustom extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div class="container-fluid">
                    <span class="text-muted">Data Sekolah Indonesia</span>
                    <span class="text-muted d-none d-lg-block">Aplikasi ini menggunakan <span class="text-warning">API Kemendikbud</span></span>
                </div>
            </nav>
        `;
    }
}

customElements.define('nav-custom', NavCustom);