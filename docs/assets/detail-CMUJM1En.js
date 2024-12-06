import{i as p,n as l,b as u,p as d,x as h,t as b}from"./Header-BE1Rj1YH.js";import{g as v}from"./getPbImageURL-DBcEJeqA.js";var g=Object.defineProperty,m=Object.getOwnPropertyDescriptor,n=(o,t,r,i)=>{for(var e=i>1?void 0:i?m(t,r):t,s=o.length-1,a;s>=0;s--)(a=o[s])&&(e=(i?a(t,r,e):a(e))||e);return i&&e&&g(t,r,e),e};let c=class extends u{constructor(){super(...arguments),this.product={},this.productId="",this.realPrice=0}connectedCallback(){super.connectedCallback(),this.fetchData()}async fetchData(){const t=new URLSearchParams(location.search).get("product");if(!t)throw new Error("id not found");this.productId=t,this.product=await d.collection("products").getOne(t),this.realPrice=this.product.price}get priceInput(){return this.renderRoot.querySelector("#price")}get discountInput(){return this.renderRoot.querySelector("#discount")}get inputs(){return this.renderRoot.querySelectorAll("input")}handleDiscount(o){o.target;let t=this.product.price,r=this.product.discount;t=+this.priceInput.value,r=+this.discountInput.value;const i=t*(r*.01),e=t-i;console.log(e),this.realPrice=e}handleModify(){d.collection("products").update(this.productId,{brand:this.inputs[0].value,description:this.inputs[1].value,price:this.inputs[2].value,discount:this.inputs[3].value}).then(()=>{history.back()}).catch(()=>{console.log("err")})}render(){const{price:o,brand:t,description:r,discount:i}=this.product;return h`
      <div class="container">
        <div class="wrapper">
          <div class="brand">
            <label for="brand">브랜드</label>
            <input type="text" id="brand" value="${t}" />
          </div>

          <div class="visual">
            <img src="${v(this.product)}" alt="" />
          </div>

          <div class="desc">
            <label for="desc">상품 설명</label>
            <input type="text" id="description" value="${r}" />
          </div>

          <div class="price">
            <label for="price">가격</label>
            <input @input=${this.handleDiscount} type="text" id="price" value="${o}" />
          </div>

          <div class="discount">
            <label for="discount">할인율</label>
            <input @input=${this.handleDiscount} type="text" id="discount" value="${i}" />
          </div>

          <div class="real-price">${this.realPrice.toLocaleString()}원</div>
        </div>
        <div class="buttonGroup">
          <button
            @click=${()=>{history.back()}}
            type="button"
            class="cancel"
          >
            취소
          </button>
          <button @click=${this.handleModify} type="button" class="modify">수정</button>
        </div>
      </div>
    `}};c.styles=[p`
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

      .real-price,
      .buttonGroup {
        text-align: center;
      }

      button {
        padding: 0.4rem 1rem;
        border: 1px solid black;
        cursor: pointer;

        margin-top: 2rem;
      }

      .cancel {
        background-color: rgb(255, 21, 185);
        color: white;
      }

      .modify {
        background-color: rgb(21, 91, 255);
        color: white;
      }
    `];n([l({type:Object})],c.prototype,"product",2);n([l({type:String})],c.prototype,"productId",2);n([l({type:String})],c.prototype,"realPrice",2);c=n([b("detail-element")],c);
