export const colors = {
  transparent: `transparent`,

  black: `#222`,
  greyDarkest: `#273238`,
  greyDarker: `#364349`,
  greyDark: `#70818a`,
  grey: `#9babb4`,
  greyLight: `#dae4e9`,
  greyLighter: `#f3f7f9`,
  greyLightest: `#fafcfc`,
  white: `#ffffff`,
  white80: `rgba(255, 255, 255, 0.8)`,
  white90: `rgba(255, 255, 255, 0.9)`,

  greenDarkest: `#072d11`,
  greenDarker: `#0a3b17`,
  greenDark: `#0c4a1d`,
  // green: `#116728`,
  green: `#12662a`,
  greenLight: `#168433`,
  greenLighter: `#1ba13f`,
  greenLightest: `#1fbe4a`,

  facebook: `#4267b2`,
}

export const fonts = {
  accent: `Caveat, fantasy, cursive`,
}

export const textSizes = {
  xs: `.75rem`, // 12px
  sm: `.875rem`, // 14px
  base: `1rem`, // 16px
  lg: `1.125rem`, // 18px
  xl: `1.25rem`, // 20px
  xxl: `1.5rem`, // 24px
  xxxl: `1.875rem`, // 30px
  xxxxl: `2.25rem`, // 36px
  xxxxxl: `3rem`, // 48px
  xxxxxxl: `5rem`,
  xxxxxxxxl: `8rem`,
}

export const SIZES = {
  xsmall: { min: 425, max: 768 },
  small: { min: 769, max: 850 },
  medium: { min: 851, max: 992 },
  large: { min: 993, max: 1024 },
  xlarge: { min: 1025, max: 1200 },
  xxlarge: { min: 1021, max: 1280 },
  xxxlarge: { min: 1281, max: Infinity },
}

export const media = {
  between(smallKey, largeKey, excludeLarge = false) {
    if (excludeLarge) {
      return `@media (min-width: ${
        SIZES[smallKey].min
      }px) and (max-width: ${SIZES[largeKey].min - 1}px)`
    }
    if (SIZES[largeKey].max === Infinity) {
      return `@media (min-width: ${SIZES[smallKey].min}px)`
    }
    return `@media (min-width: ${SIZES[smallKey].min}px) and (max-width: ${
      SIZES[largeKey].max
    }px)`
  },

  greaterThan(key) {
    return `@media (min-width: ${SIZES[key].min}px)`
  },

  lessThan(key) {
    return `@media (max-width: ${SIZES[key].min - 1}px)`
  },

  size(key) {
    const size = SIZES[key]

    if (size.min == null) {
      return media.lessThan(key)
    } else if (size.max == null) {
      return media.greaterThan(key)
    }
    return media.between(key, key)
  },
}

export const width = {
  auto: `auto`,
  px: `1px`,
  '1': `0.25rem`,
  '2': `0.5rem`,
  '3': `0.75rem`,
  '4': `1rem`,
  '6': `1.5rem`,
  '7': `1.75rem`,
  '8': `2rem`,
  '10': `2.5rem`,
  '12': `3rem`,
  '16': `4rem`,
  '24': `6rem`,
  '32': `8rem`,
  '48': `12rem`,
  '64': `16rem`,
  '1/2': `50%`,
  '1/3': `33.33333%`,
  '2/3': `66.66667%`,
  '1/4': `25%`,
  '3/4': `75%`,
  '1/5': `20%`,
  '2/5': `40%`,
  '3/5': `60%`,
  '4/5': `80%`,
  '1/6': `16.66667%`,
  '5/6': `83.33333%`,
  full: `100%`,
  screen: `100vw`,
}
