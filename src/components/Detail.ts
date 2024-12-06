import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getPbImageURL } from "../api/getPbImageURL";
import { Item } from "../@types/type";
import pb from "./../api/pocketbase";

@customElement("detail-element")
class Detail extends LitElement {
  @property({ type: Object }) product = {} as Item;
  @property({ type: String }) productId: string = "";
  @property({ type: String }) realPrice: number = 0;

  static styles?: CSSResultGroup | undefined = [
    css`
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
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("product");

    if (!id) throw new Error("id not found");
    this.productId = id;

    this.product = await pb.collection("products").getOne(id);

    this.realPrice = this.product.price;
  }

  get priceInput() {
    return this.renderRoot.querySelector<HTMLInputElement>("#price")!;
  }
  get discountInput() {
    return this.renderRoot.querySelector<HTMLInputElement>("#discount")!;
  }
  get inputs() {
    return this.renderRoot.querySelectorAll<HTMLInputElement>("input")!;
  }

  handleDiscount(e: Event) {
    const target = e.target as HTMLInputElement;

    let newPrice = this.product.price;
    let newDiscount = this.product.discount;

    newPrice = +this.priceInput.value;
    newDiscount = +this.discountInput.value;

    const ratio = newPrice * (newDiscount * 0.01);
    const realPrice = newPrice - ratio;

    console.log(realPrice);

    this.realPrice = realPrice;
  }

  handleModify(e: Event) {
    pb.collection("products")
      .update(this.productId, {
        brand: this.inputs[0].value,
        description: this.inputs[1].value,
        price: this.inputs[2].value,
        discount: this.inputs[3].value,
      })
      .then(() => {
        history.back();
      })
      .catch(() => {
        console.log("err");
      });
  }

  render() {
    const { price, brand, description, discount } = this.product;

    return html`
      <div class="container">
        <div class="wrapper">
          <div class="brand">
            <label for="brand">브랜드</label>
            <input type="text" id="brand" value="${brand}" />
          </div>

          <div class="visual">
            <img src="${getPbImageURL(this.product)}" alt="" />
          </div>

          <div class="desc">
            <label for="desc">상품 설명</label>
            <input type="text" id="description" value="${description}" />
          </div>

          <div class="price">
            <label for="price">가격</label>
            <input @input=${this.handleDiscount} type="text" id="price" value="${price}" />
          </div>

          <div class="discount">
            <label for="discount">할인율</label>
            <input @input=${this.handleDiscount} type="text" id="discount" value="${discount}" />
          </div>

          <div class="real-price">${this.realPrice.toLocaleString()}원</div>
        </div>
        <div class="buttonGroup">
          <button
            @click=${() => {
              history.back();
            }}
            type="button"
            class="cancel"
          >
            취소
          </button>
          <button @click=${this.handleModify} type="button" class="modify">수정</button>
        </div>
      </div>
    `;
  }
}
