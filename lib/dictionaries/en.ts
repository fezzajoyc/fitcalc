// en is the typing source of truth: every other dictionary must satisfy Dictionary.
// 刻意不加 as const:字符串需放宽为 string,翻译文件才可实现同一类型。
const en = {
  brand: "FitCalc",
  tagline: "Every tool runs in your browser.",
  metaDesc:
    "Free fitness calculators — BMI, body fat, TDEE calories, ideal weight, one-rep max and running pace. Every formula named, everything in your browser.",

  nav: {
    tools: "All tools",
    categories: "Categories",
    about: "About",
    menu: "Menu",
    language: "Language",
  },

  home: {
    heroTitle: "Training numbers that actually add up",
    heroSub:
      "Six calculators for the numbers that shape training — BMI, body fat, calories, ideal weight, one-rep max and running pace. Every result names its formula, and everything is computed in your browser.",
    browseAll: "Browse all tools",
    categoriesTitle: "Categories",
    featuredTitle: "Popular tools",
    trustLocal: "Your numbers stay on your device",
    trustFree: "Free, no account",
    trustFast: "Instant, works offline",
    rotating: [
      "Your 10K pace and your marathon prediction — from one honest result",
      "A 1RM estimate from a 5-rep set, with the percentage table to match",
      "BMI, body fat and the healthy weight band for your height, as you type",
      "Calorie targets from Mifflin–St Jeor — cut, maintain or build, no signup",
    ],
    statsLabels: { tools: "tools", languages: "languages", uploads: "uploads", accounts: "accounts" },
    eyebrow: "Free forever",
    heroCtaSecondary: "How it works",
    statsTools: "{n} tools",
    statsLanguages: "{n} languages",
    statsUploads: "0 uploads",
    statsAccounts: "0 accounts",
    categoriesSub: "Calculators that shape training, all running on your device.",
    popularSub: "The tools people open most.",
    privacyTitle: "Your numbers never leave your device.",
    privacySub:
      "There is no upload step. The tools are JavaScript running in your browser — that is not a policy promise, it is how they are built.",
    privacyPoint1T: "Local processing",
    privacyPoint1D:
      "Files are read with the browser's own File API and processed in memory. Nothing is transmitted, anywhere.",
    privacyPoint2T: "No accounts",
    privacyPoint2D: "No sign-up, no email, no stored history. Open a tool and use it.",
    privacyPoint3T: "Honest by design",
    privacyPoint3D:
      "If something genuinely cannot be done in the browser, we say so instead of pretending.",
    privacyLink: "Read the full privacy note",
    endTitle: "Pick a tool. It just works.",
    endSub: "Fifteen languages, zero uploads, nothing to install.",
  },

  tools: {
    title: "All tools",
    subtitle: "Search {count} free browser tools. No upload, no signup.",
    filterPlaceholder: "Search tools…",
    count: "{count} tools",
    empty: "No tools match “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Merge, split, convert and edit PDF files without uploading them anywhere." },
    image: { name: "Image", desc: "Compress, resize, crop and convert images right in your browser." },
    text: { name: "Text", desc: "Count, clean, sort and transform text instantly as you type." },
    developer: { name: "Developer", desc: "Formatters, encoders, decoders and generators for daily dev work." },
    seo: { name: "SEO", desc: "Meta tags, schema markup, SERP preview and other on-page SEO helpers." },
    security: { name: "Security", desc: "Passwords, hashes and lookups — generated and checked on your device." },
    utility: { name: "Utility", desc: "Fitness and health calculators: BMI, body fat, calories, ideal weight, 1RM and running pace." },
  },

  tool: {
    howTo: "How to use",
    faq: "Frequently asked questions",
    related: "Related tools",
    privacyNote:
      "This tool runs entirely in your browser. Your data never leaves your device — it is not uploaded to any server.",
    inCategory: "More in {category}",
    backToCategory: "All {category} tools",
  },

  common: {
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    reset: "Reset",
    swap: "Swap",
    clear: "Clear",
    error: "Something went wrong. Check your input and try again.",
    input: "Input",
    output: "Result",
    settings: "Options",
    dropFiles: "Drop files here or click to choose",
    dropFile: "Drop a file here or click to choose",
    processing: "Processing…",
    fileSize: "Size",
    sample: "Try an example",
    uppercase: "UPPERCASE",
  },

  unit: {
    from: "From",
    to: "To",
    amount: "Amount",
    result: "Result",
    common: "Common conversions",
    formula: "Formula",
    allUnits: "All units",
  },

  text: {
    stats: {
      words: "Words",
      characters: "Characters",
      charsNoSpaces: "No spaces",
      sentences: "Sentences",
      paragraphs: "Paragraphs",
      lines: "Lines",
      readingTime: "Reading time",
      readingMinutes: "{n} min read",
    },
  },

  footer: {
    line: "Free fitness calculators. Your numbers never leave your device.",
    privacy: "Privacy",
    terms: "Terms",
    about: "About",
    badges: "Badges",
    language: "Language",
  },

  badge: {
    title: "Zoyku badges",
    desc: "Put a Zoyku badge on your site, README or docs. It links back here and tells people the tools behind it run entirely in the browser.",
    voluntary: "Embedding is completely voluntary — pick a badge if you like the project. No permission needed.",
    md: "Markdown (README)",
    html: "HTML (website)",
    thanks: "Thanks for spreading the word — every embed helps more people discover tools that respect their files.",
  },

    embed: {
    title: "Embed this tool",
    desc: "Put this tool on your own site with one line — it runs entirely in the visitor's browser.",
  },

    mcp: {
    title: "MCP server — AI-accessible tools",
    desc1: "FitCalc ships an MCP (Model Context Protocol) server: AI assistants like Claude or Cursor can execute the same fitness and health calculators you see on this site — same tested logic, no reimplementation.",
    desc2: "The tools run the site's own pure functions for BMI, TDEE, US Navy body fat, ideal weight, one-rep max and running pace. Execution happens on the AI client's machine via npx — nothing is sent to our servers.",
    toolsTitle: "Executable tools ({n})",
    requiresNode: "Requires Node.js 18+. The server runs locally over stdio; only the tool calls you make are computed on your machine.",
    privacy: "Requires Node.js 18+. The server runs locally over stdio; only the tool calls you make are computed on your machine.",
  },

    notFound: {
    title: "Page not found",
    body: "The tool you are looking for does not exist. Browse all tools instead.",
    home: "Go to homepage",
  },
};

export default en;
