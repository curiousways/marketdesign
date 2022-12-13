import type { NextPage } from 'next';

import Image from 'next/image';

import { Header } from '@/components/Header';
import { ImageTextGrid } from '@/components/ImageTextGrid';
import { Column } from '@/components/Column';
import { PageIntro } from '@/components/PageIntro';
import { Faqs } from '../components/Faqs';

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

      <main className="page" id="home">
        {/* Intro */}
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
          <div className="pt-32 pb-20">
            <PageIntro
              intro="It defines a set of rules and processes to optimise outcomes for
            both buyers and sellers while delivering the greatest benefit to the
            natural environment."
              summary=" This website explains the concepts underpinning the model, provides
            a step-by-step walkthrough of how it works for buyers and sellers,
            and presents a simulation of a real-world marketplace so you can
            familiarise yourself with the model and how it operates in a range
            of scenarios."
            />
          </div>
        </section>

        {/* Understanding the model  */}
        <section>
          <ImageTextGrid
            img={UnderstandingTheModel}
            text_title="Understanding the model"
          >
            <p>
              All markets have rules and processes that set out who can
              participate, what can be traded, how prices are set and how
              payment is settled.
            </p>
          </ImageTextGrid>
        </section>

        {/* Optimise the financial & environmental benefits */}
        <section className="relative mb-5">
          <div className="xl:max-w-[1130px] pl-20 2xl:pl-40">
            <div className="relative">
              <div className="relative pt-5 space-y-10">
                <Column
                  title="Optimise the financial & environmental benefits"
                  className="mt-5"
                  titlebackground
                  button={{ link: '/about-the-model', text: 'Find out more' }}
                >
                  <p>
                    The Exeter Lindsay market model applies robust and
                    innovative thinking to optimise financial and environmental
                    benefits to all parties. To maximise the opportunities
                    presented by the model, take a few minutes to understand how
                    the model works and the ways in which it delivers better
                    outcomes for buyers, sellers and the environment.
                  </p>
                  <ul className="space-y-3 list-disc list-inside text-lg">
                    <li>
                      Building Blocks: Participants, Projects, Credits, Costs &
                      Values
                    </li>
                    <li>Bids & Offers in a Market</li>
                    <li>Choosing Winners: Surplus maximisation</li>
                    <li>Determining Payments: Division using the Shapley</li>
                  </ul>
                </Column>
              </div>

              {/* Take a tour */}
              <Column
                title="Take a tour"
                className="mt-20"
                button={{ link: '/how-it-works', text: 'Take the tour' }}
              >
                <p>
                  Take a guided tour of a market scenario to gain a step-by-step
                  understanding of how it works, how to participate and how to
                  maximise your opportunity as a buyer or seller.
                </p>
              </Column>
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

        {/* How It Works */}
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
            {/* Give it a try */}
            <Column
              title="Give it a try"
              className="-mt-10 mb-28 max-w-[430px]"
              button={{ link: '/market-sandbox', text: 'Start trading' }}
            >
              <p>
                Get a feel for trading in markets based on Exeter Lindsay. We’ve
                created a series of simulations to give you first hand
                experience of the model and demonstrate how your choices can
                affect outcomes in different circumstances.
              </p>
            </Column>

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
                <Column
                  title="Optimising Natural Capital Markets"
                  titleClass="heading-3"
                >
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
                </Column>
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
