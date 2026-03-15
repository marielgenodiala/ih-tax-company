"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";
import { iconMap } from "./Default";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselImage {
  asset?: { _ref: string };
}

export interface ServicesCarouselItem {
  title?: string;
  description?: string;
  image?: CarouselImage;
  iconKey?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export interface ServicesCarouselProps {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: ServicesCarouselItem[];
}

/* Diagonal arrow (top-right) for the card button */
function CardArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7h-8M17 7v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Simple chevron for prev/next navigation */
function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesCarousel({
  subtitle,
  title,
  description,
  items,
}: ServicesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const slides = useMemo(
    () =>
      (items ?? []).map((item) => {
        const imageUrl = item.image?.asset?._ref
          ? urlFor(item.image).width(800).height(600).url()
          : null;
        const icon =
          item.iconKey && iconMap[item.iconKey]
            ? iconMap[item.iconKey]
            : undefined;
        return { ...item, imageUrl, icon };
      }),
    [items],
  );

  if (!slides.length) return null;

  return (
    <section className="section section--compact !bg-white" id="services">
      <div className="container">
        <RevealWrapper>
          <div className="section__header">
            {subtitle && <span className="section-label">{subtitle}</span>}
            {title && (
              <h2>
                {title
                  ? parseEmphasis(title)
                  : "Unlock Financial Freedom With Smart Choices"}
              </h2>
            )}
            {description && <p>{description}</p>}
          </div>
        </RevealWrapper>

        <RevealWrapper>
          <div className="services-carousel">
          <div className="services-carousel__row">
            <button
              type="button"
              className="services-carousel__arrow services-carousel__arrow--prev"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronIcon direction="left" />
            </button>

            <Swiper
              modules={[Pagination]}
              loop={true}
              spaceBetween={24}
              slidesPerView={1}
              slidesPerGroup={1}
              breakpoints={{
                768: { slidesPerView: 2, slidesPerGroup: 1 },
                1024: { slidesPerView: 3, slidesPerGroup: 1 },
              }}
              pagination={{
                clickable: true,
                el: ".services-carousel__pagination",
                bulletClass: "services-carousel__bullet",
                bulletActiveClass: "services-carousel__bullet--active",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onBeforeDestroy={() => {
                swiperRef.current = null;
              }}
              className="services-carousel__swiper"
            >
              {slides.map((slide, i) => {
                const href = slide.buttonHref
                  ? normalizeHref(slide.buttonHref)
                  : null;
                const cardContent = (
                  <>
                    <h3 className="services-carousel__card-title">
                      {slide.title}
                    </h3>
                    {slide.description && (
                      <p className="services-carousel__card-desc">
                        {slide.description}
                      </p>
                    )}
                    <div className="services-carousel__media-wrap">
                      {slide.imageUrl ? (
                        <div className="services-carousel__media">
                          <Image
                            src={slide.imageUrl}
                            alt={slide.title || "Service"}
                            width={480}
                            height={320}
                            className="services-carousel__img"
                          />
                        </div>
                      ) : slide.icon ? (
                        <div className="services-carousel__media services-carousel__media--icon">
                          {slide.icon}
                        </div>
                      ) : null}
                      {(slide.buttonHref || slide.buttonLabel) && !href && (
                        <Link
                          href={normalizeHref(slide.buttonHref || "#")}
                          className="services-carousel__btn-icon"
                          aria-label={slide.buttonLabel || "Learn more"}
                        >
                          <CardArrowIcon />
                        </Link>
                      )}
                      {(slide.buttonHref || slide.buttonLabel) && href && (
                        <span
                          className="services-carousel__btn-icon"
                          aria-hidden
                        >
                          <CardArrowIcon />
                        </span>
                      )}
                    </div>
                  </>
                );
                return (
                  <SwiperSlide
                    key={slide.title ?? i}
                    className="services-carousel__slide"
                  >
                    {href ? (
                      <Link
                        href={href}
                        className="services-carousel__card services-carousel__card--link"
                        aria-label={
                          slide.buttonLabel ||
                          `Learn more about ${slide.title ?? "this service"}`
                        }
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <div className="services-carousel__card">
                        {cardContent}
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button
              type="button"
              className="services-carousel__arrow services-carousel__arrow--next"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div className="services-carousel__pagination" aria-hidden="true" />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
