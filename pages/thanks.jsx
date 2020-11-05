import Container from "../components/container";
import Layout from "../components/layout";
import { useCart, useDispatchCart } from "../components/cart/cart-context";
import Header from "../components/header";
import Link from "next/link";

export default function Thanks() {
  const { state } = useCart();
  const dispatch = useDispatchCart()
  const handleRemoveAll = () => {
    dispatch({
      type: "CLEAR",
    });
  };
  return (
    <>
      <Layout showCartButton={"false"}>
        <Container>
          <Header />
          <div className="w-full flex flex-col flex-wrap items-center">
            <div className="w-full flex flex-col md:w-1/2">
              <p className="mb-4">
                Thank you purchasing <span className="italic">{state.length > 0 && state.map((i) => i.item).join(", ")}</span>
                . A list of your items has been sent to Santa Claus and your items will
                arrive in late December*.
              </p>
              <div className="w-full text-center my-6 justify-center">

              <img src="/images/santa.gif" className="mx-auto" alt="" />
              </div>
              <p>Return to the <Link href="/"><a onClick={() => handleRemoveAll()} className="border-b border-dashed border-blue-700">home screen</a></Link> to do some more shopping!</p>
              <p className="mt-10 text-xs">
                * Average delivery time is 2-4 months. If you have not received
                your items before the year 2031, please contact us and we might
                issue a refund.
              </p>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}
