import React, { useContext } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SlideShow from "../../components/SlideShow";
import { ProductContext } from "../../store/contexts/ProductContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../store/contexts/CartContext";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <MainPage />
      <Footer />
    </>
  );
};

const MainPage: React.FC = () => {
  const { state } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div className="mb-4">
        <SlideShow />
      </div>
      <div className="mt-10 mx-44">
        <div className="mb-7">
          <div className="main-title inline-block">
            <p className="text-3xl font-bold ">New Products</p>
          </div>

          <div className="main-all-product float-right">
            <button className="border-2 border-yellow-300 p-2 rounded text-amber-300 font-semibold">
              View all product
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          {state.products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              className="product w-56 bg-gray-50 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]"
            >
              <Link to={`/details/${product._id}`}>
                <img
                  className="h-64 w-full"
                  src={product.imageProduct}
                  alt=""
                />
              </Link>
              <p className="title ml-2 font-semibold">{product.productName}</p>
              <p className="description ml-2 text-sm py-1 text-gray-400 ">
                {product.description.slice(0, 19)}
              </p>
              <p className="price text-lg text-red-500 font-semibold py-2 ml-2">
                {product.price} $
              </p>
              <div>
                <button
                  className="border border-black rounded py-2 px-4 ml-3 bg-white hover:text-black hover:bg-black transition-all duration-1000
                   hover:bg-black mr-3"
                >
                  <i className="fa-regular fa-heart text-black hover:text-white"></i>
                </button>
                <button
                  onClick={() =>
                    addToCart({
                      product: {
                        _id: product._id,
                        productName: product.productName,
                        price: product.price,
                        description: product.description,
                        stock: product.stock,
                        imageProduct: product.imageProduct,
                        categoriesId: product.categoriesId,
                      },
                      quantity: 1,
                    })
                  }
                  className="mb-2 border border-black font-semibold bg-white rounded text-black py-2 px-10 ml-2 whitespace-nowrap hover:bg-black transition-all duration-1000 hover:text-white "
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-44 mt-6">
        <div className="mb-7">
          <div className="main-title inline-block">
            <p className="text-3xl font-bold ">Gallery</p>
          </div>

          <div className="main-all-product float-right">
            <button className="border-2 border-yellow-300 p-2 rounded text-amber-300 font-semibold">
              View all gallery
            </button>
          </div>
        </div>
        <div className="gallery grid grid-cols-12 gap-4 my-5">
          <div className="gallery-list col-span-6">
            <img
              className="h-96 w-full img-gallery"
              src="https://s3-alpha-sig.figma.com/img/33a1/6db2/6997f752b489f4a7590ce7a86e061493?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UW~-M917194~94aPMJ2c8L0Vho-wpbfK6OAau6Xfp9ZRiTTrgIGcng~17Wy84e7VDzc~na5YcMJzAb4o1R5OYsAFusAXDhkXrlMweAPxr0VpqNASEFfwBxNGPKCxBn0xKw~jm7zJOV2Kvmz1eixI6gvUCTgMQQWHPqN5yFFGyYEekWgW77MxeorxwC4oNMzcRE4kXVo2REMMMmVRgsWSz6XLQneOl-wBiD3PdOi3okk8vn-PtKRM1eEiBXYl4aTq5gcWa01sAMgemZybQdVPnnMM5crHMJ~Lw4JJxKbALxm0e78FWb8jBC4YWQZeD-curAkCVNWJjuV-6-PYqZNY6A__"
              alt=""
            />
          </div>
          <div className="gallery-list col-span-6">
            <img
              className="h-96 w-full img-gallery"
              src="https://s3-alpha-sig.figma.com/img/0a1a/341e/7a1e963905a8a882e05f979d82d05601?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NzfN-9YDgh15Zlq9OyWLG9g8l7JoEZ4-x-167bYdN1YMXoIWy0hJ~JiZATESIn~IzWdN6XaAglWSkr~T4f56~GHCktjeLIk5PiznRBbVk2IGEa-5SH3ixMLwIpONJ4G8s6PY4GSZPqxqdBJxcLIkctWrzwlh-0KhF90ht3vZdhEfVELzvC4lfVwZ4vg9xlv5~3j3UIOefkuVWWFBjm8MfGKqFIj0zwr1QyiUCoJUOfSqVl9jCjbvQ09nNtG~QOMK8V2AXWA4RS6ReunuPpCfV0fxcFboLecBVIZcWOcFQoWbPPjrbavcxetC8T1-~18z1bsSDZ~8BEy4d92Mw5Apog__"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="main-new mx-44 mt-10">
        <div className="mb-7">
          <div className="main-title inline-block">
            <p className="text-3xl font-bold ">News</p>
          </div>

          <div className="main-all-product float-right">
            <button className="border-2 border-yellow-300 p-2 rounded text-amber-300 font-semibold">
              View all news
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-between mb-10">
          <div className="product flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]">
            <Link to="">
              <img
                className="h-56 w-full"
                src="https://s3-alpha-sig.figma.com/img/eee7/6002/16f342b7d46eb351da12b9c67059716e?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nYyZeztct9KKFp9AF-FDj~DTZTKw~gpiXkTz0yvbJqOvuIkS6Ybs6X5-qhMXp-idLjfIeK7P6WzKbld27~5ZbVTM4NrE2jJfeOoz~P6vgqYQLLXSrNr9YO5D9dWxiGOp2ziMGg1SIyZj3NyYErEIZ3vSRcLgMm9FF~4ZXj~qZ5UEhtyJ40m5FjRiV8YtlKhelMKubxoK3mtvlu7SW-SlXnVIbQmrsNIr18kkLoKwYwoujZ-pwky7VzPj7nSczZYSzqZ4q9YHAPKpSJlPGXN5Rs9Grc2DzI~nvvazHz7p-5xkza3hoLJASEX52qlEH-ezFnfrDJDEoTnylMm1vqFM9g__"
                alt=""
              />
            </Link>
            <p className="description text-gray-300 mt-1">
              <i className="ti ti-calendar"> 24/04/2024</i>
            </p>
            <p className="title font-semibold">
              A bedroom must have something like this
            </p>
            <a href="">
              <p className="price text-xs pt-2 text-red-500 font-semibold ">
                Xem chi tiết <i className="ti ti-arrow-right"></i>
              </p>
            </a>
          </div>

          <div className="product flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]">
            <a href="">
              <img
                className="h-56 w-full"
                src="https://s3-alpha-sig.figma.com/img/7ed8/7a00/cc36ab0533ea3614a0c62dd9ba440715?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MP8xVAHpqulsYbhyRYiOKmoqOvtGUEiLV8efhQJ2B2J5c9UvphAjyoYvk8-nvhI445Bm4UlcFPDsCusYIVUcrcK2uQBbm~5SEUmFQQI94H7cCTR2FpstRVAQOM9a9YreLCwKjOF5u39ae0uXiimgov0nqvG5rcBWbx~s0RRxu3ZOP4D1KeYfovqZuAm5ZW7Q-0VjJuDdCcWh85FJm-nm0634ZHqjuy8J6ArajbhKQewaOsM60PbADAH390BPtGT9Ie2CQqc-r5S5rqYjjPmvKhksV--9DYe297gHQh~2b59fVdFUCfx5V-EnBN-x46yJK7VtL6QMytOX8~rc3L9egA__"
                alt=""
              />
            </a>
            <p className="description text-gray-300 mt-1">
              <i className="ti ti-calendar"> 24/04/2024</i>
            </p>
            <p className="title font-semibold">
              A bedroom must have something like this
            </p>
            <a href="">
              <p className="price text-xs pt-2 text-red-500 font-semibold ">
                Xem chi tiết <i className="ti ti-arrow-right"></i>
              </p>
            </a>
          </div>

          <div className="product flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]">
            <a href="">
              <img
                className="h-56 w-full"
                src="https://s3-alpha-sig.figma.com/img/6123/88ac/f36bc331ad5fab4596c5755edefcca97?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MilzdLU-oBqekkXnJan1MSy9~wmspi4REUml0Eu5zZAa~O48UNyMP4km0LsuPpRxxRnqTcxtsC6SqitDn0xN4lAjtvtAdBWnNSLK95aLsgpqd~wIU-W9ejcNRhMihESFc9NwblgAVIAhQ~LLW-dVr9~-hRgOmXyO6KJeSrr5ckgQF9E3UmkeVPfN-pXF4NTF8ES-DKndl5pfqPk~FPWelP56-r87aq7TXE-BfTDQevK0YOgSk8z5LpHhV9-SVqRYEGp5UYHlM9LBs8jgnpxWwmY48675vjewQnMAVdzJJ41HKiq6HXi2YqDicp0ck-elAEd251WXQYiQ6DYVhbIQOQ__"
                alt=""
              />
            </a>
            <p className="description text-gray-300 mt-1">
              <i className="ti ti-calendar"> 24/04/2024</i>
            </p>
            <p className="title font-semibold">
              A bedroom must have something like this
            </p>
            <a href="">
              <p className="price text-xs pt-2 text-red-500 font-semibold ">
                Xem chi tiết <i className="ti ti-arrow-right"></i>
              </p>
            </a>
          </div>

          <div className="product flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]">
            <a href="">
              <img
                className="h-56 w-full"
                src="https://s3-alpha-sig.figma.com/img/219d/63be/156517a1826b6609d27961537666a89f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fFbfROyeXxJAun2B2-ixq~PZxc75h2q2VfPVc7DkFuodIOSAgDGOBNTJV8bnHYyBj94VpXQdX4A1HFR3xUJS-Kl7BConavbqEKv79k0HjyzMvtj5aBu65aeC5zOn7G85ozarvF7Qx6AgqcUMwbnOvCgiQ2Ks73z114YruV3lK44Ve6JGCd~ExALei86RUicZ1hGExDrw3ofkf9rDBXi9IYXMnEmoZ-YEc7U-zEeBZetnq5qS5EOcRsh-Jx0cC~lnrpPKvd2iNVM8MuD7-w2wS5K929liJgZwQ2ksXQyR57UeaG9rpto8KCm5nR74xsmJqP-1TUPqbUqZq4pNAUK5pA__"
                alt=""
              />
            </a>
            <p className="description text-gray-300 mt-1">
              <i className="ti ti-calendar"> 24/04/2024</i>
            </p>
            <p className="title font-semibold">
              A bedroom must have something like this
            </p>
            <a href="">
              <p className="price text-xs pt-2 text-red-500 font-semibold ">
                Xem chi tiết <i className="ti ti-arrow-right"></i>
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
