import{r as c,i as p,n as u,b,p as m,x as n,t as f}from"./Header-BE1Rj1YH.js";var g=Object.defineProperty,h=Object.getOwnPropertyDescriptor,d=(e,t,i,r)=>{for(var a=r>1?void 0:r?h(t,i):t,s=e.length-1,o;s>=0;s--)(o=e[s])&&(a=(r?o(t,i,a):o(a))||a);return r&&a&&g(t,i,a),a};let l=class extends b{constructor(){super(...arguments),this.fileImages=[{image:"",label:""}]}get inputs(){return this.renderRoot.querySelectorAll("input")}handleNewPost(){const e=new FormData,t=this.inputs[1];if(!t.files)throw new Error("file의 값이 들어오지 않았습니다.");this.inputs.forEach(i=>e.append(i.id,i.value)),e.append("photo",t.files[0]),m.collection("products").create(e).then(()=>{location.href="/src/pages/product/"}).catch(()=>{console.error("err!")})}handleUpload(e){const{files:t}=e.target;if(!t)throw new Error("file값이 존재하지 않습니다.");const i=Array.from(t).map(r=>({image:URL.createObjectURL(r),label:r.name}));this.fileImages=i}render(){const e=this.fileImages[0].image;return n`
      <div class="container">
        <div class="wrapper">
          <div class="brand">
            <label for="brand">브랜드</label>
            <input type="text" id="brand" />
          </div>

          <div class="visual">
            <label for="imgField"></label>
            <input @change=${this.handleUpload} type="file" id="imgField" />
            <div class="render">${e?n`<img src="${e}" alt="" />`:""}</div>
          </div>

          <div class="desc">
            <label for="description">상품 설명</label>
            <input type="text" id="description" />
          </div>

          <div class="price">
            <label for="price">가격</label>
            <input type="text" id="price" />
          </div>

          <div class="discount">
            <label for="discount">할인율(%)</label>
            <input type="text" id="discount" />
          </div>

          <div class="buttonGroup">
            <button @click=${()=>history.back()} type="button" class="cancel">취소</button>
            <button @click=${this.handleNewPost} type="button" class="add">추가</button>
          </div>
        </div>
      </div>
    `}};l.styles=[c,p`
      .container {
        padding: 2rem;
        margin: 0 auto;

        .wrapper {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 400px;
        }

        & input {
          padding: 0.5rem;
          border: 1px solid white;
          width: 100%;
        }
      }

      .buttonGroup {
        text-align: center;

        & button {
          padding: 0.5rem 1rem;
          border: 1px solid white;
          cursor: pointer;
          margin-top: 2rem;
        }

        .add {
          background-color: dodgerblue;
          color: white;
        }
      }
    `];d([u()],l.prototype,"fileImages",2);l=d([f("new-post")],l);