import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ArrowRight, Database, Download, FileUp, Globe2, TrendingUp } from 'lucide-react';
import { commoditySeries, latestSnapshot, sourceEntries, stories } from './data/shockwavesData';

type RowRecord = Record<string, string | number | boolean | null>;

type StatCard = {
  label: string;
  value: string;
  detail: string;
  note: string;
};

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explorer', to: '/explorer' },
  { label: 'Stories', to: '/stories' },
  { label: 'Sources', to: '/sources' },
  { label: 'Upload & Analyze', to: '/upload' },
];

const commodityLabels: Record<string, string> = {
  oil: 'Oil',
  naturalGas: 'Natural gas',
  wheat: 'Wheat',
  fertilizer: 'Fertilizer',
  food: 'Food',
};

const trendColors: Record<string, string> = {
  oil: '#f97316',
  naturalGas: '#38bdf8',
  wheat: '#84cc16',
  fertilizer: '#f59e0b',
  food: '#8b5cf6',
};

const changePercent = (current: number, previous: number) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

const getPercentString = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;

const correlation = (valuesA: number[], valuesB: number[]) => {
  if (!valuesA.length || valuesA.length !== valuesB.length) return 0;
  const meanA = valuesA.reduce((sum, value) => sum + value, 0) / valuesA.length;
  const meanB = valuesB.reduce((sum, value) => sum + value, 0) / valuesB.length;
  let numerator = 0;
  let denominatorA = 0;
  let denominatorB = 0;

  for (let i = 0; i < valuesA.length; i += 1) {
    const diffA = valuesA[i] - meanA;
    const diffB = valuesB[i] - meanB;
    numerator += diffA * diffB;
    denominatorA += diffA * diffA;
    denominatorB += diffB * diffB;
  }

  if (!denominatorA || !denominatorB) return 0;
  return numerator / Math.sqrt(denominatorA * denominatorB);
};

const computeStats = (values: number[]) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  const delta = values[values.length - 1] - values[0];
  const volatility =
    values.length < 2
      ? 0
      : Math.sqrt(
          values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / (values.length - 1),
        );

  return { max, min, avg, delta, volatility };
};

const HomePage = () => {
  const series = commoditySeries.slice(-12);
  const oilValues = series.map((item) => item.oil);
  const wheatValues = series.map((item) => item.wheat);
  const foodValues = series.map((item) => item.food);

  const homePlotData = [
    {
      x: series.map((item) => item.month),
      y: oilValues,
      type: 'scatter',
      mode: 'lines',
      name: 'Crude oil',
      line: { color: '#f97316', width: 3 },
    },
    {
      x: series.map((item) => item.month),
      y: wheatValues,
      type: 'scatter',
      mode: 'lines',
      name: 'Wheat',
      line: { color: '#84cc16', width: 3 },
    },
    {
      x: series.map((item) => item.month),
      y: foodValues,
      type: 'scatter',
      mode: 'lines',
      name: 'Food basket',
      line: { color: '#8b5cf6', width: 3 },
    },
  ];

  return (
    <div className='space-y-12 pb-16'>
      <section className='mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-8 shadow-2xl shadow-sky-950/40 lg:p-12'>
        <div className='grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end'>
          <div className='space-y-6'>
            <p className='inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-200'>
              Data journalism + supply-chain analysis
            </p>
            <h1 className='text-4xl font-black tracking-tight text-white md:text-6xl'>The World Changes. Prices Ripple.</h1>
            <p className='max-w-xl text-lg text-slate-300'>
              SHOCKWAVES traces how energy spikes, shipping bottlenecks, weather shocks, and geopolitical disruption ripple into food,
              fertilizer, and everyday consumer prices.
            </p>
            <div className='flex flex-wrap gap-4'>
              <NavLink to='/explorer' className='inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400'>
                Start exploring the data <ArrowRight size={18} />
              </NavLink>
              <NavLink to='/stories' className='rounded-full border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900'>
                Read the investigations
              </NavLink>
            </div>
          </div>

          <div className='rounded-2xl border border-slate-700 bg-slate-950/60 p-4'>
            <div className='mb-4 flex items-center justify-between text-sm text-slate-300'>
              <span className='inline-flex items-center gap-2'><Globe2 size={16} className='text-sky-400' /> Data freshness</span>
              <span className='rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300'>Updated</span>
            </div>

            <div className='space-y-3'>
              <div className='flex items-end justify-between'>
                <span className='text-sm text-slate-400'>Energy index</span>
                <span className='text-2xl font-bold text-white'>+25.7%</span>
              </div>
              <div className='flex items-end justify-between'>
                <span className='text-sm text-slate-400'>FAO Food Price Index</span>
                <span className='text-2xl font-bold text-white'>136.0</span>
              </div>
              <div className='flex items-end justify-between'>
                <span className='text-sm text-slate-400'>Wheat</span>
                <span className='text-2xl font-bold text-white'>+6.3%</span>
              </div>
            </div>
            <div className='mt-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-400'>
              Snapshot source: World Bank Pink Sheet and FAO Food Price Index, retrieved 2026-10-02.
            </div>
          </div>
        </div>
      </section>

      <section className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Latest real-data snapshot</h2>
          <span className='text-sm text-slate-400'>Official monthly release snapshot</span>
        </div>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
          {latestSnapshot.map((stat: StatCard) => (
            <div key={stat.label} className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4'>
              <p className='text-sm text-slate-400'>{stat.label}</p>
              <p className='mt-3 text-3xl font-black text-white'>{stat.value}</p>
              <p className='mt-2 text-sm text-slate-300'>{stat.detail}</p>
              <p className='mt-3 text-xs text-slate-400'>{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-xl font-semibold text-white'>Global price pressure</h3>
            <span className='text-xs uppercase tracking-[0.2em] text-slate-400'>Jan 2023–Sep 2026</span>
          </div>
          <Plot
            data={homePlotData}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#cbd5e1', size: 11 },
              xaxis: { title: '', gridcolor: '#334155' },
              yaxis: { title: 'Index (base = 100)', gridcolor: '#334155' },
              margin: { l: 40, r: 20, t: 10, b: 40 },
              legend: { orientation: 'h', x: 0, y: 1.22 },
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: '100%', height: '340px' }}
            useResizeHandler
          />
        </div>

        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
          <h3 className='mb-4 text-xl font-semibold text-white'>Featured investigations</h3>
          <div className='space-y-4'>
            {stories.map((story) => (
              <div key={story.title} className='rounded-2xl border border-slate-800 bg-slate-950/70 p-4'>
                <p className='text-xs uppercase tracking-[0.18em] text-sky-300'>{story.title}</p>
                <p className='mt-2 text-sm text-slate-300'>{story.question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ExplorerPage = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['oil', 'wheat', 'food']);
  const [timeWindow, setTimeWindow] = useState<number>(12);
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');

  const filteredSeries = useMemo(() => commoditySeries.slice(-timeWindow), [timeWindow]);

  const toggleCommodity = (key: string) => {
    setSelectedKeys((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
  };

  const lineTrace = selectedKeys.map((key) => ({
    x: filteredSeries.map((item) => item.month),
    y: filteredSeries.map((item) => Number(item[key as keyof typeof item])),
    type: 'scatter',
    mode: 'lines',
    name: commodityLabels[key] ?? key,
    line: { color: trendColors[key] ?? '#38bdf8', width: 3 },
  }));

  const indexedData = selectedKeys.map((key) => {
    const baseValue = Number(filteredSeries[0][key as keyof (typeof filteredSeries)[0]]);
    return {
      x: filteredSeries.map((item) => item.month),
      y: filteredSeries.map((item) => ((Number(item[key as keyof typeof item]) / baseValue) * 100)),
      type: 'scatter',
      mode: 'lines',
      name: commodityLabels[key] ?? key,
      line: { color: trendColors[key] ?? '#38bdf8', width: 3 },
    };
  });

  const percentageData = selectedKeys.map((key) => {
    const values = filteredSeries.map((item) => Number(item[key as keyof typeof item]));
    const base = values[0] ?? 1;
    return {
      x: commodityLabels[key] ?? key,
      y: ((values[values.length - 1] - base) / base) * 100,
      type: 'bar',
      name: commodityLabels[key] ?? key,
      marker: { color: trendColors[key] ?? '#38bdf8' },
    };
  });

  const stats = selectedKeys.map((key) => {
    const values = filteredSeries.map((item) => Number(item[key as keyof typeof item]));
    const summary = computeStats(values);
    const latest = values[values.length - 1];
    const previous = values[Math.max(0, values.length - 2)];
    return {
      label: commodityLabels[key] ?? key,
      latest,
      delta: latest - previous,
      change: changePercent(latest, previous),
      peak: summary.max,
      trough: summary.min,
      volatility: summary.volatility,
    };
  });

  const heatmapData = useMemo(() => {
    const labels = selectedKeys.map((key) => commodityLabels[key] ?? key);
    const matrix = labels.map((_rowLabel, rowIndex) =>
      labels.map((_colLabel, columnIndex) => {
        const keyA = selectedKeys[rowIndex];
        const keyB = selectedKeys[columnIndex];
        const valuesA = filteredSeries.map((item) => Number(item[keyA as keyof typeof item]));
        const valuesB = filteredSeries.map((item) => Number(item[keyB as keyof typeof item]));
        return correlation(valuesA, valuesB);
      }),
    );

    return { labels, matrix };
  }, [filteredSeries, selectedKeys]);

  const volatilityTrace = selectedKeys.map((key) => {
    const values = filteredSeries.map((item) => Number(item[key as keyof typeof item]));
    const changes = values.slice(1).map((value, index) => Math.abs(value - values[index]));
    return {
      x: filteredSeries.slice(1).map((item) => item.month),
      y: changes,
      type: 'scatter',
      mode: 'lines',
      name: commodityLabels[key] ?? key,
      line: { color: trendColors[key] ?? '#38bdf8', width: 2 },
    };
  });

  return (
    <div className='space-y-10 pb-16'>
      <section className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
        <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.25em] text-sky-300'>Global Shock Explorer</p>
            <h2 className='mt-2 text-3xl font-bold text-white'>Track supply shocks across commodities</h2>
          </div>
          <div className='flex flex-wrap gap-3'>
            <select value={timeWindow} onChange={(event) => setTimeWindow(Number(event.target.value))} className='rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200'>
              <option value={6}>Last 6 months</option>
              <option value={12}>Last 12 months</option>
              <option value={18}>Last 18 months</option>
              <option value={24}>Full 24-month snapshot</option>
            </select>
            <select value={viewMode} onChange={(event) => setViewMode(event.target.value as 'monthly' | 'annual')} className='rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200'>
              <option value='monthly'>Monthly view</option>
              <option value='annual'>Annualized view</option>
            </select>
          </div>
        </div>

        <div className='mt-5 flex flex-wrap gap-3'>
          {Object.entries(commodityLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleCommodity(key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedKeys.includes(key)
                  ? 'border-sky-500 bg-sky-500/20 text-sky-100'
                  : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((item) => (
          <div key={item.label} className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4'>
            <p className='text-sm text-slate-400'>{item.label}</p>
            <p className='mt-2 text-2xl font-bold text-white'>{item.latest.toFixed(1)}</p>
            <p className='mt-2 text-sm text-emerald-300'>{getPercentString(item.change)}</p>
            <p className='mt-2 text-xs text-slate-400'>Peak {item.peak.toFixed(1)} • Trough {item.trough.toFixed(1)}</p>
          </div>
        ))}
      </section>

      <section className='grid gap-6 xl:grid-cols-2'>
        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
          <h3 className='mb-4 text-xl font-semibold text-white'>Time-series comparison</h3>
          <Plot
            data={lineTrace}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#dbeafe' },
              margin: { l: 40, r: 20, t: 10, b: 40 },
              xaxis: { gridcolor: '#334155' },
              yaxis: { title: viewMode === 'annual' ? 'Annual index' : 'Price index', gridcolor: '#334155' },
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: '100%', height: '360px' }}
            useResizeHandler
          />
        </div>

        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
          <h3 className='mb-4 text-xl font-semibold text-white'>Indexed comparison</h3>
          <Plot
            data={indexedData}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#dbeafe' },
              margin: { l: 40, r: 20, t: 10, b: 40 },
              xaxis: { gridcolor: '#334155' },
              yaxis: { title: 'Index (base = 100)', gridcolor: '#334155' },
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: '100%', height: '360px' }}
            useResizeHandler
          />
        </div>
      </section>

      <section className='grid gap-6 xl:grid-cols-2'>
        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
          <h3 className='mb-4 text-xl font-semibold text-white'>Percentage change</h3>
          <Plot
            data={percentageData}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#dbeafe' },
              margin: { l: 40, r: 20, t: 10, b: 40 },
              xaxis: { tickfont: { size: 12 } },
              yaxis: { title: 'Percent change vs start of period', gridcolor: '#334155' },
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: '100%', height: '360px' }}
            useResizeHandler
          />
        </div>

        <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
          <h3 className='mb-4 text-xl font-semibold text-white'>Rolling volatility</h3>
          <Plot
            data={volatilityTrace}
            layout={{
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#dbeafe' },
              margin: { l: 40, r: 20, t: 10, b: 40 },
              xaxis: { gridcolor: '#334155' },
              yaxis: { title: 'Absolute month-to-month change', gridcolor: '#334155' },
            }}
            config={{ displayModeBar: false, responsive: true }}
            style={{ width: '100%', height: '360px' }}
            useResizeHandler
          />
        </div>
      </section>

      <section className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
        <h3 className='mb-4 text-xl font-semibold text-white'>Correlation heatmap</h3>
        <Plot
          data={[
            {
              z: heatmapData.matrix,
              x: heatmapData.labels,
              y: heatmapData.labels,
              type: 'heatmap',
              colorscale: 'RdBu',
              zmin: -1,
              zmax: 1,
              hoverongaps: false,
            },
          ]}
          layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#dbeafe' },
            margin: { l: 60, r: 20, t: 10, b: 85 },
          }}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: '100%', height: '380px' }}
          useResizeHandler
        />
      </section>
    </div>
  );
};

const StoriesPage = () => (
  <div className='space-y-8 pb-16'>
    {stories.map((story) => (
      <article key={story.title} className='rounded-3xl border border-slate-800 bg-slate-900/70 p-6'>
        <div className='mb-5 flex items-center justify-between gap-3'>
          <h2 className='text-2xl font-bold text-white'>{story.title}</h2>
          <span className='rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-200'>Investigation</span>
        </div>

        <div className='grid gap-8 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='space-y-5'>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Question</p>
              <p className='mt-2 text-lg text-slate-100'>{story.question}</p>
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Why it matters</p>
              <p className='mt-2 text-slate-300'>{story.reason}</p>
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Key findings</p>
              <ul className='mt-3 space-y-2 text-slate-300'>
                {story.findings.map((finding) => (
                  <li key={finding} className='flex gap-2'>
                    <span className='mt-1 h-2 w-2 rounded-full bg-sky-400' />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4'>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Interpretation</p>
              <p className='mt-2 text-slate-300'>{story.interpretation}</p>
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Limitations</p>
              <p className='mt-2 text-slate-300'>{story.limitations}</p>
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Sources</p>
              <div className='mt-2 flex flex-wrap gap-2'>
                {story.sources.map((source) => (
                  <span key={source} className='rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300'>
                    {source}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.18em] text-slate-400'>Chart</p>
              <Plot
                data={[
                  {
                    x: commoditySeries.map((item) => item.month),
                    y: commoditySeries.map((item) =>
                      story.title.includes('Oil') ? item.oil : story.title.includes('Fertilizer') ? item.fertilizer : story.title.includes('Trade') ? item.wheat : item.food,
                    ),
                    type: 'scatter',
                    mode: 'lines',
                    line: { color: '#38bdf8', width: 3 },
                  },
                ]}
                layout={{
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  plot_bgcolor: 'rgba(0,0,0,0)',
                  font: { color: '#dbeafe' },
                  margin: { l: 40, r: 10, t: 10, b: 40 },
                  xaxis: { gridcolor: '#334155' },
                  yaxis: { gridcolor: '#334155' },
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: '100%', height: '220px' }}
                useResizeHandler
              />
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>
);

const SourcesPage = () => (
  <div className='space-y-8 pb-16'>
    <section className='rounded-3xl border border-slate-800 bg-slate-900/70 p-6'>
      <div className='mb-4 flex items-center gap-3'>
        <Database className='text-sky-400' />
        <h2 className='text-2xl font-bold text-white'>Data sources & metadata</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full text-left text-sm text-slate-300'>
          <thead>
            <tr className='border-b border-slate-800 text-xs uppercase tracking-[0.18em] text-slate-400'>
              <th className='pb-3 pr-4'>Dataset</th>
              <th className='pb-3 pr-4'>Organization</th>
              <th className='pb-3 pr-4'>Coverage</th>
              <th className='pb-3 pr-4'>Frequency</th>
              <th className='pb-3 pr-4'>Last retrieval</th>
              <th className='pb-3 pr-4'>Limitations</th>
            </tr>
          </thead>
          <tbody>
            {sourceEntries.map((source) => (
              <tr key={source.name} className='border-b border-slate-800 align-top'>
                <td className='py-4 pr-4'><a href={source.link} className='text-sky-300 underline hover:text-sky-200'>{source.name}</a></td>
                <td className='py-4 pr-4'>{source.organization}</td>
                <td className='py-4 pr-4'>{source.coverage}</td>
                <td className='py-4 pr-4'>{source.frequency}</td>
                <td className='py-4 pr-4'>{source.lastRetrieved}</td>
                <td className='py-4 pr-4'>{source.limitations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

const UploadPage = () => {
  const [dataset, setDataset] = useState<RowRecord[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('line');
  const [colorBy, setColorBy] = useState('');

  const numericColumns = useMemo(
    () =>
      columns.filter((column) =>
        dataset.some((row) => {
          const value = row[column];
          return value !== null && value !== undefined && value !== '' && !Number.isNaN(Number(value));
        }),
      ),
    [columns, dataset],
  );

  const missingValues = useMemo(
    () =>
      columns.reduce<Record<string, number>>((accumulator, column) => {
        accumulator[column] = dataset.filter((row) => row[column] === null || row[column] === undefined || row[column] === '').length;
        return accumulator;
      }, {}),
    [columns, dataset],
  );

  const duplicates = useMemo(
    () => {
      const seen = new Set<string>();
      let count = 0;

      dataset.forEach((row) => {
        const serialized = JSON.stringify(row);
        if (seen.has(serialized)) count += 1;
        seen.add(serialized);
      });

      return count;
    },
    [dataset],
  );

  const outliers = useMemo(() => {
    const valuesByColumn: Record<string, number[]> = {};

    columns.forEach((column) => {
      const values = dataset.map((row) => Number(row[column])).filter((value) => !Number.isNaN(value));
      if (values.length) valuesByColumn[column] = values;
    });

    return Object.entries(valuesByColumn).map(([column, values]) => {
      const sorted = [...values].sort((a, b) => a - b);
      const q1 = sorted[Math.floor((sorted.length * 25) / 100)];
      const q3 = sorted[Math.floor((sorted.length * 75) / 100)];
      const iqr = q3 - q1;
      const lower = q1 - 1.5 * iqr;
      const upper = q3 + 1.5 * iqr;
      const outlierCount = values.filter((value) => value < lower || value > upper).length;
      return { column, outlierCount };
    });
  }, [columns, dataset]);

  const parseFile = (file: File) => {
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!['csv', 'xlsx', 'xls'].includes(extension)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;

      let parsedRows: RowRecord[] = [];
      if (extension === 'csv') {
        const result = Papa.parse<Record<string, string>>(String(event.target.result), { header: true, skipEmptyLines: true });
        parsedRows = (result.data as RowRecord[]) ?? [];
      } else {
        const workbook = XLSX.read(event.target.result, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        parsedRows = XLSX.utils.sheet_to_json<RowRecord>(sheet, { defval: null, raw: false });
      }

      const cleanedRows = parsedRows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [String(key).trim(), value ?? null])));
      const foundColumns = cleanedRows.length ? Object.keys(cleanedRows[0]) : [];
      setDataset(cleanedRows);
      setColumns(foundColumns);
      setFileName(file.name);
      setXAxis(foundColumns[0] ?? '');
      setYAxis(foundColumns.find((column) => numericColumns.includes(column)) ?? foundColumns[0] ?? '');
      setColorBy(foundColumns.find((column) => !numericColumns.includes(column)) ?? '');
    };

    if (extension === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const chartSeries = useMemo(() => {
    if (!dataset.length || !xAxis || !yAxis) return [];

    if (chartType === 'bar' && colorBy) {
      const groups = new Map<string, number[]>();
      dataset.forEach((row) => {
        const key = String(row[colorBy] ?? 'Unspecified');
        const value = Number(row[yAxis]);
        if (!Number.isNaN(value)) {
          const current = groups.get(key) ?? [];
          current.push(value);
          groups.set(key, current);
        }
      });
      return Array.from(groups.entries()).map(([groupName, values]) => ({
        x: [groupName],
        y: [values.reduce((sum, value) => sum + value, 0)],
        type: 'bar',
        name: groupName,
      }));
    }

    const values = dataset.map((row) => row[xAxis]);
    return [
      {
        x: values,
        y: dataset.map((row) => Number(row[yAxis])),
        type: 'scatter',
        mode: chartType === 'line' ? 'lines' : 'markers',
        name: yAxis,
        marker: { color: '#38bdf8' },
      },
    ];
  }, [chartType, colorBy, dataset, xAxis, yAxis]);

  const downloadData = () => {
    if (!dataset.length) return;
    const csv = Papa.unparse(dataset);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shockwaves_cleaned_data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='space-y-8 pb-16'>
      <section className='rounded-3xl border border-slate-800 bg-slate-900/70 p-6'>
        <div className='flex items-center gap-3'>
          <FileUp className='text-sky-400' />
          <h2 className='text-2xl font-bold text-white'>Upload and analyze any dataset</h2>
        </div>

        <label className='mt-6 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/80 px-6 py-12 text-center text-slate-300 transition hover:border-sky-500'>
          <input
            type='file'
            accept='.csv,.xlsx,.xls'
            className='hidden'
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) parseFile(file);
            }}
          />
          Click to upload a CSV or Excel file
        </label>

        {fileName && <p className='mt-3 text-sm text-slate-300'>Loaded: {fileName}</p>}
      </section>

      {dataset.length > 0 && (
        <>
          <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            <div className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4'>
              <p className='text-sm text-slate-400'>Rows</p>
              <p className='mt-2 text-2xl font-bold text-white'>{dataset.length}</p>
            </div>
            <div className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4'>
              <p className='text-sm text-slate-400'>Columns</p>
              <p className='mt-2 text-2xl font-bold text-white'>{columns.length}</p>
            </div>
            <div className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4'>
              <p className='text-sm text-slate-400'>Missing values</p>
              <p className='mt-2 text-2xl font-bold text-white'>{Object.values(missingValues).reduce((sum, value) => sum + value, 0)}</p>
            </div>
            <div className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4'>
              <p className='text-sm text-slate-400'>Duplicate rows</p>
              <p className='mt-2 text-2xl font-bold text-white'>{duplicates}</p>
            </div>
          </section>

          <section className='grid gap-6 xl:grid-cols-[0.9fr_1.1fr]'>
            <div className='space-y-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
              <div>
                <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Column detection</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {columns.map((column) => (
                    <span key={column} className='rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300'>
                      {column}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Numeric columns</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {numericColumns.map((column) => (
                    <span key={column} className='rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300'>
                      {column}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>Outlier checks</p>
                <ul className='mt-3 space-y-2 text-sm text-slate-300'>
                  {outliers.map((item) => (
                    <li key={item.column} className='flex justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2'>
                      <span>{item.column}</span>
                      <span>{item.outlierCount} flagged</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-5'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-xl font-semibold text-white'>Chart builder</h3>
                <button onClick={downloadData} className='inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-sky-500'>
                  <Download size={16} /> Download cleaned data
                </button>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <label className='text-sm text-slate-300'>
                  X-axis
                  <select value={xAxis} onChange={(event) => setXAxis(event.target.value)} className='mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200'>
                    {columns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </label>
                <label className='text-sm text-slate-300'>
                  Y-axis
                  <select value={yAxis} onChange={(event) => setYAxis(event.target.value)} className='mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200'>
                    {numericColumns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </label>
                <label className='text-sm text-slate-300'>
                  Chart type
                  <select value={chartType} onChange={(event) => setChartType(event.target.value)} className='mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200'>
                    <option value='line'>Line chart</option>
                    <option value='scatter'>Scatter plot</option>
                    <option value='bar'>Bar chart</option>
                  </select>
                </label>
                <label className='text-sm text-slate-300'>
                  Group by
                  <select value={colorBy} onChange={(event) => setColorBy(event.target.value)} className='mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-200'>
                    <option value=''>No grouping</option>
                    {columns.filter((column) => !numericColumns.includes(column)).map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className='mt-6'>
                <Plot
                  data={chartSeries}
                  layout={{
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { color: '#dbeafe' },
                    margin: { l: 40, r: 20, t: 10, b: 40 },
                    xaxis: { gridcolor: '#334155' },
                    yaxis: { gridcolor: '#334155' },
                  }}
                  config={{ displayModeBar: false, responsive: true }}
                  style={{ width: '100%', height: '350px' }}
                  useResizeHandler
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-slate-950 text-slate-100'>
        <header className='sticky top-0 z-20 border-b border-slate-800 bg-slate-950/85 backdrop-blur'>
          <nav className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 p-2 text-slate-950'>
                <TrendingUp size={18} />
              </div>
              <div>
                <p className='text-xs uppercase tracking-[0.24em] text-sky-300'>Shockwaves</p>
                <p className='text-xs text-slate-400'>Global disruptions to daily prices</p>
              </div>
            </div>

            <div className='hidden items-center gap-2 md:flex'>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </header>

        <main className='mx-auto max-w-6xl px-4 py-8'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/explorer' element={<ExplorerPage />} />
            <Route path='/stories' element={<StoriesPage />} />
            <Route path='/sources' element={<SourcesPage />} />
            <Route path='/upload' element={<UploadPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
