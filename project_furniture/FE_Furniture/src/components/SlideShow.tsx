import Slider from "react-slick";

const SlideShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "ease-in-out",
  };
  const images = [
    "https://s3-alpha-sig.figma.com/img/b922/9e94/cdac8e63c426e34dd8147b7e223eaccb?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CCofwSctCVZcLCnlAkujGfhxN33ABIkbcv0etIRAvkoVCfqJJVI7YLnD-ZShQTbIeoc-BB93TTrLDd2KTIEo8UWEBI-xqxLsSI3hHpnxMkLVguGIQcC7dchk~Th~gL1wmJm971sUHQ9oxCuTnwlOAJBvSzWlnWv6RVu6KSWexyQ1KuU4-KYAbk8pXEfJl5zN4fpUKHTYJ2RXOW~IRmX0Zu0EBKRW0cjRRA4pKgISVRuoCMlsp1ByH3npxTg2y2Uexdo9vf27oYabvizapiCcgSPeRVgpikAw~1ND-Za93MXdqIjhsH7xJeAY8tUrlWJ8qssKc5bjZAhMxHKMoTl~Ww__",
    "https://s3-alpha-sig.figma.com/img/5bb3/fdf0/0085f47543e899c5caa8f36bd70b330d?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FSK7iPMSpGJRa~bgCXzkZqbJHRC4x6E8XkOaWsXxP85VbOwAAkrNXgPGtzBt7lj6qyTJYYVc1yta7Xj4mP5PI3tzHGZAuqPlfnAA~F3Y-jw7r5kkurgYkkVGLJGX4sHEASkKglhTSAsLhOOd~c8kMDqkmvFxQiWRKI7f72c2pJAay08HrQ35wT50HPTRt9qFe6JxUlyVrFF3TB~w7Z6zT522-i8dIAdVNcfUT4PGXgh90L194619MY9jFTBw7~4H3T-HQ7uMYUpNNNyyYT9i-ClcMuH9BPJrWvqY3BXV2pLRfZgrJQBmR-h44gCSQjtB7e9D6rl4PgdkrNL0nMEwBA__",
  ];
  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{ height: "800px", width: "100%" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
