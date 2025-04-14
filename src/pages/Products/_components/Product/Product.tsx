import { Button } from "@/components/ui/button";

const Product = () => {
  return (
    <div className="max-w-[120px] flex flex-col justify-between">
      <div className="w-full h-[120px] bg-gray-200 rounded-md overflow-hidden">
        <img
          src="https://eg.hm.com/assets/styles/HNM/14482498/6103a8463876770c30cdba3535b7be1f333315fe/2/image-thumb__3464789__product_listing/cb91f8f128ac2125e0ec3a008a2e8d2497d15434.jpg"
          alt=""
        />
      </div>
      <h2 className="text-md mt-2 mb-3 w-full whitespace-nowrap overflow-hidden ">
        Title
      </h2>
      <h3 className="text-md">Price</h3>
      <Button>Add to cart</Button>
    </div>
  );
};

export default Product;
