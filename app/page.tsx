"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type Paper = {
  id: string;
  title: string;
  titleZh: string;
  authors: string;
  year: number;
  journal: string;
  chassis: string;
  product: string;
  route: string;
  mode: string;
  language: "EN" | "ZH";
  source: string;
  href: string;
  summaryZh: string;
  abstract?: string;
  tags: string[];
  live?: boolean;
  doi?: string;
};

const papers: Paper[] = [
  {
    id: "doi-10.1360/SSC-2025-0038",
    doi: "10.1360/SSC-2025-0038",
    title: "微生物代谢乙酸合成化学品研究进展",
    titleZh: "微生物代谢乙酸合成化学品研究进展",
    authors: "徐双, 王佳, 申晓林, 孙新晓, 袁其朋",
    year: 2025,
    journal: "中国科学：化学",
    chassis: "多底盘综述",
    product: "多类化学品",
    route: "乙酸同化 / 乙酰-CoA枢纽",
    mode: "乙酸单一碳源与共利用",
    language: "ZH",
    source: "Science China Press",
    href: "https://doi.org/10.1360/SSC-2025-0038",
    summaryZh: "从乙酸来源、微生物同化机制和细胞工厂构建出发，系统总结乙酸生产有机酸、氨基酸、天然产物等化学品的研究进展与关键限制。",
    tags: ["中文综述", "多底盘", "乙酸生物转化"],
  },
  {
    id: "hjkx-2009-0831",
    title: "活性污泥微生物以乙酸为碳源合成聚羟基烷酸酯的研究",
    titleZh: "活性污泥微生物以乙酸为碳源合成聚羟基烷酸酯的研究",
    authors: "李伟, 陈银广",
    year: 2009,
    journal: "环境科学",
    chassis: "Mixed microbial cultures",
    product: "PHA",
    route: "乙酰-CoA / PHA",
    mode: "乙酸单一碳源",
    language: "ZH",
    source: "环境科学",
    href: "https://www.hjkx.ac.cn/ch/reader/view_abstract.aspx?file_no=20090831&flag=1",
    summaryZh: "以乙酸为碳源研究活性污泥混合菌群的PHA合成行为，为乙酸驱动的开放菌群聚合物生产与过程控制提供中文实验证据。",
    tags: ["中文研究", "混合菌群", "PHA"],
  },
  {
    id: "pmid-29197183",
    title: "Production of itaconic acid from acetate by engineering acid-tolerant Escherichia coli",
    titleZh: "通过工程化耐酸大肠杆菌由乙酸生产衣康酸",
    authors: "Noh et al.",
    year: 2018,
    journal: "Metabolic Engineering",
    chassis: "Escherichia coli",
    product: "衣康酸",
    route: "TCA / 顺乌头酸支路",
    mode: "乙酸单一碳源",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/29197183/",
    summaryZh: "以乙酸为碳源，通过耐酸与中心代谢工程构建衣康酸合成路线，展示了乙酸向二羧酸平台化合物转化的可行性。",
    tags: ["有机酸", "耐酸工程", "单一碳源"],
  },
  {
    id: "pmid-29970091",
    title: "Metabolic engineering of Escherichia coli for the synthesis of polyhydroxyalkanoates using acetate as a main carbon source",
    titleZh: "以乙酸为主要碳源合成聚羟基脂肪酸酯的大肠杆菌代谢工程",
    authors: "Chen et al.",
    year: 2018,
    journal: "Microbial Cell Factories",
    chassis: "Escherichia coli",
    product: "PHA",
    route: "乙酰-CoA / PHA",
    mode: "乙酸主碳源",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/29970091/",
    summaryZh: "围绕乙酰-CoA供给、乙酸同化和聚合物合成模块进行工程化，验证乙酸可作为PHA生物制造的主要碳源。",
    tags: ["生物材料", "PHA", "乙酰-CoA"],
  },
  {
    id: "pmid-28574746",
    title: "Microbial production of mevalonate by recombinant Escherichia coli using acetate as a carbon source",
    titleZh: "重组大肠杆菌以乙酸为碳源生产甲羟戊酸",
    authors: "Xu et al.",
    year: 2018,
    journal: "Bioengineered",
    chassis: "Escherichia coli",
    product: "甲羟戊酸",
    route: "MVA途径",
    mode: "乙酸单一碳源",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/28574746/",
    summaryZh: "从乙酸出发构建甲羟戊酸合成途径，将乙酰-CoA导向异戊二烯前体，为萜类产品提供模块化入口。",
    tags: ["甲羟戊酸", "萜类前体", "MVA"],
  },
  {
    id: "pmid-27387605",
    title: "13C metabolic flux analysis of acetate conversion to lipids by Yarrowia lipolytica",
    titleZh: "解脂耶氏酵母将乙酸转化为脂质的¹³C代谢流分析",
    authors: "Liu et al.",
    year: 2016,
    journal: "Metabolic Engineering",
    chassis: "Yarrowia lipolytica",
    product: "微生物油脂",
    route: "TCA / 脂肪酸合成",
    mode: "乙酸单一碳源",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/27387605/",
    summaryZh: "采用¹³C代谢流分析定量解析乙酸向三酰甘油转化过程中的碳流、能量与还原力分配，是乙酸脂质合成研究的重要机制依据。",
    tags: ["微生物油脂", "¹³C-MFA", "能量代谢"],
  },
  {
    id: "pmid-32694804",
    title: "Synergistic substrate cofeeding stimulates reductive metabolism for acetate-driven lipogenesis in Yarrowia lipolytica",
    titleZh: "协同共底物促进解脂耶氏酵母乙酸驱动的还原代谢与脂质合成",
    authors: "Park et al.",
    year: 2020,
    journal: "Metabolic Engineering",
    chassis: "Yarrowia lipolytica",
    product: "微生物油脂",
    route: "乙酸同化 / NADPH供给",
    mode: "乙酸共利用",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/32694804/",
    summaryZh: "通过葡萄糖酸共喂强化NADPH形成，缓解乙酸脂质合成中的还原力瓶颈，说明共底物策略可用于重塑总碳输入与辅因子供给。",
    tags: ["共利用", "NADPH", "脂质"],
  },
  {
    id: "pmid-30864026",
    title: "Production of medium-chain-length polyhydroxyalkanoate from acetate by engineered Pseudomonas putida",
    titleZh: "工程化恶臭假单胞菌由乙酸生产中链聚羟基脂肪酸酯",
    authors: "Yang et al.",
    year: 2019,
    journal: "Metabolic Engineering Communications",
    chassis: "Pseudomonas putida",
    product: "mcl-PHA",
    route: "乙酰-CoA / 脂肪酸合成",
    mode: "乙酸单一碳源",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/30864026/",
    summaryZh: "通过工程化恶臭假单胞菌的乙酸同化与脂肪酸相关途径，实现乙酸向中链PHA的转化，拓展了乙酸基生物材料底盘。",
    tags: ["假单胞菌", "mcl-PHA", "生物材料"],
  },
  {
    id: "pmid-27179529",
    title: "Rhodococcus opacus B4: a promising bacterium for production of storage lipids from acetate",
    titleZh: "Rhodococcus opacus B4：利用乙酸生产储存脂质的潜力底盘",
    authors: "Castro et al.",
    year: 2016,
    journal: "AMB Express",
    chassis: "Rhodococcus opacus",
    product: "储存脂质",
    route: "乙酰-CoA / TAG",
    mode: "乙酸单一碳源",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/27179529/",
    summaryZh: "比较不同碳源条件下的储存脂质形成，证明R. opacus B4可利用乙酸积累脂质，为废碳资源化提供另一类细菌底盘。",
    tags: ["Rhodococcus", "储存脂质", "底盘拓展"],
  },
  {
    id: "pmid-26874438",
    title: "Co-fermentation of acetate and sugars facilitating microbial lipid production on acetate-rich biomass hydrolysates",
    titleZh: "乙酸与糖共发酵促进富乙酸生物质水解液的微生物油脂生产",
    authors: "Gong et al.",
    year: 2016,
    journal: "Bioresource Technology",
    chassis: "Cryptococcus curvatus",
    product: "微生物油脂",
    route: "乙酸同化 / 脂质合成",
    mode: "糖–乙酸共利用",
    language: "EN",
    source: "PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/26874438/",
    summaryZh: "利用弯曲隐球酵母协同消耗乙酸和糖，将水解液中的抑制性乙酸转化为脂质碳源，体现共利用在复杂原料中的过程优势。",
    tags: ["共发酵", "水解液", "微生物油脂"],
  },
];

const chassisList = [
  ["大肠杆菌", "Escherichia coli", "有机酸 · PHA · 萜类"],
  ["解脂耶氏酵母", "Yarrowia lipolytica", "油脂 · 烷烃 · 聚酮"],
  ["恶臭假单胞菌", "Pseudomonas putida", "mcl-PHA · 芳香族"],
  ["谷氨酸棒杆菌", "Corynebacterium glutamicum", "氨基酸 · 有机酸"],
  ["红球菌", "Rhodococcus spp.", "储存脂质 · 生物转化"],
  ["弯曲隐球酵母", "Cryptococcus curvatus", "共利用 · 微生物油脂"],
  ["混合菌群", "Mixed microbial cultures", "PHA · 链延长"],
  ["其他非模式底盘", "Bacteria · Yeasts · Archaea", "持续扩展"],
];

type OpenAlexWork = {
  id?: string;
  doi?: string | null;
  title?: string;
  publication_year?: number;
  language?: string;
  abstract_inverted_index?: Record<string, number[]> | null;
  authorships?: Array<{ author?: { display_name?: string } }>;
  primary_location?: { source?: { display_name?: string }; landing_page_url?: string | null };
};

type EuropePmcResult = {
  id?: string;
  source?: string;
  pmid?: string;
  pmcid?: string;
  doi?: string;
  title?: string;
  authorString?: string;
  pubYear?: string;
  journalTitle?: string;
  abstractText?: string;
  language?: string;
};

function rebuildOpenAlexAbstract(index?: Record<string, number[]> | null) {
  if (!index) return "";
  const words: Array<[number, string]> = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) words.push([position, word]);
  }
  return words.sort((a, b) => a[0] - b[0]).map((item) => item[1]).join(" ");
}

function classifyLivePaper(text: string) {
  const chassisRules: Array<[RegExp, string]> = [
    [/corynebacterium\s+glutamicum/i, "Corynebacterium glutamicum"],
    [/escherichia\s+coli|\be\.\s*coli\b/i, "Escherichia coli"],
    [/yarrowia\s+lipolytica/i, "Yarrowia lipolytica"],
    [/pseudomonas\s+putida/i, "Pseudomonas putida"],
    [/cupriavidus\s+necator|ralstonia\s+eutropha/i, "Cupriavidus necator"],
    [/rhodococcus/i, "Rhodococcus spp."],
    [/cryptococcus\s+curvatus/i, "Cryptococcus curvatus"],
    [/saccharomyces\s+cerevisiae/i, "Saccharomyces cerevisiae"],
    [/clostridium|acetogen/i, "Clostridia / acetogens"],
    [/mixed microbial|microbial communit|混合菌|菌群/i, "Mixed microbial cultures"],
  ];
  const productRules: Array<[RegExp, string, string]> = [
    [/polyhydroxyalkanoate|\bpha\b/i, "PHA", "乙酰-CoA / PHA"],
    [/lipid|triacylglycer|microbial oil|脂质|油脂/i, "微生物油脂", "乙酰-CoA / 脂肪酸合成"],
    [/itaconic acid|itaconate|衣康酸/i, "衣康酸", "TCA / 顺乌头酸支路"],
    [/mevalonate|isopren|terpen|甲羟戊酸|萜/i, "萜类及前体", "MVA / MEP途径"],
    [/amino acid|glutamate|lysine|氨基酸|谷氨酸|赖氨酸/i, "氨基酸", "TCA / C₄回补"],
    [/succinate|fumarate|malate|organic acid|琥珀酸|有机酸/i, "有机酸", "TCA衍生途径"],
    [/phloroglucinol|polyketide|aromatic|间苯三酚|聚酮|芳香/i, "芳香族 / 聚酮", "丙二酰-CoA途径"],
  ];
  const chassis = chassisRules.find(([rule]) => rule.test(text))?.[1] ?? "待人工标注底盘";
  const productMatch = productRules.find(([rule]) => rule.test(text));
  const product = productMatch?.[1] ?? "其他生物产品";
  const route = productMatch?.[2] ?? "乙酸同化 / 中心代谢";
  const mode = /co-?util|co-?feed|co-?ferment|co-?substrate|共利用|共底物|共发酵/i.test(text) ? "乙酸共利用" : "乙酸相关底物体系";
  return { chassis, product, route, mode };
}

function normalizeResearchQuery(query: string) {
  const raw = query.trim();
  if (!raw) return "acetate carbon source microbial production biosynthesis";

  const translations: Array<[RegExp, string]> = [
    [/适应性进化|实验室进化|定向进化/g, " adaptive laboratory evolution "],
    [/共利用|共底物|共发酵/g, " co-utilization cofeeding co-fermentation "],
    [/乙酸|醋酸|乙酸盐/g, " acetate "],
    [/谷氨酸棒状杆菌|谷氨酸棒杆菌|谷棒/g, " Corynebacterium glutamicum "],
    [/大肠杆菌/g, " Escherichia coli "],
    [/解脂耶氏酵母/g, " Yarrowia lipolytica "],
    [/恶臭假单胞菌/g, " Pseudomonas putida "],
    [/聚羟基脂肪酸酯|聚羟基烷酸酯|聚羟基脂肪酸酯/g, " polyhydroxyalkanoate PHA "],
    [/微生物油脂|油脂|脂质/g, " microbial lipid "],
    [/衣康酸/g, " itaconic acid "],
    [/谷氨酸/g, " glutamate "],
    [/琥珀酸/g, " succinate "],
    [/代谢工程/g, " metabolic engineering "],
    [/耐受性|耐受/g, " tolerance "],
    [/生物合成|生物制造/g, " biosynthesis bioproduction "],
    [/底盘|宿主/g, " microbial chassis host "],
  ];

  let normalized = raw;
  for (const [pattern, replacement] of translations) normalized = normalized.replace(pattern, replacement);
  normalized = normalized.replace(/[\u4e00-\u9fff]+/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) normalized = "microbial production biosynthesis";
  return /\bacetate\b|acetic acid/i.test(normalized) ? normalized : `acetate ${normalized}`;
}

async function searchOpenAlexInBrowser(query: string): Promise<Paper[]> {
  const requested = normalizeResearchQuery(query);
  const params = new URLSearchParams({ search: requested, "per-page": "30", filter: "from_publication_date:1990-01-01" });
  const response = await fetch(`https://api.openalex.org/works?${params}`);
  if (!response.ok) throw new Error(`OpenAlex ${response.status}`);
  const payload = await response.json() as { results?: OpenAlexWork[] };
  return (payload.results ?? []).flatMap((work) => {
    const title = String(work.title ?? "").trim();
    const abstract = rebuildOpenAlexAbstract(work.abstract_inverted_index);
    const searchable = `${title} ${abstract}`;
    if (!title || !/acetate|acetic acid|sodium acetate|乙酸|醋酸/i.test(searchable)) return [];
    const { chassis, product, route, mode } = classifyLivePaper(searchable);
    const authors = (work.authorships ?? []).slice(0, 4).map((entry) => entry.author?.display_name).filter(Boolean).join(", ");
    const doi = typeof work.doi === "string" ? work.doi.replace("https://doi.org/", "") : undefined;
    const language: "EN" | "ZH" = work.language === "zh" || /[\u4e00-\u9fff]/.test(title) ? "ZH" : "EN";
    return [{
      id: doi ? `doi-${doi}` : `oa-${work.id ?? title}`,
      doi,
      title,
      titleZh: language === "ZH" ? title : "点击生成中文译题",
      authors: authors || "作者信息待补充",
      year: Number(work.publication_year) || 0,
      journal: work.primary_location?.source?.display_name ?? "OpenAlex indexed source",
      chassis,
      product,
      route,
      mode,
      language,
      source: "OpenAlex",
      href: work.doi ?? work.primary_location?.landing_page_url ?? work.id ?? "https://openalex.org/",
      summaryZh: language === "ZH" ? (abstract.slice(0, 210) || "中文记录，摘要待补充。") : "英文摘要可在双语详情中同步翻译。",
      abstract,
      tags: [product, chassis === "待人工标注底盘" ? "待标注" : chassis, mode],
      live: true,
    } satisfies Paper];
  });
}

async function searchEuropePmcInBrowser(query: string): Promise<Paper[]> {
  const requested = normalizeResearchQuery(query);
  const params = new URLSearchParams({
    query: `TITLE_ABS:("${requested.replace(/"/g, "")}")`,
    format: "json",
    pageSize: "30",
    resultType: "core",
  });
  const response = await fetch(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?${params}`);
  if (!response.ok) throw new Error(`Europe PMC ${response.status}`);
  const payload = await response.json() as { resultList?: { result?: EuropePmcResult[] } };

  return (payload.resultList?.result ?? []).flatMap((work) => {
    const title = String(work.title ?? "").replace(/<[^>]+>/g, "").trim();
    const abstract = String(work.abstractText ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const searchable = `${title} ${abstract}`;
    if (!title || !/acetate|acetic acid|sodium acetate|乙酸|醋酸/i.test(searchable)) return [];
    const { chassis, product, route, mode } = classifyLivePaper(searchable);
    const doi = work.doi?.trim();
    const language: "EN" | "ZH" = work.language?.toLowerCase().startsWith("zh") || /[\u4e00-\u9fff]/.test(title) ? "ZH" : "EN";
    const articleSource = work.source || (work.pmcid ? "PMC" : "MED");
    const articleId = work.id || work.pmid || work.pmcid;
    return [{
      id: doi ? `doi-${doi}` : `epmc-${articleSource}-${articleId ?? title}`,
      doi,
      title,
      titleZh: language === "ZH" ? title : "点击生成中文译题",
      authors: work.authorString || "作者信息待补充",
      year: Number(work.pubYear) || 0,
      journal: work.journalTitle || "Europe PMC indexed source",
      chassis,
      product,
      route,
      mode,
      language,
      source: "Europe PMC",
      href: doi
        ? `https://doi.org/${doi}`
        : articleId
          ? `https://europepmc.org/article/${articleSource}/${articleId}`
          : "https://europepmc.org/",
      summaryZh: language === "ZH" ? (abstract.slice(0, 210) || "中文记录，摘要待补充。") : "英文摘要可在双语详情中同步翻译。",
      abstract,
      tags: [product, chassis === "待人工标注底盘" ? "待标注" : chassis, mode],
      live: true,
    } satisfies Paper];
  });
}

function deduplicateLivePapers(items: Paper[]) {
  const seen = new Set<string>();
  return items.filter((paper) => {
    const key = paper.doi?.toLowerCase() || paper.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function searchLiteratureInBrowser(query: string) {
  const requestedQuery = normalizeResearchQuery(query);
  const sourceNames = ["OpenAlex", "Europe PMC"] as const;
  const settled = await Promise.allSettled([
    searchOpenAlexInBrowser(requestedQuery),
    searchEuropePmcInBrowser(requestedQuery),
  ]);
  const sourceStatus = settled.map((result, index) => ({
    name: sourceNames[index],
    status: result.status === "fulfilled" ? "ok" : "error",
  }));
  const papers = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  if (settled.every((result) => result.status === "rejected")) {
    throw new Error("OpenAlex 与 Europe PMC 暂时均无法连接，请稍后重试");
  }
  return { papers: deduplicateLivePapers(papers), sourceStatus, requestedQuery };
}

async function translateBrowserText(text: string) {
  if (!text) return "";
  const params = new URLSearchParams({ q: text.slice(0, 450), langpair: "en|zh-CN" });
  const response = await fetch(`https://api.mymemory.translated.net/get?${params}`);
  if (!response.ok) throw new Error("翻译服务暂不可用");
  const payload = await response.json() as { responseData?: { translatedText?: string } };
  return payload.responseData?.translatedText?.trim() || "";
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"' && quoted) { value += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { cells.push(value.trim()); value = ""; }
    else value += char;
  }
  cells.push(value.trim());
  return cells;
}

function makeImportedPaper(record: Record<string, string | string[]>, index: number): Paper | null {
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const value = record[key] ?? record[key.toLowerCase()] ?? record[key.toUpperCase()];
      if (Array.isArray(value)) return value.join(", ");
      if (value) return value;
    }
    return "";
  };
  const title = pick("TI", "T1", "title", "题名", "标题").trim();
  if (!title) return null;
  const abstract = pick("AB", "abstract", "摘要");
  const authors = pick("AU", "FAU", "author", "authors", "作者") || "作者信息待补充";
  const yearText = pick("PY", "Y1", "DP", "year", "年份", "发表时间");
  const journal = pick("JO", "JF", "JT", "journal", "source", "期刊", "来源") || "授权数据库导入";
  const doiRaw = pick("DO", "doi", "LID").match(/10\.\d{4,9}\/\S+/i)?.[0]?.replace(/[\s.;]+$/, "");
  const url = pick("UR", "url", "链接") || (doiRaw ? `https://doi.org/${doiRaw}` : "#coverage");
  const language: "EN" | "ZH" = /[\u4e00-\u9fff]/.test(title) ? "ZH" : "EN";
  return {
    id: doiRaw ? `import-doi-${doiRaw}` : `import-${Date.now()}-${index}`,
    doi: doiRaw,
    title,
    titleZh: language === "ZH" ? title : "英文导入记录 · 可生成中文译题",
    authors,
    year: Number(yearText.match(/(?:19|20)\d{2}/)?.[0]) || 0,
    journal,
    chassis: "待人工标注底盘",
    product: "待人工标注产物",
    route: "待建立通路关联",
    mode: /co-?util|co-?feed|共利用|共底物/i.test(`${title} ${abstract}`) ? "乙酸共利用" : "乙酸相关底物体系",
    language,
    source: "授权数据库导入",
    href: url,
    summaryZh: language === "ZH" ? (abstract.slice(0, 240) || "中文导入记录，摘要待补充。") : "英文导入记录可在双语详情中生成中文译文。",
    abstract,
    tags: ["授权导入", "待标注", language],
    live: language === "EN",
  };
}

function parseImportedFile(text: string, filename: string) {
  if (filename.toLowerCase().endsWith(".csv")) {
    const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const headers = parseCsvLine(lines[0]);
    return lines.slice(1).map((line, index) => {
      const cells = parseCsvLine(line);
      const record = Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] ?? ""]));
      return makeImportedPaper(record, index);
    }).filter((paper): paper is Paper => Boolean(paper));
  }
  const blocks = text.split(/\r?\n(?=TY\s{0,2}-|PMID-)/).filter((block) => /(?:TI|T1)\s{0,2}-/.test(block));
  return blocks.map((block, index) => {
    const record: Record<string, string[]> = {};
    let currentKey = "";
    for (const line of block.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9]{2,4})\s{0,2}-\s?(.*)$/);
      if (match) {
        currentKey = match[1];
        record[currentKey] = [...(record[currentKey] ?? []), match[2].trim()];
      } else if (currentKey && /^\s+/.test(line)) {
        const values = record[currentKey];
        values[values.length - 1] = `${values[values.length - 1]} ${line.trim()}`;
      }
    }
    return makeImportedPaper(record, index);
  }).filter((paper): paper is Paper => Boolean(paper));
}

function PathwayMap() {
  return (
    <div className="pathway-map" aria-label="乙酸同化与产物合成代谢图谱">
      <div className="path-grid" aria-hidden="true" />
      <div className="carbon-badge">
        <span>CH₃COO⁻</span>
        <strong>乙酸</strong>
        <small>C₂</small>
      </div>
      <div className="path-node node-accoa"><b>乙酰-CoA</b><span>ACS / AckA–Pta</span></div>
      <div className="path-node node-tca"><b>TCA循环</b><span>能量 · C₄前体</span></div>
      <div className="path-node node-gly"><b>乙醛酸旁路</b><span>ICL · MS</span></div>
      <div className="product-node product-lipid"><span>脂质 / PHA</span><i>乙酰-CoA</i></div>
      <div className="product-node product-acid"><span>有机酸 / 氨基酸</span><i>TCA中间体</i></div>
      <div className="product-node product-terpene"><span>萜类 / 芳香族</span><i>MVA · 丙二酰-CoA</i></div>
      <svg className="path-lines" viewBox="0 0 720 420" role="img" aria-label="乙酸进入乙酰辅酶A后分流至三类产品">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#2dd4bf" />
          </marker>
        </defs>
        <path d="M168 212 C220 212 234 126 302 126" />
        <path d="M168 212 C230 212 238 212 302 212" />
        <path d="M168 212 C220 212 234 300 302 300" />
        <path d="M414 126 C500 126 500 82 585 82" />
        <path d="M414 212 C500 212 500 212 585 212" />
        <path d="M414 300 C500 300 500 340 585 340" />
      </svg>
      <p className="map-note"><span />按碳流入口、回补节点和产物前体建立证据关联</p>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [chassis, setChassis] = useState("全部底盘");
  const [product, setProduct] = useState("全部产物");
  const [language, setLanguage] = useState("中英双语");
  const [livePapers, setLivePapers] = useState<Paper[]>([]);
  const [lastLiveQuery, setLastLiveQuery] = useState("");
  const [importedPapers, setImportedPapers] = useState<Paper[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("开放数据库实时检索尚未启动");
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [translation, setTranslation] = useState<{ titleZh: string; abstractZh: string; notice?: string } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem("acetate-atlas-imports");
        if (stored) setImportedPapers(JSON.parse(stored) as Paper[]);
      } catch { /* local cache is optional */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const allPapers = useMemo(() => {
    const seen = new Set<string>();
    return [...importedPapers, ...livePapers, ...papers].filter((paper) => {
      const key = paper.doi?.toLowerCase() || paper.title.toLowerCase().replace(/\W/g, "");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [importedPapers, livePapers]);

  const filteredPapers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPapers.filter((paper) => {
      const searchable = [paper.title, paper.titleZh, paper.authors, paper.chassis, paper.product, paper.route, paper.tags.join(" ")].join(" ").toLowerCase();
      const isCurrentLiveResult = Boolean(paper.live && q && q === lastLiveQuery);
      const matchesQuery = isCurrentLiveResult || !q || q.split(/\s+/).every((token) => searchable.includes(token));
      const matchesChassis = chassis === "全部底盘" || paper.chassis === chassis;
      const matchesProduct = product === "全部产物" || paper.product === product;
      const matchesLanguage = language === "中英双语" || paper.language === language;
      return matchesQuery && matchesChassis && matchesProduct && matchesLanguage;
    });
  }, [query, chassis, product, language, allPapers, lastLiveQuery]);

  const scrollToExplore = () => document.getElementById("literature")?.scrollIntoView({ behavior: "smooth" });

  const runLiveSearch = async () => {
    setIsSyncing(true);
    setSyncMessage("正在同步 OpenAlex 与 Europe PMC…");
    try {
      const requestedQuery = normalizeResearchQuery(query);
      const isGitHubPages = window.location.hostname.endsWith("github.io");
      const data = isGitHubPages
        ? await searchLiteratureInBrowser(query)
        : await fetch(`/api/literature?q=${encodeURIComponent(requestedQuery)}`).then(async (response) => {
            if (!response.ok) throw new Error("检索服务暂不可用");
            return response.json() as Promise<{ papers?: Paper[]; sourceStatus?: Array<{ name: string; status: string }>; updatedAt?: string }>;
          });
      const next = data.papers ?? [];
      setLivePapers(next);
      setLastLiveQuery(query.trim().toLowerCase());
      const activeSources = (data.sourceStatus ?? []).filter((item) => item.status === "ok").map((item) => item.name).join(" + ");
      setSyncMessage(activeSources
        ? `已按“${requestedQuery}”从 ${activeSources} 获取并去重 ${next.length} 条结果`
        : "开放数据源暂未响应，已保留内置核验文献");
    } catch (error) {
      setSyncMessage(error instanceof Error ? error.message : "实时检索失败，请稍后重试");
    } finally {
      setIsSyncing(false);
    }
  };

  const openPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    setTranslateError("");
    setTranslation(paper.live ? null : { titleZh: paper.titleZh, abstractZh: paper.summaryZh });
  };

  const generateTranslation = async () => {
    if (!selectedPaper) return;
    setIsTranslating(true);
    setTranslateError("");
    try {
      const isGitHubPages = window.location.hostname.endsWith("github.io");
      const data = isGitHubPages
        ? {
            titleZh: await translateBrowserText(selectedPaper.title),
            abstractZh: await translateBrowserText(selectedPaper.abstract ?? ""),
            notice: "机器翻译仅用于快速阅读；正式引用请以原文为准。",
          }
        : await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: selectedPaper.title, abstract: selectedPaper.abstract ?? "" }),
          }).then(async (response) => {
            const payload = await response.json() as { titleZh?: string; abstractZh?: string; notice?: string; error?: string };
            if (!response.ok) throw new Error(payload.error || "翻译失败");
            return payload;
          });
      setTranslation({
        titleZh: data.titleZh || selectedPaper.titleZh,
        abstractZh: data.abstractZh || "该索引暂未提供可翻译摘要。",
        notice: data.notice,
      });
    } catch (error) {
      setTranslateError(error instanceof Error ? error.message : "翻译服务暂不可用");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleImport = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = parseImportedFile(await file.text(), file.name);
      if (!parsed.length) throw new Error("未识别到文献记录，请使用 RIS、NBIB 或 CSV 导出格式");
      setImportedPapers((current) => {
        const next = [...parsed, ...current];
        try { window.localStorage.setItem("acetate-atlas-imports", JSON.stringify(next)); } catch { /* optional */ }
        return next;
      });
      setSyncMessage(`已从 ${file.name} 导入 ${parsed.length} 条记录，并按 DOI / 题名参与去重`);
    } catch (error) {
      setSyncMessage(error instanceof Error ? error.message : "文件导入失败");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="乙酸底物生物合成图谱首页">
          <span className="brand-mark"><i /><i /><i /><i /></span>
          <span>乙酸底物生物合成图谱</span>
        </a>
        <nav aria-label="主导航">
          <a className="active" href="#map">研究图谱</a>
          <a href="#chassis">底盘菌</a>
          <a href="#products">产物</a>
          <a href="#literature">文献库</a>
          <a href="#coverage">覆盖范围</a>
        </nav>
        <div className="header-tools">
          <span className="status-dot" />
          <span>双语索引</span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>ACETATE-BASED BIOSYNTHESIS</span><i /></p>
          <h1>从乙酸出发，<br /><span>重构生物制造的碳流</span></h1>
          <p className="hero-lead">面向所有微生物底盘，系统连接乙酸单一碳源与共底物研究中的文献、代谢通路、工程策略和代表性产物。</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToExplore}>探索文献图谱 <span>→</span></button>
            <a className="text-button" href="#coverage">查看收录边界 <span>↗</span></a>
          </div>
          <div className="hero-facts">
            <div><strong>8+</strong><span>底盘类别</span></div>
            <div><strong>8</strong><span>产物方向</span></div>
            <div><strong>ZH / EN</strong><span>双语对照</span></div>
          </div>
        </div>
        <div id="map"><PathwayMap /></div>
      </section>

      <section className="search-panel" id="literature">
        <div className="search-row">
          <label className="search-box">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="检索题名、作者、摘要主题、底盘菌或产物…" />
            <kbd>实时筛选</kbd>
          </label>
          <select value={chassis} onChange={(event) => setChassis(event.target.value)} aria-label="底盘菌筛选">
            <option>全部底盘</option>
            {[...new Set(allPapers.map((paper) => paper.chassis))].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={product} onChange={(event) => setProduct(event.target.value)} aria-label="产物筛选">
            <option>全部产物</option>
            {[...new Set(allPapers.map((paper) => paper.product))].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="语言筛选">
            <option>中英双语</option>
            <option value="ZH">中文</option>
            <option value="EN">英文</option>
          </select>
          <button className="sync-button" onClick={runLiveSearch} disabled={isSyncing}>{isSyncing ? "同步中…" : "联网检索"}<span>↻</span></button>
        </div>
        <div className="search-meta">
          <p><span className="live-pulse" />当前展示 <b>{filteredPapers.length}</b> 条文献 · {syncMessage}</p>
          <div className="search-actions">
            <input ref={fileInputRef} type="file" accept=".ris,.nbib,.csv,.txt" onChange={(event) => handleImport(event.target.files?.[0])} />
            <button onClick={() => fileInputRef.current?.click()}>导入 CNKI / 万方 / 维普导出文件</button>
            <button onClick={() => { setQuery(""); setChassis("全部底盘"); setProduct("全部产物"); setLanguage("中英双语"); }}>清除筛选</button>
          </div>
        </div>
      </section>

      <section className="literature-section">
        <div className="section-heading">
          <div><p>CURATED EVIDENCE</p><h2>跨底盘关键文献</h2></div>
          <span>原始题名 · 中文译题 · 中文导读 · 原文链接</span>
        </div>
        <div className="paper-grid">
          {filteredPapers.map((paper, index) => (
            <article className="paper-card" key={paper.id}>
              <div className="paper-topline">
                <span className="index">{String(index + 1).padStart(2, "0")}</span>
                <span className="lang">{paper.live ? `LIVE · ${paper.language}` : paper.language === "EN" ? "EN → 中译" : "中文"}</span>
                <span className="year">{paper.year}</span>
              </div>
              <p className="paper-original">{paper.title}</p>
              <h3>{paper.live && paper.language === "EN" ? "英文记录 · 可生成中文译题" : paper.titleZh}</h3>
              <p className="paper-summary">{paper.summaryZh}</p>
              <dl>
                <div><dt>底盘</dt><dd>{paper.chassis}</dd></div>
                <div><dt>产物</dt><dd>{paper.product}</dd></div>
                <div><dt>模式</dt><dd>{paper.mode}</dd></div>
              </dl>
              <div className="tag-row">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="paper-footer">
                <span>{paper.journal} · {paper.authors}</span>
                <div><button onClick={() => openPaper(paper)}>双语详情</button><a href={paper.href} target="_blank" rel="noreferrer" aria-label={`打开原文：${paper.titleZh}`}>原文 ↗</a></div>
              </div>
            </article>
          ))}
          {filteredPapers.length === 0 && <div className="empty-state"><strong>没有匹配结果</strong><span>尝试减少筛选条件，或搜索“PHA”“共利用”“Yarrowia”等关键词。</span></div>}
        </div>
      </section>

      <section className="chassis-section" id="chassis">
        <div className="section-heading">
          <div><p>HOST LANDSCAPE</p><h2>底盘覆盖不是单选题</h2></div>
          <span>按物种、代谢特征和适用产品建立并行证据链</span>
        </div>
        <div className="chassis-grid">
          {chassisList.map(([zh, latin, products], index) => (
            <article key={latin}>
              <span className="chassis-number">0{index + 1}</span>
              <div><h3>{zh}</h3><em>{latin}</em><p>{products}</p></div>
              <span className="arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="product-section" id="products">
        <div className="section-heading">
          <div><p>PRODUCT SPACE</p><h2>以碳流入口组织产物空间</h2></div>
          <span>避免将“乙酸参与代谢”误判为“乙酸作为合成底物”</span>
        </div>
        <div className="product-map">
          <div className="product-core"><small>C₂</small><strong>乙酸</strong><span>Acetate</span></div>
          {[
            ["乙酰-CoA衍生物", "PHA · 脂质 · 聚酮"],
            ["TCA衍生物", "衣康酸 · 琥珀酸 · 氨基酸"],
            ["MVA / 萜类", "甲羟戊酸 · 异戊二烯"],
            ["芳香族化合物", "间苯三酚 · 芳香酸"],
            ["蛋白与酶", "重组蛋白 · 功能酶"],
            ["燃料与平台化合物", "烷烃 · 醇 · 酮"],
          ].map(([name, examples]) => <div className="product-pill" key={name}><b>{name}</b><span>{examples}</span></div>)}
        </div>
      </section>

      <section className="coverage-section" id="coverage">
        <div>
          <p className="eyebrow"><span>EVIDENCE COVERAGE</span><i /></p>
          <h2>“尽可能完整”必须可验证，<br />而不是用一个数字制造完整感</h2>
        </div>
        <div className="coverage-copy">
          <p>本图谱将开放索引、生命科学数据库与中文授权数据库导出结果分层处理；以 DOI、PMID、题名与作者组合去重，并保留每条记录的来源与更新时间。</p>
          <div className="source-list">
            <span><i className="ready" />OpenAlex / Crossref <b>开放同步</b></span>
            <span><i className="ready" />PubMed / Europe PMC <b>生命科学核验</b></span>
            <span><i className="pending" />CNKI / 万方 / 维普 <b>授权导入</b></span>
            <span><i className="ready" />英文题名与摘要 <b>中文对照</b></span>
          </div>
          <small>说明：中文商业数据库通常需要机构授权，网站不会绕过访问权限；可导入其 RIS、NBIB 或 CSV 导出结果并自动去重。导入记录仅保存在当前浏览器，不上传原文文件。</small>
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark"><i /><i /><i /><i /></span><span>乙酸底物生物合成图谱</span></div>
        <p>以证据连接底物、底盘、通路与产物。</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>

      {selectedPaper && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelectedPaper(null); }}>
          <section className="paper-modal" role="dialog" aria-modal="true" aria-labelledby="paper-dialog-title">
            <button className="modal-close" onClick={() => setSelectedPaper(null)} aria-label="关闭文献详情">×</button>
            <div className="modal-kicker"><span>{selectedPaper.source}</span><span>{selectedPaper.year}</span><span>{selectedPaper.language}</span></div>
            <p className="modal-label">ORIGINAL TITLE</p>
            <h2 id="paper-dialog-title">{selectedPaper.title}</h2>
            <p className="modal-authors">{selectedPaper.authors} · {selectedPaper.journal}</p>
            <div className="modal-divider" />
            <div className="translation-heading">
              <p className="modal-label">中文对照</p>
              {selectedPaper.live && selectedPaper.language === "EN" && !translation && <button onClick={generateTranslation} disabled={isTranslating}>{isTranslating ? "正在翻译…" : "同步生成中文译文"}</button>}
            </div>
            {translation ? (
              <div className="translation-copy">
                <h3>{translation.titleZh}</h3>
                <p>{translation.abstractZh}</p>
                {translation.notice && <small>{translation.notice}</small>}
              </div>
            ) : selectedPaper.language === "ZH" ? (
              <div className="translation-copy"><h3>{selectedPaper.title}</h3><p>{selectedPaper.abstract || selectedPaper.summaryZh}</p></div>
            ) : (
              <div className="translation-placeholder"><span>译</span><p>点击上方按钮生成中文题名和摘要译文；原始英文始终保留。</p></div>
            )}
            {translateError && <p className="translate-error">{translateError}</p>}
            <dl className="modal-facts">
              <div><dt>底盘</dt><dd>{selectedPaper.chassis}</dd></div>
              <div><dt>产物</dt><dd>{selectedPaper.product}</dd></div>
              <div><dt>关键通路</dt><dd>{selectedPaper.route}</dd></div>
              <div><dt>底物模式</dt><dd>{selectedPaper.mode}</dd></div>
            </dl>
            <a className="modal-link" href={selectedPaper.href} target="_blank" rel="noreferrer">访问原始文献页面 <span>↗</span></a>
          </section>
        </div>
      )}
    </main>
  );
}
