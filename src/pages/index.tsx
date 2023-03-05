import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { ProjectType } from "@/utils/baseTypes";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

type HomeProps = {
  projects: ProjectType[];
};

export default function Home({ projects }: HomeProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateElement = (event: any) => {
    const x = event.clientX;
    const y = event.clientY;

    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    const offsetX = ((x - middleX) / middleX) * 20;
    const offsetY = ((y - middleY) / middleY) * 25 * -1;

    document.documentElement.style.setProperty("--rotateX", `${offsetY}deg`);
    document.documentElement.style.setProperty("--rotateY", `${offsetX}deg`);
  };

  // add mousemove event listener to the card
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      rotateElement(e);
    });
    return () => {
      window.removeEventListener("mousemove", (e) => {
        rotateElement(e);
      });
    };
  }, []);

  const slidesJSX = projects.map((project, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="card-container">
          <div className="card" ref={cardRef}>
            <h1>{project.title.rendered}</h1>
            <span
              className="content"
              dangerouslySetInnerHTML={{
                __html: project.content.rendered,
              }}
            />
          </div>
        </div>
        ;
      </SwiperSlide>
    );
  });

  return (
    <>
      <Head>
        <title>C.Graumann :: Frontend Developer Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <main>
        <section>
          <Swiper
            slidesPerView={1}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            scrollbar={{ draggable: true }}
            loop
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
            direction="vertical"
          >
            {slidesJSX}
          </Swiper>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(context: any) {
  const projects = await fetch(
    "http://mendoza256portfolio.local/wp-json/wp/v2/project"
  ).then((res) => res.json());

  return {
    props: {
      projects,
    },
  };
}
