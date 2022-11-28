import type { NextPage } from 'next';

import Image from 'next/image';

import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import Faqs from '@/components/home/Faqs';

import UnderstandingTheModel from '../public/assets/images/home/understanding-the-model.png';
import Frame from '../public/assets/images/home/frame.png';
import Frame2 from '../public/assets/images/home/frame-2.png';
import HeaderImg from '../public/assets/images/home/header.png';
import HeaderThumb from '../public/assets/images/home/header-thumb.png';

const Home: NextPage = () => {
  return (
    <>
      <Header
        title="The Lindsay Nature Market Model"
        description="Designed to facilitate trade in environmental goods and services at the local level."
        mainImageSrc={HeaderImg}
        secondaryImageSrc={HeaderThumb}
      />

      <main id="home">
        <section className="relative">
          <svg
            width="564"
            height="817"
            viewBox="0 0 564 817"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 -top-52 opacity-10"
          >
            <path
              d="M509.394 571.561L563.772 445.756L550.692 281.445L528.353 0L0 199.437V816.999L180.919 729.847L509.394 571.561Z"
              fill="#7DBB67"
            />
          </svg>
          <div className="xl:max-w-[1130px] pl-20 2xl:pl-40 pt-32 pb-20 space-y-5 relative">
            <p className="text-green-dark text-4xl">
              It defines a set of rules and processes to optimise outcomes for
              both buyers and sellers while delivering the greatest benefit to
              the natural environment.
            </p>
            <p className="max-w-[790px]">
              This website explains the concepts underpinning the model,
              provides a step-by-step walkthrough of how it works for buyers and
              sellers, and presents a simulation of a real-world marketplace so
              you can familiarise yourself with the model and how it operates in
              a range of scenarios.
            </p>
          </div>
        </section>

        {/* Understanding the model  */}
        <section className="lg:flex lg:gap-x-10 xl:gap-x-20 xl:space-y-16 mt-20">
          <div className="max-w-[833px] relative z-10">
            <Image
              src={UnderstandingTheModel}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className="max-w-[461px]">
            <h2 className="heading-2 max-w-[343px]">Understanding the model</h2>
            <p>
              All markets have rules and processes that set out who can
              participate, what can be traded, how prices are set and how
              payment is settled.
            </p>
          </div>
        </section>

        {/*  */}
        <section className="relative mb-5">
          <div className="xl:max-w-[1130px] pl-20 2xl:pl-40">
            <div className="relative">
              <svg
                width="753"
                height="317"
                viewBox="0 0 753 317"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-24 -left-6 -z-0 max-w-[783px]"
              >
                <path
                  d="M0 96.6406L64.5562 0L571.45 38.0493L753 228.063L636.473 317L33.0938 264.945L0 96.6406Z"
                  fill="#FFFCEF"
                />
              </svg>

              <div className="max-w-[616px] relative pt-5 space-y-10">
                <div className="space-y-10 mt-5">
                  <h2 className="heading-2">
                    Optimise the financial & environmental benefits
                  </h2>
                  <p>
                    The Exeter Lindsay market model applies robust and
                    innovative thinking to optimise financial and environmental
                    benefits to all parties. To maximise the opportunities
                    presented by the model, take a few minutes to understand how
                    the model works and the ways in which it delivers better
                    outcomes for buyers, sellers and the environment.
                  </p>
                </div>

                <ul className="space-y-3 list-disc list-inside text-lg">
                  <li>
                    Building Blocks: Participants, Projects, Credits, Costs &
                    Values
                  </li>
                  <li>Bids & Offers in a Market</li>
                  <li>Choosing Winners: Surplus maximisation</li>
                  <li>Determining Payments: Division using the Shapley</li>
                </ul>

                <Button text="Find out more" link="/" />
              </div>

              <div className="max-w-[616px] mt-20 space-y-10">
                <h2 className="heading-2">Take a tour</h2>
                <p>
                  Take a guided tour of a market scenario to gain a step-by-step
                  understanding of how it works, how to participate and how to
                  maximise your opportunity as a buyer or seller.
                </p>
                <Button text="Take the tour" link="/how-it-works" />
              </div>
            </div>

            <div className="absolute -top-36 right-0">
              <Image
                src={Frame}
                alt=""
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </section>

        {/* Give it a try  */}
        <section className="pr-20 2xl:pr-40 flex gap-x-4">
          <div>
            <Image
              src={Frame2}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div>
            <div className="max-w-[430px] space-y-10 relative -mt-10 mb-28">
              <h2 className="heading-2">Give it a try</h2>
              <p>
                Get a feel for trading in markets based on Exeter Lindsay. We’ve
                created a series of simulations to give you first hand
                experience of the model and demonstrate how your choices can
                affect outcomes in different circumstances.
              </p>
              <Button text="Start trading" link="/market-sandbox" />
            </div>

            <div className="relative">
              <svg
                width="699"
                height="197"
                viewBox="0 0 699 197"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 -left-32"
              >
                <path
                  d="M97.0419 162.43L176.941 196.441L570.244 158.386L698.174 66.781C698.174 66.781 697.796 39.0802 696.701 35.9814C693.605 27.1761 650.332 -0.411052 647.84 0.00464757C645.348 0.420347 534.561 27.6298 534.561 27.6298L293.882 1.17616L0 38.0601L3.13399 106.386L97.0419 162.43Z"
                  fill="#328814"
                  fillOpacity="0.1"
                />
              </svg>
              <div className="max-w-[430px] pt-12 space-y-32">
                <h2 className="heading-2">How It Works</h2>
                <div className="space-y-10">
                  <h3 className="heading-3">
                    Optimising Natural Capital Markets
                  </h3>
                  <p>
                    The goal of the Exeter Lindsay model is to optimise trading
                    for buyers and sellers of environmental goods and services
                    to deliver the maximum environmental benefit for the lowest
                    cost by the most equitable means by enabling:
                  </p>
                  <ul className="text-green-dark list-disc list-inside pl-4">
                    <li>Accurate price discovery</li>
                    <li>Equitable settlement </li>
                    <li>Efficient resource allocation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Faqs />
      </main>
    </>
  );
};

export default Home;
