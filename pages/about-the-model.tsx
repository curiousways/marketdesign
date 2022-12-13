import type { NextPage } from 'next';

import { Header } from '@/components/Header';
import { Column } from '@/components/Column';
import { ImageTextGrid } from '@/components/ImageTextGrid';
import { PageIntro } from '@/components/PageIntro';

import AboutTheModel from '../public/assets/images/home/understanding-the-model.png';
import HeaderImg from '../public/assets/images/home/header.png';
import HeaderThumb from '../public/assets/images/home/header-thumb.png';

const About: NextPage = () => {
  return (
    <>
      <Header
        title="About the Lindsay Nature Market Model"
        description="Designed to facilitate trade in environmental goods and services at the local level."
        mainImageSrc={HeaderImg}
        secondaryImageSrc={HeaderThumb}
      />

      <main className="page" id="about">
        <section className="pt-32 pb-20">
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
        </section>

        <ImageTextGrid img={AboutTheModel} text_title="About the Model" reverse>
          <p>
            All markets have rules and processes that set out who can
            participate, what can be traded, how prices are set and how payment
            is settled.
          </p>
        </ImageTextGrid>

        {/*  */}
        <section className="relative">
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
                    Top notch Accuracy with Algorithm
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

                <Column button={{ link: '/', text: 'Find out more' }}>
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
            </div>
          </div>
        </section>

        <section className="xl:max-w-[1130px] pl-20 2xl:pl-40 mt-12 mb-20">
          <div className="xl:flex gap-x-20">
            <Column
              title="Take a Test"
              button={{ link: '/how-it-works', text: 'Take the tour' }}
            >
              <p>
                Take a guided tour of a market scenario to gain a step-by-step
                understanding of how it works, how to participate and how to
                maximise your opportunity as a buyer or seller.
              </p>
            </Column>

            <Column
              title="Fast Simulation Results"
              button={{ link: '/how-it-works', text: 'Take the tour' }}
            >
              <p>
                Take a guided tour of a market scenario to gain a step-by-step
                understanding of how it works, how to participate and how to
                maximise your opportunity as a buyer or seller.
              </p>
            </Column>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
