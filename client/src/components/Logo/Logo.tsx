import { useStoreCustomerSuspense } from "@/hooks/StoreCustomer/useStoreCustomer";

function Logo() {
  const { data } = useStoreCustomerSuspense();
  if (data.length === 0) return <div>Logo</div>;
  if (data[0].logo === null) return <div>Logo</div>;

  return (
    <>
      {/* <Image
        src={data[0].logo}
        aspectRatio={1}
        alt={(data[0].nameStore as string) || "Logo"}
        width={300}
        height={300}
      /> */}
      <img src={data[0].logo} alt="Logo" width={50} height={50} />
    </>
  );
}
export default Logo;
