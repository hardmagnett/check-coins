import Vue from 'vue'
import VueScreen from 'vue-screen'

// Раньше у меня был собственный 'изобретенный велосипед' для данной функциональности.
// Позже нашел эту библиотеку.
Vue.use(VueScreen, {
  // Брекпоинты должны быть синхронны с теми что в variables.scss.
  // Если бы использовались нативные css-переменные,
  // то можно было-бы избежать этого дубляи получить значения css-переменных js-ом.
  // но пока-что css значительно уступает scss в возможностях.
  bpSm: 480,
  bpSm2: 768,
  bpMd: 960,
  bpLg: 1280,
  bpXl: 1600,
  breakpointsOrder: [
    'bpSm',
    'bpSm2',
    'bpMd',
    'bpLg',
    'bpXl',
  ],
  // Можно было-бы обойтись css-media-queries,
  // но т.к. рендеринг таблицы высоконагружен
  // нужно не рендерить всё что только можно.
  // Поэтому скрываю столбцы на основе JS.
  showInTableColumnRank: (screen) => screen.bpSm,
  showInTableColumnMarketCap: (screen) => screen.bpSm2,
  showInTableColumnVolume24Hr: (screen) => screen.bpSm2,
})
