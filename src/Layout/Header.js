import { LitElement, html, css } from "lit";
import resetCSS from "./resetCSS";

class Header extends LitElement {
  static get styles() {
    return [
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
  }

  constructor() {
    super();

    this.render();
  }

  render() {
    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img style="width:30px" src="/logo.png" alt="3D 호랑이 얼굴" /></a>
          <span>ABCMart</span>
        </h1>
        <nav>
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/">Product</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Login</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("c-header", Header);
