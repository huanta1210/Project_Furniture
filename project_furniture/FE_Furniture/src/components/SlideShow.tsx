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
    "https://s3-alpha-sig.figma.com/img/b922/9e94/cdac8e63c426e34dd8147b7e223eaccb?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IfL1c-xvZR~SuZ~sQeZ2Qf0iGWArotig0f8EULi0ayFDwrX7gjXABJkdhpTaxMLmAi243875n~JIVVeO818Ot4LPgXcKy60bkL3u86yBQDYowSiDGSmcWHILCBtY3KKuJsIUQfjFVWO0MiJ90c8pwImuuz1SJCrJkgIwtjZM2LWRgfHdl2N0DdPXLLLqNkFHJKpN2eAczorAC1ktCgmJC5iYDTm1eGArJasfCGYgfBIbfVYDAA~1Jil~NA2Ec91xRyUNNSrK2P-nyrSY0ai-Shke-kUK0U0eNJy9a8a51s~1dKrjwMSgfbYfAkfZD1IKz5Hk43ukyaOmy0ZuMxVULQ__",
    "https://s3-alpha-sig.figma.com/img/ad13/55ba/199164e328978d819a3de3fdc15c1bae?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AX7LDQOWpH8MwG-3uag4Sjti1EC5Yus2ZuL2RkI0zrsvZQoyam7Nc5NHG7-2MrwOcbx~GTno~5ridf3C6DjDXaCKaCXB4jYvkBHXizO4gwaaEArC4hfOyT0Pkloll2GcaNz4lN3Hgprh8-y~5fqAMcU9-~oPk64dsIrykWAJNP8OksAkBbKsgztwPw0b8vYQU6M~YCpTONcJE2~M5e5p5I8CZHoXqtaHW62JJII0yjQ6klyqeN8ppfr5bB9Lyzgtk0Kftg0nJYLeHBg7hrVOBD0n6MotgXd-~4Ow409jFwXRnFZve4Dj5gjrISNQW7EFxrwpZZ5vYqLHkM7CPxqMxA__",
    "https://s3-alpha-sig.figma.com/img/9c2f/5c30/d4db4723a6061e62a81d915b0c00bed9?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AsEx28YvE8NVFuUP9Gqb7dU1b2kmptdyKKitUBYhxWfm-O~qHn2PCgJgLhlsaEBXfNG-tJkuezwpIjd5mfeQn1ywR6ktoXz0st1R~2WZsIKcmIR40Zvr54aFOI9LccbHzw91EjaW5ZO1cjqb98WNePm0uk85gDDtDeRVC8G8mBmdtUiioD3YcSROzUMvzR50C1H~RYLW7Zv2QwCr3bfmW13nH-ahBzQLlMvs05wY~igwPBZL88BX14Hi~L7nqD6TYDQM3O4d5SYtQHnOvA27cjq7G9f-UOzql6bkzX7FpmjyuGWOWNt4zMABJoFPZkByCdc6f8wJHKn4xrJ1d73U5g__",
    "https://s3-alpha-sig.figma.com/img/5bb3/fdf0/0085f47543e899c5caa8f36bd70b330d?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cHeecjx3YS9WlpuSzQTovyRbLvMXDTWKj9ObkCrb6oQB56D9Z7td8DT2K9amUigq4DN8tKpjIKoskX4QvqIpRIg8tCvXgQzqehEKrN-ls8uTo9dnfHRlLo9OGoFzaDXgvzLjcQsxcrqezeYsvNJrx-5TLNGtohIy~Z-9FdLu3SS1Q6hw~dbUNihx4q38hz576kLpvUCAaucNz1LRahBM87KQ-I7mCgbMBFTGpZShPv4eMm~QKl8JyObuhuNaxpjmOyXgKQbPx0mPV4Z-5YSW9pmh3SgZ2eoMUhx2EoRN-Ar4qaGnjuHtqfLqsR1rRmOogSEGwVdHId~BRcCMa5BGgQ__",
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
