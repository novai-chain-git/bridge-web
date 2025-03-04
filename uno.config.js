import { defineConfig, presetAttributify, presetMini, presetUno, presetIcons } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
// 加载 icon
import { cleanupSVG, deOptimisePaths, importDirectory, parseColors, runSVGO } from '@iconify/tools';
/**
 * Load custom icon set
 */
//
const svgIgnoreName = [
  'usdt',
  'usdc',
  'baoxiu',
  'pz',
  'record',
  'waterrecord',
  'pingjia',
  'house',
  'rentalHistory',
  'maintenance',
  'diamond',
  'bnb'
];
function loadCustomIconSet() {
  const promise = new Promise((resolve, reject) => {
    importDirectory('./src/assets/svg', {
      prefix: 'svg'
    }).then((iconSet) => {
      iconSet
        .forEach(async (name) => {
          if (svgIgnoreName.includes(name)) return;
          const svg = iconSet.toSVG(name);
          // 清理 SVG
          cleanupSVG(svg);
          // Change color to `currentColor`
          await parseColors(svg, {
            defaultColor: 'currentColor',
            callback: (attr, colorStr, color) => {
              // Change black to 'currentColor'
              if (color) {
                return 'currentColor';
              }
              switch (color?.type) {
                case 'none':
                case 'current':
                  return color;
              }

              throw new Error(`Unexpected color "${colorStr}" in attribute ${attr}`);
            }
          });

          // Optimise
          runSVGO(svg);

          // Update paths for compatibility with old software
          await deOptimisePaths(svg);

          // Update icon in icon set
          iconSet.fromSVG(name, svg);
        })
        .then(() => {
          resolve(iconSet);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  return async (name) => {
    const iconSet = await promise;
    console.log('svg name：', name);
    return iconSet.toSVG(name)?.toMinifiedString();
  };
}
// 刚使用unocss的朋友，可以借助这个工具： https://to-unocss.netlify.app

export default defineConfig({
  transformers: [transformerDirectives({ enforce: 'pre' }), transformerVariantGroup()],
  presets: [
    presetUno,
    presetAttributify,

    // 为什么要用到这个插件？
    // 使用 viewport 作为移动端适配方案，unocss 默认单位为 rem
    // 所以需要转成 px，然后由 postcss 把 px 转成 vw/vh，完成适配
    presetRemToPx({
      // 这里为什么要设置基础字体大小？看下面这篇文章
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 4
    }),
    presetMini({
      dark: {
        dark: '.van-theme-dark',
        light: '.van-theme-light'
      }
    }),
    presetIcons({
      collections: {
        icon: loadCustomIconSet()
      }
    })
  ],
  rules: [
    // 圆角
    [
      /^bdr-?(\d*)$/,
      ([, d]) => ({
        'border-radius': `${d}px`
      })
    ],
    [
      'bg-to1',
      {
        background:
          'linear-gradient(180deg, var(--van-primary-color) 0%, var(--primary-color2) 100%)'
      }
    ],
    [
      'bg-to2',
      {
        background: 'linear-gradient(180deg, var(--primary-color0) 0%, #fff 100%)'
      }
    ],
    [
      'bg-to3',
      {
        background: 'linear-gradient( 227deg, #19C8FF 0%, #4D8CFE 48%, #913FFB 100%);'
      }
    ],
    [
      'bg-to4',
      {
        background: 'linear-gradient( 180deg, #ECECF7 0%, #FFFFFF 100%);'
      }
    ],
    [
      'bg-to5',
      {
        background: 'linear-gradient( 180deg, #5AC27C 0%, #B2E235 100%);'
      }
    ],
    [
      'bg-to6',
      {
        background:
          'linear-gradient(90deg, rgba(98, 197, 117, 0.1) 0%, rgba(172, 224, 58, 0.1) 100%);'
      }
    ]
  ],
  theme: {
    // 自定义颜色
    colors: {
      primary: 'var(--van-primary-color)',
      c0: 'var(--primary-color0)',
      c1: 'var(--van-primary-color)',
      c2: 'var(--font-color2)',
      c3: 'var(--font-color3)',
      c4: 'var(--font-color4)',
      c5: 'var(--font-color5)',
      c6: 'var(--font-color6)',
      c7: 'var(--font-color7)',
      c8: 'var(--font-color8)',
      c9: 'var(--font-color9)',
      c10: 'var(--font-color10)',
      c11: 'var(--font-color11)',
      c12: 'var(--font-color12)',
      c13: 'var(--font-color13)',
      c14: 'var(--font-color14)',
      c15: 'var(--font-color15)',
      bg1: 'var(--bg1)',
      bg2: 'var(--bg2)',
      bg3: 'var(--bg3)',
      bg4: 'var(--bg4)',
      bg5: 'var(--bg5)',
      bg6: 'var(--bg6)',
      bg7: 'var(--bg7)',
      bg9: 'var(--bg8)',
      bg10: 'var(--bg10)',
      bg11: 'var(--bg11)',
      bg12: 'var(--bg12)',
      line: 'var(--border-color)',
      line1: 'var(--border-color1)'
    }
  },
  shortcuts: {
    fc: 'flex justify-center',
    fyc: 'flex items-center',
    fxc: 'flex flex-col items-center',
    fcc: 'flex justify-center items-center',
    fac: 'flex justify-around items-center',
    fec: 'flex  justify-end items-center',
   
    pe: 'pointer-events-none',
    't-hide': 'truncate',
    tac: 'text-center',
    box: 'bg-white',
    shadow: 'shadow-[0px_0px_16px_1px_rgba(79,115,163,0.16)]',
    shadow2: 'shadow-[0px_0px_6px_1px_rgba(77,81,210,0.2)]',
    shadow3: 'shadow-[0px_0px_6px_1px_rgba(235,137,46,0.2)]',
    shadow4: 'shadow-[0px_0px_6px_1px_rgba(0,0,0,0.16)]',
    centered: 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'centered-x': 'absolute left-1/2 transform -translate-x-1/2',
    'centered-y': 'absolute top-1/2 transform -translate-y-1/2',
    fyb: 'flex justify-between items-center',
    'bottom-wrap': 'p30 bg-white fyc fixed bottom-0 left-0 right-0 b-t-solid b-t-1 b-c0',
    'bottom-btn': 'h-98 bg-#4F73A3 text-28 font-bold text-white bdr-20',
    'font-number': 'font-[DINAlternate-Bold]'
  }
});
