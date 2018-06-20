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
