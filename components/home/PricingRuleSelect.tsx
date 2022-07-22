type PricingRule = string;

type Props = {
  setPricingRule: (pricingRule: PricingRule) => void;
};

const pricingRules = [
  { value: "lindsay2018", title: "Lindsay 2018" },
  { value: "VCG", title: "Vickrey-Clarke-Groves pricing" },
  { value: "PaB", title: "Pay-as-bid pricing" },
];

const PricingRuleSelect = ({ setPricingRule }: Props) => {
  return (
    <div className="mt-16">
      <label className="text-base font-medium text-gray-900">
        Pricing Rule
      </label>
      <p className="text-sm leading-5 text-gray-500">
        Please select pricing rule that determines the winning bids and payments
      </p>
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {pricingRules.map((rule) => (
            <div key={rule.value} className="flex items-center">
              <input
                id={rule.value}
                name="pricing rule"
                value={rule.value}
                type="radio"
                defaultChecked={rule.value === "lindsay2018"}
                onChange={(e) => setPricingRule(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor={rule.value}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {rule.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default PricingRuleSelect;
