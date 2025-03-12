//✅Този ред импортира хука useState, който позволява управлението на състоянието в компоненти той се използва в компонента FilterableProductTable, за да съхранява:
import { useState } from "react";

//✅Главен компонент: FilterableProductTable
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  //✅Този компонент държи в състоянието filterText
  const [inStockOnly, setInStockOnly] = useState(false);
  //✅И inStockOnly.

  return (
    <div>
      {/* ✅Те се предават към SearchBar за контролиране на входните полета и към 
      ProductTable, за да се филтрират продуктите.*/}

      <SearchBar //✅Филтър за търсене: SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

//✅Категория на продукта: ProductCategoryRow.
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
  //✅Този компонент просто показва заглавие за категорията в таблицата.
}

//✅Продукт: ProductRow
function ProductRow({ product }) {
  const name = product.stocked ? (
    //✅Ако продуктът е наличен (stocked е true), името се показва нормално.
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
    //✅Ако продуктът не е наличен, името се оцветява в червено.
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

//✅Таблица с продукти: ProductTable
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      //✅Филтрира-filterText и inStockOnly.
      //✅Добавя заглавен ред за всяка категория, ако се среща за първи път.
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
    //✅Сортира продуктите в таблица.
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        //✅Текстово поле (input[type="text"]) за въвеждане на търсената дума. При промяна извиква onFilterTextChange, за да обнови състоянието в FilterableProductTable.
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          //✅Чекбокс (input[type="checkbox"]), който позволява показване само на налични продукти. При промяна извиква onInStockOnlyChange.
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

//✅Масив с примерни продукти
//✅масив съдържа продукти с категории, имена, цени и информация за наличност.
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
//✅основният компонент, който рендерира FilterableProductTable с предоставения списък от продукти.
