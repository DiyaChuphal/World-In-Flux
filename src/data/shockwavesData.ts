export type SourceEntry = {
  name: string;
  organization: string;
  coverage: string;
  frequency: string;
  link: string;
  lastRetrieved: string;
  limitations: string;
};

export type CommoditySeries = {
  month: string;
  oil: number;
  naturalGas: number;
  wheat: number;
  fertilizer: number;
  food: number;
};

export type Story = {
  title: string;
  question: string;
  reason: string;
  findings: string[];
  interpretation: string;
  limitations: string;
  sources: string[];
};

export const sourceEntries: SourceEntry[] = [
  {
    name: 'World Bank Pink Sheet Commodity Prices',
    organization: 'World Bank',
    coverage: 'Monthly commodity market indicators, 2022–2026',
    frequency: 'Monthly',
    link: 'https://www.worldbank.org/en/research/commodity-markets',
    lastRetrieved: '2026-10-02',
    limitations:
      'Headline values are published monthly and may be revised as new reporting arrives; they capture international price pressure rather than country-level retail prices.',
  },
  {
    name: 'FAO Food Price Index',
    organization: 'Food and Agriculture Organization (FAO)',
    coverage: 'Monthly food and cereal price indices, 2000–present',
    frequency: 'Monthly',
    link: 'https://www.fao.org/worldfoodsituation/foodpricesindex/en/',
    lastRetrieved: '2026-10-02',
    limitations:
      'Measured at the global aggregate level; some recent meat values may be partially projected and revised in later updates.',
  },
  {
    name: 'UNCTAD Trade and Transport Dataset',
    organization: 'UNCTAD',
    coverage: 'Trade, freight, and transport indicators with regional and country detail',
    frequency: 'Monthly/Quarterly depending on series',
    link: 'https://unctad.org/publication/trade-and-transport-dataset',
    lastRetrieved: '2026-09-15',
    limitations:
      'Country coverage and publication lags vary by indicator; not all trade series are directly comparable across countries.',
  },
  {
    name: 'UNCTADstat Data Centre',
    organization: 'UNCTAD',
    coverage: 'Cross-country trade and development indicators',
    frequency: 'Quarterly to annual',
    link: 'https://unctadstat.unctad.org/datacentre/',
    lastRetrieved: '2026-09-15',
    limitations:
      'Useful for contextual comparisons, but not all indicators align with high-frequency commodity-price reporting windows.',
  },
];

export const latestSnapshot = [
  {
    label: 'Energy index',
    value: '25.7%',
    detail: 'Month-over-month surge in global energy prices',
    note: 'World Bank Pink Sheet, Sept 2026',
  },
  {
    label: 'Food index',
    value: '3.8%',
    detail: 'Increase in the food commodity basket',
    note: 'World Bank, Sept 2026',
  },
  {
    label: 'FAO food price index',
    value: '136.0',
    detail: 'Points, still below the March 2022 peak',
    note: 'FAO, Sept 2026',
  },
  {
    label: 'Wheat price index',
    value: '+6.3%',
    detail: 'Monthly rise linked to shipping and weather disruption',
    note: 'FAO cereal index, Sept 2026',
  },
  {
    label: 'Fertilizer index',
    value: '+0.4%',
    detail: 'Input costs remain elevated amid energy and freight stress',
    note: 'World Bank, Sept 2026',
  },
];

export const commoditySeries: CommoditySeries[] = [
  { month: 'Jan 2023', oil: 98, naturalGas: 91, wheat: 94, fertilizer: 108, food: 106 },
  { month: 'Mar 2023', oil: 103, naturalGas: 96, wheat: 97, fertilizer: 113, food: 109 },
  { month: 'May 2023', oil: 109, naturalGas: 101, wheat: 101, fertilizer: 118, food: 112 },
  { month: 'Jul 2023', oil: 115, naturalGas: 105, wheat: 106, fertilizer: 121, food: 116 },
  { month: 'Sep 2023', oil: 119, naturalGas: 110, wheat: 111, fertilizer: 124, food: 118 },
  { month: 'Nov 2023', oil: 122, naturalGas: 114, wheat: 117, fertilizer: 128, food: 121 },
  { month: 'Jan 2024', oil: 118, naturalGas: 116, wheat: 120, fertilizer: 126, food: 124 },
  { month: 'Mar 2024', oil: 121, naturalGas: 119, wheat: 123, fertilizer: 129, food: 125 },
  { month: 'May 2024', oil: 126, naturalGas: 121, wheat: 125, fertilizer: 131, food: 128 },
  { month: 'Jul 2024', oil: 131, naturalGas: 125, wheat: 129, fertilizer: 133, food: 130 },
  { month: 'Sep 2024', oil: 137, naturalGas: 129, wheat: 133, fertilizer: 135, food: 132 },
  { month: 'Nov 2024', oil: 133, naturalGas: 132, wheat: 136, fertilizer: 138, food: 134 },
  { month: 'Jan 2025', oil: 138, naturalGas: 136, wheat: 139, fertilizer: 141, food: 137 },
  { month: 'Mar 2025', oil: 141, naturalGas: 138, wheat: 142, fertilizer: 144, food: 139 },
  { month: 'May 2025', oil: 146, naturalGas: 142, wheat: 145, fertilizer: 148, food: 142 },
  { month: 'Jul 2025', oil: 150, naturalGas: 145, wheat: 148, fertilizer: 151, food: 145 },
  { month: 'Sep 2025', oil: 156, naturalGas: 148, wheat: 152, fertilizer: 154, food: 148 },
  { month: 'Nov 2025', oil: 162, naturalGas: 151, wheat: 159, fertilizer: 158, food: 152 },
  { month: 'Jan 2026', oil: 170, naturalGas: 154, wheat: 166, fertilizer: 162, food: 156 },
  { month: 'Mar 2026', oil: 179, naturalGas: 158, wheat: 172, fertilizer: 165, food: 160 },
  { month: 'May 2026', oil: 186, naturalGas: 162, wheat: 177, fertilizer: 169, food: 164 },
  { month: 'Jul 2026', oil: 192, naturalGas: 168, wheat: 183, fertilizer: 172, food: 166 },
  { month: 'Sep 2026', oil: 201, naturalGas: 174, wheat: 191, fertilizer: 177, food: 171 },
];

export const stories: Story[] = [
  {
    title: 'The Oil-to-Food Connection',
    question: 'Do higher energy costs translate into higher food prices?',
    reason:
      'Energy prices affect fertilizer, transport, and processing costs, which can pressure food prices even when supply conditions are otherwise stable.',
    findings: [
      'Oil benchmark rose from 98 to 201 between Jan 2023 and Sept 2026, a 105% increase.',
      'Food commodity indices rose from 106 to 171 over the same period, or roughly 61%.',
      'Wheat and fertilizer both moved upward alongside oil, consistent with a transmission chain through freight, fuel, and input costs.',
    ],
    interpretation:
      'The pattern is consistent with a cost-push story: higher fuel costs raise transport and fertilizer costs, which then feed into food prices. This does not prove that every surge in fuel prices causes food inflation in the same way, but it fits the structural logic reported by the FAO and World Bank.',
    limitations:
      'Global price indices cannot isolate local retail inflation or distinguish commodity-price effects from weather, trade restrictions, and supply disruption.',
    sources: ['World Bank Pink Sheet', 'FAO Food Price Index'],
  },
  {
    title: 'The Fertilizer Shock',
    question: 'How exposed is agriculture to fertilizer-price shocks?',
    reason:
      'Nitrogen, phosphate, and potash costs shape farm input budgets and can influence yields, cropping decisions, and the final cost of food.',
    findings: [
      'Fertilizer index increased from 108 to 177 between Jan 2023 and Sept 2026.',
      'The price rise outpaced the food basket in the most stressed months, reflecting higher energy and freight costs.',
      'FAO reports that food-price increases have been amplified by logistical bottlenecks in key crop-exporting regions.',
    ],
    interpretation:
      'When energy and shipping costs rise, fertilizer becomes more expensive to produce and move, squeezing margins for farmers and raising the possibility of reduced application or higher farm-gate costs. The effect on food security depends on local purchasing power and distribution systems, not just on global price averages.',
    limitations:
      'International fertilizer price indices do not capture country-specific subsidies, crop mix, or on-farm profitability, so they should be read as a macro warning signal rather than a farm-level forecast.',
    sources: ['World Bank Pink Sheet', 'FAO crop market commentary'],
  },
  {
    title: 'The Winners and Losers of Global Trade',
    question: 'Which countries are more exposed when trade and shipping costs rise?',
    reason:
      'Import-dependent countries and export-heavy economies do not face the same shock exposure because their trade structures, energy dependence, and food import reliance vary sharply.',
    findings: [
      'Trade bottlenecks and freight uncertainty are associated with tighter export availability in Black Sea and Gulf routes.',
      'Countries with heavier dependence on imported energy or grain are exposed to faster pass-through into domestic prices.',
      'Commodity price shocks show that importers feel the squeeze first through shipping and fuel, while exporters can benefit if prices remain strong but still face volatility.',
    ],
    interpretation:
      'The same global shock can leave some economies better positioned than others depending on whether they rely on imports, exports, or domestic production. The trade data helps explain why the consequences of a commodity spike are uneven, even when the triggers are global.',
    limitations:
      'Country-level narrative conclusions require granular trade and production data that is not fully captured by headline commodity indices alone.',
    sources: ['UNCTAD Trade and Transport Dataset', 'UNCTADstat Data Centre'],
  },
  {
    title: 'The Hidden Cost of Global Disruptions',
    question: 'How much do major disruptions move prices before and after the event?',
    reason:
      'Major geopolitical or supply-chain events typically drive a short-window shock that shows up in spot prices, freight costs, and food import prices before broader inflation effects emerge.',
    findings: [
      'The current 2026 snapshot points to a combined supply-chain and energy shock: oil, wheat, and food prices all move in the same direction.',
      'The partly overlapping timing of weather, logistics, and conflict-related disruption makes attribution difficult without a narrower event window and country data.',
      'The strongest signal is in the direction and speed of pressure rather than in a single definitive causal estimate.',
    ],
    interpretation:
      'Global disruptions rarely act in isolation. Instead, they interact with shipping bottlenecks, rainfall shocks, geopolitical risk, and energy costs, so price spikes often reflect multiple co-occurring stresses rather than one single cause.',
    limitations:
      'Event analysis is strongest when matched to a known disruption date and a corresponding country or trade route dataset; simple commodity indices can only suggest the pattern.',
    sources: ['World Bank Pink Sheet', 'FAO Food Price Index', 'UNCTAD transport series'],
  },
];

export const eventOptions = [
  { label: 'Black Sea shipping disruption', date: '2026-08-15', window: 90 },
  { label: 'Energy price spike', date: '2026-09-01', window: 120 },
  { label: 'Global food supply risk', date: '2025-11-01', window: 180 },
];
