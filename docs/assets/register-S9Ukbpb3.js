import{i as h,n as c,b as u,x as b,p as v,S as s,t as g}from"./Header-BE1Rj1YH.js";import{g as d}from"./index-DjKJqAo0.js";var w=Object.defineProperty,f=Object.getOwnPropertyDescriptor,p=(i,e,r,l)=>{for(var t=l>1?void 0:l?f(e,r):e,n=i.length-1,a;n>=0;n--)(a=i[n])&&(t=(l?a(e,r,t):a(t))||t);return l&&t&&w(e,r,t),t};let o=class extends u{constructor(){super(...arguments),this.valid={step1:!1,step2:!1}}render(){return b`
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
    `}get idInput(){return this.renderRoot.querySelector("#idField")}get pwInput(){return this.renderRoot.querySelector("#pwField")}handleStep1(){const i=this.renderRoot.querySelector(".wrapper");d.to(i,{x:-460,ease:"power2.inOut"});const e=this.renderRoot.querySelector(".line > div");d.to(e,{width:"70%"})}handleStep2(){v.collection("users").create({email:this.idInput.value,password:this.pwInput.value,passwordConfirm:this.pwInput.value}).then(()=>{s.fire({text:"회원가입 완료! 로그인페이지로 이동합니다!"}).then(()=>{location.href="/src/pages/login/"})}).catch(()=>{s.fire({text:"잘못된 정보를 입력하셨습니다."}).then(()=>{location.reload()})})}handleValidation(i){const e=i.currentTarget,r=e.id==="idField"?"step1":"step2";this.valid[r]=e.value.length>5,e.value.length>5?this.requestUpdate():e.value.length===4&&this.requestUpdate()}};o.styles=[h`
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
    `];p([c({type:Object})],o.prototype,"valid",2);o=p([g("c-register")],o);
