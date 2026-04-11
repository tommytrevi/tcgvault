export const languages = {
  en: 'English',
  ja: '日本語',
} as const;

export const defaultLang = 'en';

export const ui = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.app': 'Launch App',
    'nav.about': 'About',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'Track your TCG collection. Know your worth.',
    'hero.description': 'Free, open source, self-hostable. Works with Pokemon, MTG, Yu-Gi-Oh!, Lorcana, One Piece, SWU, Flesh and Blood, Pokemon Japan.',
    'hero.launchApp': 'Launch App',
    'hero.viewOnGitHub': 'View on GitHub',

    // Stats
    'stats.games': 'Games',
    'stats.cards': 'Cards',
    'stats.openSource': 'Open Source',
    'stats.zeroBackend': 'Zero Backend',

    // Features section
    'features.title': 'Why tcgvault?',
    'features.multiGame.title': 'Multi-game',
    'features.multiGame.description': '8 trading card games in one place. Switch between Pokemon, MTG, Yu-Gi-Oh!, and more.',
    'features.livePricing.title': 'Live pricing',
    'features.livePricing.description': 'Real-time card values via the TCG Price Lookup API. Market, per-condition, and graded prices.',
    'features.envConfig.title': 'Env var config',
    'features.envConfig.description': 'Set TCG_API_KEY in .env once. Your API key stays server-side, never exposed to the browser.',
    'features.exportAnywhere.title': 'Export anywhere',
    'features.exportAnywhere.description': 'Export your collection to JSON or CSV. Your data, your format.',
    'features.selfHostable.title': 'Self-hostable',
    'features.selfHostable.description': 'Deploy to Cloudflare Pages, Vercel, Netlify, or run it in Docker. 5 minutes to ship.',
    'features.openSource.title': 'Open source',
    'features.openSource.description': 'MIT licensed. Fork it, customize it, make it yours. PRs welcome.',

    // How it works
    'howItWorks.title': 'How it works',
    'howItWorks.step1.title': 'Get a free API key',
    'howItWorks.step1.description': 'Sign up at tcgpricelookup.com. Free tier includes 200 requests/day, no credit card required.',
    'howItWorks.step2.title': 'Set your env var',
    'howItWorks.step2.description': 'Add TCG_API_KEY to your .env file (local) or your deploy platform settings.',
    'howItWorks.step3.title': 'Deploy and track',
    'howItWorks.step3.description': 'Deploy in one click. Open your tcgvault, add cards, track collection value.',

    // Deploy section
    'deploy.title': 'Deploy in 60 seconds',
    'deploy.description': 'One-click deployment to your favorite platform.',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Do I need to pay to use this?',
    'faq.a1': 'No. tcgvault is free and open source (MIT). The TCG Price Lookup API has a free tier with 200 requests/day — no credit card required. Upgrade to Trader ($14.99/mo) for higher limits, eBay prices, graded values, and price history.',
    'faq.q2': 'Where is my data stored?',
    'faq.a2': 'Your collection list is stored in your browser\'s localStorage. Card price data comes from the TCG Price Lookup API via your own server (with your API key). No third parties see your data.',
    'faq.q3': 'How do I set my API key?',
    'faq.a3': 'Add TCG_API_KEY to your .env file when running locally, or to your deployment platform\'s environment variables (Cloudflare Pages, Vercel, Netlify all support this in their dashboard).',
    'faq.q4': 'Which games are supported?',
    'faq.a4': 'All 8 games supported by TCG Price Lookup: Pokemon, Pokemon Japan, Magic: The Gathering, Yu-Gi-Oh!, Disney Lorcana, One Piece, Star Wars: Unlimited, Flesh and Blood.',
    'faq.q5': 'Is my API key safe?',
    'faq.a5': 'Yes. Your TCG_API_KEY is only used server-side (in Astro API routes or Cloudflare Workers). It is never exposed to the browser or included in any client-side bundle.',
    'faq.q6': 'Can I contribute?',
    'faq.a6': 'Absolutely. tcgvault is MIT licensed on GitHub. Open issues, submit PRs, or fork it and make it yours.',

    // CTA
    'cta.title': 'Ready to track your collection?',
    'cta.description': 'Deploy in 60 seconds. Free API key included.',
    'cta.getStarted': 'Get Started',
    'cta.viewDocs': 'View Docs',

    // Footer
    'footer.tagline': 'Open source TCG collection tracker.',
    'footer.builtWith': 'Built with',
    'footer.api': 'TCG Price Lookup API',
    'footer.docs': 'Docs',
    'footer.github': 'GitHub',
    'footer.license': 'MIT License',

    // About page
    'about.title': 'About tcgvault',
    'about.intro': 'tcgvault is an open source, self-hostable web app for tracking your trading card game collection.',
    'about.architecture.title': 'Architecture',
    'about.architecture.description': 'Server-rendered Astro app with Cloudflare Workers for API routes. Your API key lives in an environment variable, never in the browser. Your collection data lives in your browser\'s localStorage.',
    'about.stack.title': 'Tech Stack',
    'about.privacy.title': 'Privacy',
    'about.privacy.description': 'No tracking, no analytics, no accounts. Your collection never leaves your browser. Card price data is fetched server-side via your own API key.',

    // App page
    'app.notConfigured': 'Server not configured',
    'app.notConfiguredDetails': 'The TCG_API_KEY environment variable is not set on the server. Follow the setup guide to configure it.',
    'app.setupGuide': 'Setup guide',
    'app.searchPlaceholder': 'Search any card...',
    'app.collection': 'Collection',
    'app.settings': 'Settings',
    'app.totalValue': 'Total value',
    'app.addToCollection': 'Add to Collection',
    'app.export': 'Export',
    'app.exportJSON': 'Export as JSON',
    'app.exportCSV': 'Export as CSV',
    'app.clearCollection': 'Clear Collection',
    'app.emptyCollection': 'Your collection is empty',
    'app.emptyCollectionPrompt': 'Search for a card to add it to your collection.',
  },
  ja: {
    // Nav
    'nav.home': 'ホーム',
    'nav.app': 'アプリを起動',
    'nav.about': 'このツールについて',
    'nav.github': 'GitHub',

    // Hero
    'hero.tagline': 'TCGコレクションを追跡。価値を把握。',
    'hero.description': '無料、オープンソース、セルフホスト可能。Pokemon、MTG、遊戯王、Lorcana、ワンピース、SWU、Flesh and Blood、Pokemon Japanに対応。',
    'hero.launchApp': 'アプリを起動',
    'hero.viewOnGitHub': 'GitHubで見る',

    // Stats
    'stats.games': 'ゲーム',
    'stats.cards': 'カード',
    'stats.openSource': 'オープンソース',
    'stats.zeroBackend': 'バックエンド不要',

    // Features section
    'features.title': 'なぜtcgvaultを選ぶのか？',
    'features.multiGame.title': 'マルチゲーム対応',
    'features.multiGame.description': '8つのトレーディングカードゲームを一箇所で管理。Pokemon、MTG、遊戯王などを自由に切り替え。',
    'features.livePricing.title': 'リアルタイム価格',
    'features.livePricing.description': 'TCG Price Lookup APIによるリアルタイムカード価格。市場、コンディション別、グレーデッド価格を取得。',
    'features.envConfig.title': '環境変数で設定',
    'features.envConfig.description': '.envにTCG_API_KEYを設定するだけ。APIキーはサーバー側に保管され、ブラウザには公開されません。',
    'features.exportAnywhere.title': 'どこにでもエクスポート',
    'features.exportAnywhere.description': 'コレクションをJSONまたはCSVでエクスポート。自分のデータは自分の形式で。',
    'features.selfHostable.title': 'セルフホスト対応',
    'features.selfHostable.description': 'Cloudflare Pages、Vercel、Netlifyへデプロイ、またはDockerで自前ホスト。5分で起動。',
    'features.openSource.title': 'オープンソース',
    'features.openSource.description': 'MITライセンス。フォーク、カスタマイズ、あなたのものに。PRも歓迎。',

    // How it works
    'howItWorks.title': '使い方',
    'howItWorks.step1.title': '無料のAPIキーを取得',
    'howItWorks.step1.description': 'tcgpricelookup.comでサインアップ。無料プランは1日200リクエスト、クレジットカード不要。',
    'howItWorks.step2.title': '環境変数を設定',
    'howItWorks.step2.description': '.envファイル（ローカル）またはデプロイ先の設定にTCG_API_KEYを追加。',
    'howItWorks.step3.title': 'デプロイして追跡開始',
    'howItWorks.step3.description': 'ワンクリックでデプロイ。tcgvaultを開いて、カードを追加、コレクション価値を追跡。',

    // Deploy section
    'deploy.title': '60秒でデプロイ',
    'deploy.description': 'お気に入りのプラットフォームへワンクリックでデプロイ。',

    // FAQ
    'faq.title': 'よくある質問',
    'faq.q1': '使用するのに料金はかかりますか？',
    'faq.a1': 'いいえ。tcgvaultは無料のオープンソース（MIT）です。TCG Price Lookup APIは無料プラン（1日200リクエスト、クレジットカード不要）を提供しています。Traderプラン（月額$14.99）にアップグレードすると、より高いレートリミット、eBay価格、グレーデッド値、価格履歴が利用可能になります。',
    'faq.q2': 'データはどこに保存されますか？',
    'faq.a2': 'コレクションリストはブラウザのlocalStorageに保存されます。カード価格データは自分のAPIキーを使って自分のサーバー経由でTCG Price Lookup APIから取得されます。第三者があなたのデータを見ることはありません。',
    'faq.q3': 'APIキーはどう設定しますか？',
    'faq.a3': 'ローカル実行時は.envファイルにTCG_API_KEYを追加。デプロイする場合はプラットフォーム（Cloudflare Pages、Vercel、Netlifyなど）の環境変数設定に追加します。',
    'faq.q4': '対応しているゲームは？',
    'faq.a4': 'TCG Price Lookupがサポートする全8ゲーム：Pokemon、Pokemon Japan、Magic: The Gathering、遊戯王、Disney Lorcana、ワンピース、Star Wars: Unlimited、Flesh and Blood。',
    'faq.q5': 'APIキーは安全ですか？',
    'faq.a5': 'はい。TCG_API_KEYはサーバー側（AstroのAPIルートまたはCloudflare Workers）でのみ使用されます。ブラウザに公開されることも、クライアント側のバンドルに含まれることもありません。',
    'faq.q6': '貢献できますか？',
    'faq.a6': 'もちろんです。tcgvaultはGitHubでMITライセンスで公開されています。Issueを立ててPRを送るか、フォークしてあなた自身のものにしてください。',

    // CTA
    'cta.title': 'コレクションを追跡する準備はできましたか？',
    'cta.description': '60秒でデプロイ。無料APIキー付き。',
    'cta.getStarted': '始める',
    'cta.viewDocs': 'ドキュメントを見る',

    // Footer
    'footer.tagline': 'オープンソースのTCGコレクション追跡ツール',
    'footer.builtWith': '使用',
    'footer.api': 'TCG Price Lookup API',
    'footer.docs': 'ドキュメント',
    'footer.github': 'GitHub',
    'footer.license': 'MITライセンス',

    // About page
    'about.title': 'tcgvaultについて',
    'about.intro': 'tcgvaultは、トレーディングカードゲームのコレクションを追跡するためのオープンソース・セルフホスト対応Webアプリです。',
    'about.architecture.title': 'アーキテクチャ',
    'about.architecture.description': 'Cloudflare Workersを使用したAPIルート付きのサーバーレンダリングAstroアプリ。APIキーは環境変数に存在し、ブラウザには決して公開されません。コレクションデータはブラウザのlocalStorageに保存されます。',
    'about.stack.title': 'テックスタック',
    'about.privacy.title': 'プライバシー',
    'about.privacy.description': 'トラッキングなし、アナリティクスなし、アカウントなし。コレクションはブラウザから出ません。カード価格データは自分のAPIキーを使ってサーバー側で取得されます。',

    // App page
    'app.notConfigured': 'サーバーが設定されていません',
    'app.notConfiguredDetails': 'TCG_API_KEY環境変数がサーバーに設定されていません。セットアップガイドに従って設定してください。',
    'app.setupGuide': 'セットアップガイド',
    'app.searchPlaceholder': 'カードを検索...',
    'app.collection': 'コレクション',
    'app.settings': '設定',
    'app.totalValue': '総額',
    'app.addToCollection': 'コレクションに追加',
    'app.export': 'エクスポート',
    'app.exportJSON': 'JSONとしてエクスポート',
    'app.exportCSV': 'CSVとしてエクスポート',
    'app.clearCollection': 'コレクションをクリア',
    'app.emptyCollection': 'コレクションは空です',
    'app.emptyCollectionPrompt': 'カードを検索してコレクションに追加してください。',
  },
} as const;

export type Lang = keyof typeof ui;
