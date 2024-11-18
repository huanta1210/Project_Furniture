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
              src="https://s3-alpha-sig.figma.com/img/4d26/0b19/5097c12f94c7d24479be52f8550f92f8?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OTslZ5k~oH7GVy6iIES271bk7qP1tEkkwngRhzjybM9mFmVFw58scV0PPdDs5xkFp6pFSK5jDUQjOYhNmfMf3buvhPoIsdXqJSnOghPYIKp97cJ7z8-niwgQcN78zbgs0igEjZxLyorhi1zT2F8zjqFauiJ4zQ0BvB6fFxFUOocyfqUFSmUQ--YQ2S9KVbBsZri8muqJ37wB2DK1HoeqiovktM-qGHx6GjJrFHNz0Jy-QWOjIbuJ0YJWJT8RZ7R~T6hq7CmpFI6s0SNVk6jtj1xSZmJS6WjBdsgjSdALKkAESINNnpZx5OifcPAa7XCNs~MO2P9PVAXm5GniWrhNYA__"
              alt=""
            />
          </div>
          <div className="gallery-list col-span-6">
            <img
              className="h-96 w-full img-gallery"
              src="https://s3-alpha-sig.figma.com/img/1db4/6e73/69ea9e6d364518aa24f4bc45ef9ab45b?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QW~odcI4TOSv1nzhONHWsHYH4oMEWtGrSYNR6FfY~B0~EhTDimdg0E2ngcd9s~c2BgnDA9-9ELSK0qL96qQHXsxHHangUCFNVuUvW8jGVP53rnYviol3weZ9fvwuOOjMfeS~gELrmKc4eZ6RcxerNokQswgoy6ytSWsjU8cqILXKg5DeLPF5XvojsOz4gUaU0op878pYe1bjD7SK8vVJw2QIkjo1OGvQSpDl1EZ4oWun8aN3sHxuyLvHaHVvyga4SHY1k9rBhXCXxtTihl6qoNowkEc9krVPvNtHhnzS-NgN7ME3PsUsERf2WO~hl0wwM1ypcLe7fl2-agvS3QbJmg__"
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
                src="https://s3-alpha-sig.figma.com/img/eee7/6002/16f342b7d46eb351da12b9c67059716e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grpt76Aw4Nv-UrIufmOEJoFXeBI78o5LO~LFLDwJwV4lEA1FE5H~9YrhsvWA74jZBqtRFDzEOrPg6EFtNoZlRb3S34ukbVSOMTBrgdk2n68Tpsnc5t67Wv5GOZUxILmEMSux3tDnv75qtOV~CvSFoeGdee8uh60sfHP2i~D08FukEtOr5M3THrpGurPM8za8RxNYmy18yOE~7AOIwqmaTi4xUPt~3oUNJWViH0Sas~mzi1ag-fwslf3Qdp0EEOe~EECGut~nM96iWAzSfShWvQeySSaw3TsUa64LKj6koglrLW-kgY32Y4FhLGKDU8ciMux52C2Ctnjee3Ox09~lUA__"
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
                src="https://s3-alpha-sig.figma.com/img/219d/63be/156517a1826b6609d27961537666a89f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MVqgGyx2EI841DVkgxMdWvcmVlY57GIo33Ndu1bctShWxiWL6~6ej0W5wzPpzRkwrEqT4OPvi~-xXC3wYTN5jDWqKOuNv6D7QLWbguVsQh1eVTT0HkoMQvCZ~06721bRT0t6aHqgis60LZcM-OZSnprQOLRBQ~HRBdd4UFwUVRSlYCO43H0TBMok4tKKSCjtZl1j-mY7nYqx6fLRVFKt1KfYBaV~axIdVKXzHLvyRhHAz1tp9l~fNJmVU4eD5DjoCiJ1zGDo~409AJVzTWmMUNjiB34-NzZaAbEndEz8vOITFCIoMsU2fHKq7Y--zGELpUgNom4c6GkkdQxydPG9GA__"
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
                src="https://s3-alpha-sig.figma.com/img/6123/88ac/f36bc331ad5fab4596c5755edefcca97?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oj3223rjzWlwz5bi-vJrWgSAt53IIv9hM8Hdgpi9OY1YKKT~YUYShtJhaJ1WSJazGPOlT~BKy-ApNGbFJoTzi9awWPffcirxaEF1l-8OUk7Spw9-c9Lhw00iam~xczeCBs~yRv0JbFnk35g~aUsDeLhKeQ9DBUs4IJXVkzdKAvxnMLfl3AikvSSYsY5T19Q7eA75~VX8WKRQlD1guIFXZKTliRQIWJr-tfthtKfcbweRThL9SJ-A9alrjOXUthRuTi1X0SXgahXnbNIibJerQ2ZZAQLizOz9a2xglU2~EM0TX5ci4swIVNjImEM5~wKJl7TDbT-U-g4amCrg-CRjTw__"
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
                src="https://s3-alpha-sig.figma.com/img/7ed8/7a00/cc36ab0533ea3614a0c62dd9ba440715?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AhaYzDEm1TUR5aQG33jHz4tmRACVaGqphhE1ClDFp8~ZgvnBkWGqKLNxPJkf0-5bm4~Erj-fxFc1bFcy8~ak~wjhceHEHTSxJRc53pCYIFgPEycFk7NxeRMrYoii4iz5lS2h3hCUXEl5MoH61GfKitBBU7DcxpR~8XQ-8O9NKz2RaNXLw2vPys-1s7WlR~0G6dlcrCavIcKCZ9FJHWICJ25phbr~rJm5pGKtYStS~sudMG3rzaDpVFtWz~tvdvJPK4OA0WlDOYdGhGoFYav3D~YEZI7-x3571EYCCM1lCAE-NpfNZYkykXbGdZ0LE4AAjc2CRwIRL0LKqlt0wm-j~w__"
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
