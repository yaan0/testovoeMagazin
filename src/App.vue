<script setup>
import { ref, onMounted, computed } from "vue";
import { useLoadProduct } from "./store/loadProduct";
import Header from "./components/Header.vue";

const loadProduct = useLoadProduct();

const selectedProduct = ref(null);
const count = ref(0);

const newItemsProducts = ref([]);

const totalPrice = computed(() => {
  if (selectedProduct.value && count.value > 0) {
    return selectedProduct.value.price * count.value;
  } else {
    return 0;
  }
});

const addProduct = () => {
  if (selectedProduct.value && count.value > 0) {
    const newProduct = {
      name: selectedProduct.value.title,
      quantity: count.value,
      price: selectedProduct.value.price,
    };
    newItemsProducts.value.push(newProduct);
    console.log(newItemsProducts);
    count.value = 0;
  }
};

onMounted(loadProduct.loadProducts);
</script>

<template>
  <div>
    <Header />

    <div class="content">
      <div class="content_product">
        <div class="wrapper_select_product">
          <h3 class="title_select_product">Выберите продукцию</h3>
          <select
            class="select_product"
            name="Выберите продукт"
            id="item"
            v-model="selectedProduct"
          >
            <option value="" disabled>Выберите продукт</option>
            <option
              v-for="product in loadProduct.items"
              :key="product.name"
              :value="product"
            >
              {{ product.title }}
            </option>
          </select>
        </div>

        <div class="wrapper_input_product">
          <h3>Введите количество</h3>
          <input
            class="input_product"
            type="number"
            placeholder="0"
            v-model.number="count"
          />
        </div>
        <button
          class="btn_product"
          @click="addProduct"
          @keyup.enter="addProduct.stop"
        >
          Добавить
        </button>
      </div>

      <div class="table">
        <div class="table-top">
          <h3 class="table-top_name">Название товара</h3>
          <h3>Количество</h3>
          <h3>Стоимость</h3>
        </div>
        <div class="table-bottom" v-for="item in newItemsProducts" :key="item">
          <span class="table-top_name">
            {{ item.name }}
          </span>
          <span>
            {{ item.quantity }}
          </span>
          <span>
            {{ item.price }}
          </span>
        </div>
      </div>
    </div>

    <hr />
    <h3>Итого: {{ totalPrice }} руб.</h3>
  </div>
</template>

<style lang="css" scoped>
.content {
  display: flex;
  gap: 50px;
}

.content_product h3 {
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  font-family: "Roboto";
  color: #222222;
}

.select_product {
  width: 294px;
  height: 40px;
  background: #eef8ff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 300;
  line-height: 28px;
  padding: 10px;

  color: #0170ae;
}

.input_product {
  border: none;
  background: #eef8ff;
  width: 294px;
  height: 40px;
  padding: 10px;
}
.btn_product {
  margin-top: 45px;
  width: 100%;
  height: 15%;
  background: #2fa6ea;
  border: 1px solid #000000;
  border-radius: 4px;
  color: #ffffff;
}

.table {
  width: 100%;
}
.table-top,
.table-bottom {
  display: flex;
  gap: 30px;
}

.table-top {
  color: #2fa6ea;
}

.table-top_name {
  margin-right: auto;
}
</style>
