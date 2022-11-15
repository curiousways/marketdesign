import * as Accordion from "@radix-ui/react-accordion";

const faqs = [
  {
    question: "Who can participate?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis totam laudantium dolorem explicabo fugit distinctio cum, quia voluptas provident quaerat.",
  },
  {
    question: "What can be traded?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis totam laudantium dolorem explicabo fugit distinctio cum, quia voluptas provident quaerat.",
  },
  {
    question: "Bids and offers",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis totam laudantium dolorem explicabo fugit distinctio cum, quia voluptas provident quaerat.",
  },
  {
    question: "5 Basic rules",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis totam laudantium dolorem explicabo fugit distinctio cum, quia voluptas provident quaerat.",
  },
  {
    question:
      "How fair settlement leads to efficient resource allocation, accurate price discovery and equitable?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis totam laudantium dolorem explicabo fugit distinctio cum, quia voluptas provident quaerat.",
  },
];

const Faqs = () => {
  return (
    <>
      {/* FAQs */}
      <section className="max-w-[900px] mx-auto space-y-10 pb-20 md:pb-40">
        <h2 className="heading-2">Frequently asked questions</h2>
        <Accordion.Root type="multiple" className="space-y-5 overflow-auto">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`question-${i + 1}`}
              className="overflow-hidden cursor-pointer border-b border-flox-light-blue"
            >
              <Accordion.Header className="accordion-header duration-500 pb-4 relative flex items-center justify-between">
                <Accordion.Trigger className="w-full h-full absolute top-0 left-0 z-10"></Accordion.Trigger>
                <span className="md:text-[26px] leading-[26px] max-w-[750px]">
                  {faq.question}
                </span>
                <ChevronIcon />
              </Accordion.Header>
              <Accordion.Content className="accordion-body">
                <p className="pb-4">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
    </>
  );
};

export default Faqs;

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7">
    <title>Chevron Down</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d="M112 184l144 144 144-144"
      className="text-green-dark"
    />
  </svg>
);
