"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import RevealWrapper from "@/components/ui/RevealWrapper";

import "swiper/css";

interface LogoItem {
  image?: string;
  alt: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export interface LogoCloudCarouselProps {
  title?: string;
  logos?: LogoItem[];
}

const fallbackLogos: LogoItem[] = [
  { image: "/images/cpaLogo.avif", alt: "CPA Australia" },
  { image: "/images/taxAgentLogo.avif", alt: "Registered Tax Agent" },
];

export default function LogoCloudCarousel({
  title,
  logos,
}: LogoCloudCarouselProps) {
  const items = (logos && logos.length > 0 ? logos : fallbackLogos).filter(
    (logo) => logo.image,
  );

  if (!items.length) return null;

  /* Duplicate items so Swiper loop has enough slides for seamless infinite scroll at all breakpoints (up to 6 visible) */
  const loopItems = [...items, ...items, ...items];

  return (
    <section className="section logo-cloud-carousel">
      <div className="container">
        <RevealWrapper>
          <div className="section__header">
            <h2>
              {title || "Trusted by professional bodies, banks & regulators"}
            </h2>
          </div>
        </RevealWrapper>
      </div>

      <RevealWrapper>
        <div className="logo-cloud-carousel__track-wrapper">
          <div className="logo-cloud-carousel__track">
            <Swiper
            modules={[Autoplay]}
            loop
            loopAdditionalSlides={6}
            spaceBetween={32}
            slidesPerView={2}
            slidesPerGroup={1}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            autoplay={{
              // Very small delay + long speed + linear timing ≈ continuous train
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={4000}
            allowTouchMove={false}
            className="logo-cloud-carousel__swiper"
          >
            {loopItems.map((logo, index) => {
              const content = (
                <Image
                  src={logo.image as string}
                  alt={logo.alt}
                  width={140}
                  height={80}
                  className="logo-cloud-carousel__logo"
                />
              );

              return (
                <SwiperSlide
                  key={`${logo.alt}-${index}`}
                  className="logo-cloud-carousel__slide"
                >
                  <div className="logo-cloud-carousel__item">
                    {logo.buttonHref ? (
                      <Link
                        href={logo.buttonHref}
                        className="logo-cloud-carousel__link"
                        aria-label={logo.buttonLabel || logo.alt}
                      >
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
            </Swiper>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
