import { LitElement, html, css, CSSResultGroup } from "lit";
import resetCSS from "../Layout/resetCSS";
import { customElement, property } from "lit/decorators.js";
import pb from "../api/pocketbase";
import Swal from "sweetalert2";
import gsap from "gsap";

// @customElement("c-register")
// class Register extends LitElement {
//   @property({ type: String }) idInput = "";
//   @property({ type: String }) pwInput = "";

//   static styles?: CSSResultGroup | undefined = [
//     resetCSS,
//     css`
//       .container {
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);
//         width: 440px;
//         padding: 1rem;
//         overflow: hidden;

//         & h2 {
//           font-size: 3rem;
//           font-weight: bold;
//         }

//         .line {
//           height: 4px;
//           background-color: white;
//           margin-bottom: 1rem;

//           & div {
//             width: 30%;
//             height: 100%;
//             background: orange;
//           }
//         }

//         .wrapper {
//           width: 900px;
//           display: flex;
//           justify-content: space-between;

//           & > div {
//             width: 440px;
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }

//           & input {
//             border: 1px solid white;
//             padding: 1rem;
//             min-width: 200px;
//             margin: 0.5rem 0;
//             outline: none;
//           }

//           & button {
//             margin-top: 1.5rem;
//             background-color: dodgerblue;
//             color: white;
//             border: none;
//             padding: 1rem;
//             cursor: pointer;

//             &:disabled {
//               background-color: #848484;
//               color: black;
//               cursor: not-allowed;
//             }
//           }
//         }
//       }
//     `,
//   ];

//   render() {
//     return html`
//       <div class="container">
//         <h2>회원가입</h2>
//         <div class="line">
//           <div></div>
//         </div>
//         <div class="wrapper">
//           <div class="step-1">
//             <h3>
//               로그인에 사용할 <br />
//               아이디를 입력해주세요.
//             </h3>

//             <label for="idField"></label>
//             <input @input=${this.handleInput} type="email" id="idField" placeholder="아이디(이메일)입력" />
//             <button @click=${this.handleNext} type="button" class="next-1" disabled>다음</button>
//           </div>
//           <div class="step-2">
//             <h3>
//               로그인에 사용할 <br />
//               비밀번호를 입력해주세요.
//             </h3>

//             <label for="pwField"></label>
//             <input @input=${this.handleInput} type="password" id="pwField" placeholder="비밀번호 입력" />
//             <button @click=${this.handleRegister} type="button" class="next-2" disabled>회원가입</button>
//           </div>
//         </div>
//       </div>
//     `;
//   }

//   handleInput(e: Event) {
//     const target = e.target as HTMLInputElement;
//     if (target.id === "idField") {
//       this.idInput = target.value;
//     } else if (target.id === "pwField") {
//       this.pwInput = target.value;
//     }
//   }

//   updated(changenProperties: Map<string, unknown>): void {
//     super.update(changenProperties);

//     if (changenProperties.has("idInput")) {
//       const next1 = this.renderRoot.querySelector(".next-1") as HTMLButtonElement;
//       if (this.idInput.length > 5) {
//         next1.disabled = false;
//       } else {
//         next1.disabled = true;
//       }
//       this.requestUpdate();
//     } else if (changenProperties.has("pwInput")) {
//       const next2 = this.renderRoot.querySelector(".next-2") as HTMLButtonElement;
//       if (this.pwInput.length > 5) {
//         next2.disabled = false;
//       } else {
//         next2.disabled = true;
//       }
//       this.requestUpdate();
//     }
//   }

//   handleRegister(e: Event) {
//     e.preventDefault();

//     pb.collection("users")
//       .create({
//         email: this.idInput,
//         password: this.pwInput,
//         passwordConfirm: this.pwInput,
//       })
//       .then(() => {
//         Swal.fire({
//           text: "회원가입 완료! 로그인페이지로 이동합니다!",
//         }).then(() => {
//           location.href = `/src/pages/login/`;
//         });
//       })
//       .catch(() => {
//         Swal.fire({
//           text: "잘못된 정보를 입력하셨습니다.",
//         }).then(() => {
//           location.reload();
//         });
//       });
//   }

//   handleNext() {
//     const itemW = this.renderRoot.querySelector(".wrapper");
//     gsap.to(itemW, {
//       x: -460,
//       ease: "power2.inOut",
//     });
//     const itemD = this.renderRoot.querySelector(".line > div");
//     gsap.to(itemD, {
//       width: "70%",
//     });
//   }
// }

@customElement("c-register")
class Register extends LitElement {
  @property({ type: Object }) valid = {
    step1: false,
    step2: false,
  };

  static styles?: CSSResultGroup | undefined = [
    css`
      .container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 440px;
        padding: 1rem;
        overflow: hidden;

        & h2 {
          font-size: 3rem;
          font-weight: bold;
        }

        .line {
          height: 4px;
          background-color: white;
          margin-bottom: 1rem;

          & div {
            width: 30%;
            height: 100%;
            background: orange;
          }
        }

        .wrapper {
          width: 900px;
          display: flex;
          justify-content: space-between;

          & > div {
            width: 440px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          & input {
            border: 1px solid white;
            padding: 1rem;
            min-width: 200px;
            margin: 0.5rem 0;
            outline: none;
          }

          & button {
            margin-top: 1.5rem;
            background-color: dodgerblue;
            color: white;
            border: none;
            padding: 1rem;
            cursor: pointer;

            &:disabled {
              background-color: #848484;
              color: black;
              cursor: not-allowed;
            }
          }
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="container">
        <h2>회원가입</h2>
        <div class="line">
          <div></div>
        </div>
        <div class="wrapper">
          <div class="step-1">
            <h3>
              로그인에 사용할 <br />
              아이디를 입력해주세요.
            </h3>

            <label for="idField"></label>
            <input @input=${this.handleValidation} type="email" id="idField" placeholder="아이디(이메일)입력" />
            <button @click=${this.handleStep1} type="button" class="next-1" ?disabled=${!this.valid.step1}>다음</button>
          </div>
          <div class="step-2">
            <h3>
              로그인에 사용할 <br />
              비밀번호를 입력해주세요.
            </h3>

            <label for="pwField"></label>
            <input @input=${this.handleValidation} type="password" id="pwField" placeholder="비밀번호 입력" />
            <button @click=${this.handleStep2} type="button" class="next-2" ?disabled=${!this.valid.step2}>회원가입</button>
          </div>
        </div>
      </div>
    `;
  }

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>("#idField")!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>("#pwField")!;
  }

  handleStep1() {
    const wrapper = this.renderRoot.querySelector(".wrapper");
    gsap.to(wrapper, {
      x: -460,
      ease: "power2.inOut",
    });
    const itemD = this.renderRoot.querySelector(".line > div");
    gsap.to(itemD, {
      width: "70%",
    });
  }

  handleStep2() {
    pb.collection("users")
      .create({
        email: this.idInput.value,
        password: this.pwInput.value,
        passwordConfirm: this.pwInput.value,
      })
      .then(() => {
        Swal.fire({
          text: "회원가입 완료! 로그인페이지로 이동합니다!",
        }).then(() => {
          location.href = `/src/pages/login/`;
        });
      })
      .catch(() => {
        Swal.fire({
          text: "잘못된 정보를 입력하셨습니다.",
        }).then(() => {
          location.reload();
        });
      });
  }

  handleValidation(e: Event) {
    const target = e.currentTarget as HTMLInputElement;

    const stepKey = target.id === "idField" ? "step1" : "step2";
    this.valid[stepKey] = target.value.length > 5;

    if (target.value.length > 5) this.requestUpdate();
    else if (target.value.length === 4) this.requestUpdate();
  }
}
