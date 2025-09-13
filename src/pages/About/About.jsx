import React from "react";
import "./About.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <>
      <main className="bg-white text-gray-800">
        <section id="about" className="py-12 px-4 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              Welcome to Thangathai Fireworks
            </h3>
            <p className="text-center text-lg font-semibold text-red-600 mb-6">
              EXCLUSIVE STORE
            </p>
            <p className="leading-relaxed mb-6 text-justify">
              We have started a store for selling fireworks named{" "}
              <span className="font-semibold">Thangathai Fireworks</span>. We
              provide a variety of firecrackers including single and multi-sound
              crackers, sparklers, ground chakkars, flower pots, twinkling
              stars, pencils, fancy rockets, aerial and fancy fireworks,
              whistling varieties, amorces, chorsa garlands, atom crackers,
              ukkada, and electric crackers.
            </p>
            <p className="leading-relaxed mb-6 text-justify">
              We are specialists in fireworks gift boxes, with prices ranging
              from <span className="font-semibold">₹250 to ₹2500</span>. Every
              year we introduce new crackers and packages for our beloved
              customers. Check out our online shopping cart to buy crackers
              online — hassle-free!
            </p>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">What We Do</h3>
            <p className="mb-4">
              We are proud to introduce ourselves as an{" "}
              <span className="font-semibold">online store</span> to sell
              crackers.
            </p>
            <p className="leading-relaxed mb-6 text-justify">
              This venture is an outcome of the experience and knowledge we have
              gained in the field of selling crackers. We are wholesale traders
              of multi-brand firecrackers in{" "}
              <span className="font-semibold">Sivakasi</span>, and have been in
              this business since 2005 with our own exclusive showroom.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Best Quality at the Best Price
            </h3>
            <p className="mb-4">
              One can buy crackers from us year-round. To make it easier, we
              launched our online store — so you can shop anytime, anywhere!
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                No need to stand in long queues — shop from home with one click.
              </li>
              <li>Simple and convenient selection process.</li>
              <li>
                All varieties come with detailed descriptions for better
                choices.
              </li>
              <li>
                Be a part of our celebrations — we’d love to light up your
                festivals!
              </li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Online Ordering
            </h3>
            <p className="leading-relaxed text-justify">
              Thanks to our online customers! We ensure excellent customer
              service even after sales through direct interaction. Our online
              family is growing every day. Keep visiting our website to enjoy{" "}
              <span className="font-semibold">
                special discounts during festivals and functions
              </span>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
