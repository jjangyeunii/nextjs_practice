import { getProducts } from "@/service/products";
import Link from "next/link";
import styles from "./page.module.css";

// ISR 구현 방법
// export const revalidate = 3;

export default async function ProductsPage() {
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그걸 보여줌
  // revalidate: 0이면 SSR 구현 가능
  // cache -> force-cache는 SSG로 작동, no-store는 SSR로 작동
  const products = await getProducts();
  const res = await fetch("https://meowfacts.herokuapp.com", {
    // next: { revalidate: 0 },
    cache: "no-store",
  });
  const data = await res.json();
  const factText = data.data[0];
  return (
    <>
      <h1>제품 소개 페이지!</h1>
      <ul>
        {products.map(({ id, name }, index) => (
          <li key={index}>
            <Link href={`products/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <article className={styles.article}>{factText}</article>
    </>
  );
}
