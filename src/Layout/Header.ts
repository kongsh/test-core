import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import resetCSS from "./resetCSS";
import { Auth } from "../@types/type";
import Swal from "sweetalert2";
import pb from "../api/pocketbase";
@customElement("c-header")
class Header extends LitElement {
  @state() private loginData: Auth = {} as Auth;

  static styles: CSSResultGroup | undefined = [
    resetCSS,
    css`
      header {
        display: flex;
        justify-content: space-between;
        background-color: white;
        color: black;
        padding: 1rem;

        .logo {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        nav {
          display: flex;
          align-items: center;

          ul {
            display: flex;
            gap: 0.3rem;
          }
        }
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  handleLogout(e: Event) {
    e.preventDefault();

    Swal.fire({
      title: "로그아웃",
      text: "로그아웃 하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        localStorage.removeItem("auth");
        pb.authStore.clear();
        // this.loginData.isAuth = false;
        // this.requestUpdate();
        location.reload();
      }
    });
  }

  fetchData() {
    const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
    this.loginData = auth;
  }

  render() {
    const { isAuth, user } = this.loginData;

    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img style="width:30px" src="/logo.png" alt="3D 호랑이 얼굴" /></a>
          <span>ABCMart</span>
        </h1>
        <nav>
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/src/pages/product/">Product</a></li>
            <li><a href="/">Contact</a></li>
            <li>
              ${!isAuth
                ? html`<a href="/src/pages/login/">Login</a>`
                : html`
                    <div>
                      <span>${user.name}님</span>
                      <a @click=${this.handleLogout} href="/">logout</a>
                    </div>
                  `}
            </li>
          </ul>
        </nav>
      </header>
    `;
  }
}
